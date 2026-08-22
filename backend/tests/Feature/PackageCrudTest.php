<?php

namespace Tests\Feature;

use App\Models\Package;
use App\Models\PackageCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PackageCrudTest extends TestCase
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
     * Test unauthorized user cannot access packages API.
     */
    public function test_unauthorized_user_cannot_access_packages()
    {
        $response = $this->getJson('/api/admin/packages');
        $response->assertStatus(401);

        $normalUser = User::create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);
        $userToken = $normalUser->createToken('user-token')->plainTextToken;

        $forbiddenResponse = $this->withHeader('Authorization', 'Bearer ' . $userToken)
            ->getJson('/api/admin/packages');
        $forbiddenResponse->assertStatus(403);
    }

    /**
     * Test package categories endpoint returns auto-populated categories.
     */
    public function test_admin_can_fetch_package_categories()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/package-categories');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'data'])
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('package_categories', ['name' => 'Umrah']);
    }

    /**
     * Test public endpoint /api/packages returns active packages only ordered by display_order.
     */
    public function test_public_can_fetch_active_packages_only()
    {
        $category = PackageCategory::create(['name' => 'Tour', 'slug' => 'tour']);

        Package::create([
            'title' => 'Active Package 2',
            'package_category_id' => $category->id,
            'slug' => 'active-package-2',
            'image' => 'packages/active2.jpg',
            'display_order' => 2,
            'is_active' => true,
        ]);

        Package::create([
            'title' => 'Inactive Package',
            'package_category_id' => $category->id,
            'slug' => 'inactive-package',
            'image' => 'packages/inactive.jpg',
            'display_order' => 1,
            'is_active' => false,
        ]);

        Package::create([
            'title' => 'Active Package 1',
            'package_category_id' => $category->id,
            'slug' => 'active-package-1',
            'image' => 'packages/active1.jpg',
            'display_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/packages');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJson([
                'success' => true,
                'data' => [
                    ['title' => 'Active Package 1', 'display_order' => 1],
                    ['title' => 'Active Package 2', 'display_order' => 2],
                ],
            ]);
    }

    /**
     * Test admin can list packages.
     */
    public function test_admin_can_list_packages()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/packages');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'data']);
    }

    /**
     * Test admin can create a package with automatic slug.
     */
    public function test_admin_can_create_package_with_automatic_slug()
    {
        $category = PackageCategory::create([
            'name' => 'Tour',
            'slug' => 'tour',
        ]);

        $file = UploadedFile::fake()->create('package1.jpg', 100, 'image/jpeg');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/packages', [
                'title' => 'Dubai Luxury Tour',
                'package_category_id' => $category->id,
                'short_description' => '5 Days & 4 Nights luxury stay in Dubai.',
                'price' => '৳ 95,000',
                'duration' => '5 Days',
                'image' => $file,
                'display_order' => 1,
                'is_active' => true,
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'Dubai Luxury Tour',
                    'slug' => 'dubai-luxury-tour',
                    'package_category_id' => $category->id,
                    'price' => '৳ 95,000',
                    'duration' => '5 Days',
                    'display_order' => 1,
                    'is_active' => true,
                ],
            ]);

        $this->assertDatabaseHas('packages', [
            'title' => 'Dubai Luxury Tour',
            'slug' => 'dubai-luxury-tour',
        ]);

        $package = Package::first();
        Storage::disk('public')->assertExists($package->image);
    }

    /**
     * Test validation fails for invalid category or missing required fields.
     */
    public function test_validation_fails_for_invalid_category_or_missing_image()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/packages', [
                'title' => 'Invalid Package',
                'package_category_id' => 9999, // Non-existent category
            ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => 'Validation errors',
            ]);
    }

    /**
     * Test admin can update package and replace image.
     */
    public function test_admin_can_update_package_and_replace_image()
    {
        $category = PackageCategory::create(['name' => 'Umrah', 'slug' => 'umrah']);
        $initialFile = UploadedFile::fake()->create('initial.jpg', 100, 'image/jpeg');

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/packages', [
                'title' => 'Economy Umrah Package',
                'package_category_id' => $category->id,
                'price' => '৳ 1,20,000',
                'image' => $initialFile,
            ]);

        $packageId = $createResponse->json('data.id');
        $oldImagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($oldImagePath);

        $newFile = UploadedFile::fake()->create('new-umrah.png', 100, 'image/png');
        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson("/api/admin/packages/{$packageId}", [
                'title' => 'VIP Premium Umrah Package',
                'package_category_id' => $category->id,
                'price' => '৳ 1,80,000',
                'duration' => '14 Days',
                'image' => $newFile,
                'display_order' => 2,
                'is_active' => true,
            ]);

        $updateResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'title' => 'VIP Premium Umrah Package',
                    'slug' => 'vip-premium-umrah-package',
                    'price' => '৳ 1,80,000',
                ],
            ]);

        $newImagePath = $updateResponse->json('data.image');

        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($newImagePath);
    }

    /**
     * Test admin can delete package and remove image file.
     */
    public function test_admin_can_delete_package_and_remove_image()
    {
        $category = PackageCategory::create(['name' => 'Hajj', 'slug' => 'hajj']);
        $file = UploadedFile::fake()->create('hajj.jpg', 100, 'image/jpeg');

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/admin/packages', [
                'title' => 'Royal Hajj Package',
                'package_category_id' => $category->id,
                'image' => $file,
            ]);

        $packageId = $createResponse->json('data.id');
        $imagePath = $createResponse->json('data.image');
        Storage::disk('public')->assertExists($imagePath);

        $deleteResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/packages/{$packageId}");

        $deleteResponse->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Package deleted successfully',
            ]);

        $this->assertDatabaseMissing('packages', ['id' => $packageId]);
        Storage::disk('public')->assertMissing($imagePath);
    }
}
