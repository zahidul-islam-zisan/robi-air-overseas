<?php

namespace Tests\Feature;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TestimonialCrudTest extends TestCase
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

    public function test_unauthorized_user_cannot_access_testimonials()
    {
        $response = $this->getJson('/api/admin/testimonials');
        $response->assertStatus(401);
    }

    public function test_public_can_fetch_active_testimonials_only()
    {
        Testimonial::create([
            'customer_name' => 'Mohammad Ali',
            'customer_role' => 'Hajj Pilgrim',
            'message' => 'Excellent service and great arrangements.',
            'rating' => 5,
            'display_order' => 1,
            'is_active' => true,
        ]);

        Testimonial::create([
            'customer_name' => 'Inactive Reviewer',
            'message' => 'Should not appear.',
            'rating' => 1,
            'display_order' => 2,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/testimonials');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJson([
                'success' => true,
                'data' => [
                    ['customer_name' => 'Mohammad Ali'],
                ],
            ]);
    }

    public function test_admin_can_create_update_and_delete_testimonial()
    {
        $avatar = UploadedFile::fake()->create('client.jpg', 100, 'image/jpeg');

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/testimonials', [
                'customer_name' => 'Zubair Hossain',
                'customer_role' => 'Umrah Traveler',
                'message' => 'Smooth visa processing and Kaaba hotel arrangement.',
                'rating' => 5,
                'image' => $avatar,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $createResponse->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'customer_name' => 'Zubair Hossain',
                    'customer_role' => 'Umrah Traveler',
                ],
            ]);

        $item = Testimonial::first();
        Storage::disk('public')->assertExists($item->image);

        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/testimonials/{$item->id}", [
                'customer_name' => 'Zubair Hossain (VIP)',
                'message' => 'Updated review text.',
                'rating' => 5,
            ]);

        $updateResponse->assertStatus(200);

        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/testimonials/{$item->id}");

        $deleteResponse->assertStatus(200);
        $this->assertDatabaseMissing('testimonials', ['id' => $item->id]);
    }
}
