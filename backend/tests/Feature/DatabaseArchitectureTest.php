<?php

namespace Tests\Feature;

use App\Models\BookingInquiry;
use App\Models\ContactMessage;
use App\Models\Gallery;
use App\Models\HeroSlide;
use App\Models\OverseasService;
use App\Models\Package;
use App\Models\PackageCategory;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class DatabaseArchitectureTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Verify that all business database tables are created by migrations.
     */
    public function test_all_business_tables_exist()
    {
        $tables = [
            'users',
            'hero_slides',
            'services',
            'package_categories',
            'packages',
            'overseas_services',
            'gallery',
            'testimonials',
            'contact_messages',
            'booking_inquiries',
        ];

        foreach ($tables as $table) {
            $this->assertTrue(Schema::hasTable($table), "Table {$table} should exist in database schema.");
        }
    }

    /**
     * Verify table columns for hero_slides.
     */
    public function test_hero_slides_table_columns()
    {
        $this->assertTrue(Schema::hasColumns('hero_slides', [
            'id', 'title', 'subtitle', 'image', 'button_text', 'button_url', 'display_order', 'is_active', 'created_at', 'updated_at'
        ]));
    }

    /**
     * Verify table columns for services.
     */
    public function test_services_table_columns()
    {
        $this->assertTrue(Schema::hasColumns('services', [
            'id', 'title', 'slug', 'short_description', 'description', 'image', 'icon', 'display_order', 'is_active', 'created_at', 'updated_at'
        ]));
    }

    /**
     * Verify table columns for package_categories and packages.
     */
    public function test_package_categories_and_packages_columns()
    {
        $this->assertTrue(Schema::hasColumns('package_categories', [
            'id', 'name', 'slug', 'description', 'is_active', 'created_at', 'updated_at'
        ]));

        $this->assertTrue(Schema::hasColumns('packages', [
            'id', 'package_category_id', 'title', 'slug', 'short_description', 'description', 'image', 'price', 'duration', 'hotel', 'transport', 'visa_included', 'display_order', 'is_active', 'created_at', 'updated_at'
        ]));
    }

    /**
     * Verify Eloquent relationship between PackageCategory, Package, and BookingInquiry.
     */
    public function test_package_category_package_and_inquiry_relationships()
    {
        $category = PackageCategory::create([
            'name' => 'Hajj Packages',
            'slug' => 'hajj-packages',
            'description' => 'Exclusive Hajj Packages',
            'is_active' => true,
        ]);

        $package = Package::create([
            'package_category_id' => $category->id,
            'title' => 'VIP Hajj Package',
            'slug' => 'vip-hajj-package',
            'price' => '৳ 550,000',
            'duration' => '30 Days',
            'hotel' => '5 Star Makkah Hotel',
            'transport' => 'AC Bus',
            'visa_included' => true,
            'is_active' => true,
        ]);

        $inquiry = BookingInquiry::create([
            'name' => 'John Doe',
            'phone' => '01825679099',
            'package_id' => $package->id,
            'travel_date' => '2026-10-01',
            'number_of_people' => 2,
            'message' => 'Interested in VIP package',
        ]);

        // Category -> Packages (hasMany)
        $this->assertCount(1, $category->packages);
        $this->assertEquals('VIP Hajj Package', $category->packages->first()->title);

        // Package -> Category (belongsTo)
        $this->assertEquals('Hajj Packages', $package->category->name);

        // Package -> BookingInquiries (hasMany)
        $this->assertCount(1, $package->bookingInquiries);
        $this->assertEquals('John Doe', $package->bookingInquiries->first()->name);

        // BookingInquiry -> Package (belongsTo)
        $this->assertEquals('VIP Hajj Package', $inquiry->package->title);
    }
}
