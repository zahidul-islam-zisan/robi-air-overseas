<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test admin login with valid credentials.
     */
    public function test_admin_login_success()
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => 'admin@robiair.com',
            'password' => 'Secret123!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'token',
                'admin' => ['id', 'name', 'email', 'role'],
            ])
            ->assertJson([
                'success' => true,
                'admin' => [
                    'email' => 'admin@robiair.com',
                    'role' => 'admin',
                ],
            ]);
    }

    /**
     * Test admin login with invalid password credentials.
     */
    public function test_admin_login_invalid_credentials()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => 'admin@robiair.com',
            'password' => 'WrongPassword!',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid email or password credentials.',
            ]);
    }

    /**
     * Test admin login rejects non-admin users.
     */
    public function test_admin_login_rejects_non_admin_users()
    {
        User::create([
            'name' => 'Normal Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);

        $response = $this->postJson('/api/admin/login', [
            'email' => 'customer@gmail.com',
            'password' => 'UserPass123!',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Access restricted to admin users.',
            ]);
    }

    /**
     * Test unauthenticated request to /api/admin/me returns 401.
     */
    public function test_unauthenticated_request_to_me_endpoint()
    {
        $response = $this->getJson('/api/admin/me');

        $response->assertStatus(401);
    }

    /**
     * Test non-admin user request to /api/admin/me returns 403.
     */
    public function test_non_admin_user_request_to_me_endpoint()
    {
        $normalUser = User::create([
            'name' => 'Normal Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);

        $token = $normalUser->createToken('user-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/me');

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Forbidden. Access restricted to administrator users only.',
            ]);
    }

    /**
     * Test authenticated admin request to /api/admin/me.
     */
    public function test_authenticated_admin_request_to_me_endpoint()
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $token = $admin->createToken('admin-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/me');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'admin' => [
                    'id' => $admin->id,
                    'name' => 'Admin User',
                    'email' => 'admin@robiair.com',
                    'role' => 'admin',
                ],
            ]);
    }

    /**
     * Test admin logout revokes token.
     */
    public function test_admin_logout_revokes_token()
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $loginResponse = $this->postJson('/api/admin/login', [
            'email' => 'admin@robiair.com',
            'password' => 'Secret123!',
        ]);

        $token = $loginResponse->json('token');

        // Logout
        $logoutResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/admin/logout');

        $logoutResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logged out successfully',
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 0);

        // Reset in-memory authentication guard state in test runner
        $this->app['auth']->forgetGuards();

        // Subsequent /api/admin/me request should be rejected with 401
        $meResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/me');

        $meResponse->assertStatus(401);
    }

    /**
     * Test artisan admin:create command.
     */
    public function test_artisan_admin_create_command()
    {
        $this->artisan('admin:create')
            ->expectsQuestion('Enter Admin Name', 'Super Admin')
            ->expectsQuestion('Enter Admin Email', 'super@robiair.com')
            ->expectsQuestion('Enter Admin Password', 'AdminPass123!')
            ->expectsQuestion('Confirm Admin Password', 'AdminPass123!')
            ->assertExitCode(0);

        $this->assertDatabaseHas('users', [
            'email' => 'super@robiair.com',
            'role' => 'admin',
        ]);
    }
}
