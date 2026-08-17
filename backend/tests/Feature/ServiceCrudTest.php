<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ServiceCrudTest extends TestCase
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

    /**
     * Test unauthorized users cannot access admin services endpoints.
     */
    public function test_unauthorized_user_cannot_access_services()
    {
        $response = $this->getJson('/api/admin/services');
        $response->assertStatus(401);

        $normalUser = User::create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);
        $userToken = $normalUser->createToken('user-token')->plainTextToken;

        $forbiddenResponse = $this->withHeader('Authorization', 'Bearer ' . $userToken)
            ->getJson('/api/admin/services');
        $forbiddenResponse->assertStatus(403);
    }

    /**
     * Test public endpoint /api/services returns active services only ordered by display_order.
     */
    public function test_public_can_fetch_active_services_only()
    {
        Service::create([
            'title' => 'Active Service 2',
            'slug' => 'active-service-2',
            'image' => 'services/active2.jpg',
            'display_order' => 2,
            'is_active' => true,
        ]);

        Service::create([
            'title' => 'Inactive Service',
            'slug' => 'inactive-service',
            'image' => 'services/inactive.jpg',
            'display_order' => 1,
            'is_active' => false,
        ]);

        Service::create([
            'title' => 'Active Service 1',
            'slug' => 'active-service-1',
            'image' => 'services/active1.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJson([
                'success' => true,
                'data' => [
                    ['title' => 'Active Service 1', 'display_order' => 1],
                    ['title' => 'Active Service 2', 'display_order' => 2],
                ],
            ]);
    }

    /**
     * Test admin can list services.
     */
    public function test_admin_can_list_services()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/services');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'data']);
    }

    /**
     * Test admin can create service with automatic unique slug.
     */
    public function test_admin_can_create_service_with_automatic_slug()
    {
        $file = UploadedFile::fake()->create('visa.jpg', 100, 'image/jpeg');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Visa Processing',
                'short_description' => 'Fast and reliable visa assistance for all countries.',
                'image' => $file,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Visa Processing',
                    'slug' => 'visa-processing',
                    'short_description' => 'Fast and reliable visa assistance for all countries.',
                    'display_order' => 1,
                    'is_active' => true,
                ],
            ]);

        $this->assertDatabaseHas('services', [
            'title' => 'Visa Processing',
            'slug' => 'visa-processing',
        ]);

        $service = Service::first();
        Storage::disk('public')->assertExists($service->image);
    }

    /**
     * Test duplicate service title generates safe unique slug.
     */
    public function test_duplicate_title_generates_safe_unique_slug()
    {
        $file1 = UploadedFile::fake()->create('service1.jpg', 100, 'image/jpeg');
        $file2 = UploadedFile::fake()->create('service2.jpg', 100, 'image/jpeg');

        $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Visa Processing',
                'image' => $file1,
            ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Visa Processing',
                'image' => $file2,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Visa Processing',
                    'slug' => 'visa-processing-1',
                ],
            ]);

        $this->assertDatabaseHas('services', ['slug' => 'visa-processing-1']);
    }

    /**
     * Test required validation for service creation.
     */
    public function test_validation_fails_for_missing_required_fields()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'short_description' => 'Missing title and image',
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation errors',
            ]);
    }

    /**
     * Test invalid file upload is rejected.
     */
    public function test_invalid_image_format_is_rejected()
    {
        $pdf = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Air Tickets',
                'image' => $pdf,
            ]);

        $response->assertStatus(422);
    }

    /**
     * Test admin can update service text and replace image.
     */
    public function test_admin_can_update_service_and_replace_image()
    {
        $initialFile = UploadedFile::fake()->create('initial.jpg', 100, 'image/jpeg');
        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Air Ticketing',
                'image' => $initialFile,
            ]);

        $serviceId = $createResponse->json('data.id');
        $oldImagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($oldImagePath);

        $newFile = UploadedFile::fake()->create('new.png', 100, 'image/png');
        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/services/{$serviceId}", [
                'title' => 'Air Ticketing Global',
                'short_description' => 'Best flight deals worldwide.',
                'image' => $newFile,
                'display_order' => 2,
                'is_active' => false,
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Air Ticketing Global',
                    'slug' => 'air-ticketing-global',
                    'display_order' => 2,
                    'is_active' => false,
                ],
            ]);

        $newImagePath = $updateResponse->json('data.image');

        // Verify old image was removed from storage and new image exists
        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($newImagePath);
    }

    /**
     * Test admin can delete service and remove image file.
     */
    public function test_admin_can_delete_service_and_remove_image()
    {
        $file = UploadedFile::fake()->create('delete-me.jpg', 100, 'image/jpeg');
        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/services', [
                'title' => 'Hajj Service',
                'image' => $file,
            ]);

        $serviceId = $createResponse->json('data.id');
        $imagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($imagePath);

        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/services/{$serviceId}");

        $deleteResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Service deleted successfully',
            ]);

        $this->assertDatabaseMissing('services', ['id' => $serviceId]);
        Storage::disk('public')->assertMissing($imagePath);
    }
}
