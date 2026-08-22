<?php

namespace Tests\Feature;

use App\Models\OverseasService;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class OverseasServiceCrudTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');

        $this->admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $this->token = $this->admin->createToken('admin-token')->plainTextToken;
    }

    public function test_unauthorized_user_cannot_access_overseas_services()
    {
        $response = $this->getJson('/api/admin/overseas-services');
        $response->assertStatus(401);
    }

    public function test_public_can_fetch_active_overseas_services_only()
    {
        OverseasService::create([
            'title' => 'Active Service',
            'country' => 'Malaysia',
            'slug' => 'active-service',
            'image' => 'overseas-services/active.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);

        OverseasService::create([
            'title' => 'Inactive Service',
            'country' => 'Saudi Arabia',
            'slug' => 'inactive-service',
            'image' => 'overseas-services/inactive.jpg',
            'display_order' => 2,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/overseas-services');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJson([
                'success' => true,
                'data' => [
                    ['title' => 'Active Service'],
                ],
            ]);
    }

    public function test_admin_can_create_update_and_delete_overseas_service()
    {
        $file1 = UploadedFile::fake()->create('service.jpg', 100, 'image/jpeg');

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/overseas-services', [
                'title' => 'Manpower Recruitment',
                'country' => 'Qatar',
                'description' => 'Professional recruitment assistance.',
                'image' => $file1,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $createResponse->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Manpower Recruitment',
                    'slug' => 'manpower-recruitment',
                    'country' => 'Qatar',
                ],
            ]);

        $serviceId = $createResponse->json('data.id');
        $oldImagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($oldImagePath);

        // Update with new image replacement
        $file2 = UploadedFile::fake()->create('new_service.png', 100, 'image/png');
        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/overseas-services/{$serviceId}", [
                'title' => 'Manpower Recruitment Global',
                'country' => 'Qatar & UAE',
                'image' => $file2,
            ]);

        $updateResponse->assertStatus(200);
        $newImagePath = $updateResponse->json('data.image');

        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($newImagePath);

        // Delete
        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/overseas-services/{$serviceId}");

        $deleteResponse->assertStatus(200);
        $this->assertDatabaseMissing('overseas_services', ['id' => $serviceId]);
        Storage::disk('public')->assertMissing($newImagePath);
    }
}
