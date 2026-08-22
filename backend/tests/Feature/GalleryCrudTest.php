<?php

namespace Tests\Feature;

use App\Models\Gallery;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class GalleryCrudTest extends TestCase
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

    public function test_unauthorized_user_cannot_access_gallery()
    {
        $response = $this->getJson('/api/admin/gallery');
        $response->assertStatus(401);
    }

    public function test_public_can_fetch_active_gallery_only()
    {
        Gallery::create([
            'title' => 'Active Photo',
            'category' => 'Umrah',
            'image' => 'gallery/active.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);

        Gallery::create([
            'title' => 'Inactive Photo',
            'category' => 'Hajj',
            'image' => 'gallery/inactive.jpg',
            'display_order' => 2,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/gallery');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJson([
                'success' => true,
                'data' => [
                    ['title' => 'Active Photo'],
                ],
            ]);
    }

    public function test_admin_can_create_update_and_delete_gallery_item()
    {
        $file1 = UploadedFile::fake()->create('photo.jpg', 100, 'image/jpeg');

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/gallery', [
                'title' => 'Kaaba Umrah Group',
                'category' => 'Umrah',
                'image' => $file1,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $createResponse->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Kaaba Umrah Group',
                    'category' => 'Umrah',
                ],
            ]);

        $itemId = $createResponse->json('data.id');
        $oldImagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($oldImagePath);

        $file2 = UploadedFile::fake()->create('new_photo.png', 100, 'image/png');
        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/gallery/{$itemId}", [
                'title' => 'Kaaba VIP Group',
                'image' => $file2,
            ]);

        $updateResponse->assertStatus(200);
        $newImagePath = $updateResponse->json('data.image');

        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($newImagePath);

        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/gallery/{$itemId}");

        $deleteResponse->assertStatus(200);
        $this->assertDatabaseMissing('gallery', ['id' => $itemId]);
        Storage::disk('public')->assertMissing($newImagePath);
    }
}
