<?php

namespace Tests\Feature;

use App\Models\HeroSlide;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class HeroSlideCrudTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');

        $this->admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $this->token = $this->admin->createToken('admin-token')->plainTextToken;
    }

    /**
     * Test unauthorized users cannot access hero slide endpoints.
     */
    public function test_unauthorized_user_cannot_access_hero_slides()
    {
        $response = $this->getJson('/api/admin/hero-slides');
        $response->assertStatus(401);

        $normalUser = User::create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);
        $userToken = $normalUser->createToken('user-token')->plainTextToken;

        $forbiddenResponse = $this->withHeader('Authorization', 'Bearer ' . $userToken)
            ->getJson('/api/admin/hero-slides');
        $forbiddenResponse->assertStatus(403);
    }

    /**
     * Test admin can list hero slides.
     */
    public function test_admin_can_list_hero_slides()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/hero-slides');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'data']);
    }

    /**
     * Test admin can create hero slide with valid image.
     */
    public function test_admin_can_create_hero_slide_with_image_upload()
    {
        $file = UploadedFile::fake()->create('hero-slide-1.jpg', 100, 'image/jpeg');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/hero-slides', [
                'title' => 'Welcome to Robi Air Overseas',
                'subtitle' => 'Your Trusted Travel Partner',
                'image' => $file,
                'button_text' => 'Explore Services',
                'button_url' => '/services',
                'display_order' => 1,
                'is_active' => true,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Welcome to Robi Air Overseas',
                    'display_order' => 1,
                    'is_active' => true,
                ],
            ]);

        $this->assertDatabaseHas('hero_slides', [
            'title' => 'Welcome to Robi Air Overseas',
        ]);

        $slide = HeroSlide::first();
        Storage::disk('public')->assertExists($slide->image);
    }

    /**
     * Test invalid file upload is rejected.
     */
    public function test_admin_cannot_create_hero_slide_with_invalid_file()
    {
        $fakeDocument = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/hero-slides', [
                'title' => 'Invalid Slide',
                'image' => $fakeDocument,
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation errors',
            ]);
    }

    /**
     * Test admin can update hero slide and replace image (deleting old image).
     */
    public function test_admin_can_update_hero_slide_and_replace_image()
    {
        $initialFile = UploadedFile::fake()->create('slide-initial.jpg', 100, 'image/jpeg');
        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/hero-slides', [
                'title' => 'Initial Title',
                'image' => $initialFile,
            ]);

        $slideId = $createResponse->json('data.id');
        $oldImagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($oldImagePath);

        // Replace with new image
        $newFile = UploadedFile::fake()->create('slide-new.png', 100, 'image/png');
        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/hero-slides/{$slideId}", [
                'title' => 'Updated Title',
                'image' => $newFile,
                'display_order' => 5,
                'is_active' => false,
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Updated Title',
                    'display_order' => 5,
                    'is_active' => false,
                ],
            ]);

        $newImagePath = $updateResponse->json('data.image');

        // Verify old image was deleted from storage and new image exists
        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($newImagePath);
    }

    /**
     * Test admin can delete hero slide and its image file from storage.
     */
    public function test_admin_can_delete_hero_slide_and_remove_image()
    {
        $file = UploadedFile::fake()->create('slide-to-delete.jpg', 100, 'image/jpeg');
        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/hero-slides', [
                'title' => 'Slide To Delete',
                'image' => $file,
            ]);

        $slideId = $createResponse->json('data.id');
        $imagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($imagePath);

        // Delete slide
        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/hero-slides/{$slideId}");

        $deleteResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Hero slide deleted successfully',
            ]);

        $this->assertDatabaseMissing('hero_slides', ['id' => $slideId]);
        Storage::disk('public')->assertMissing($imagePath);
    }
}
