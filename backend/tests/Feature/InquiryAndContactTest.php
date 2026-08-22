<?php

namespace Tests\Feature;

use App\Models\BookingInquiry;
use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class InquiryAndContactTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@robiair.com',
            'password' => Hash::make('Secret123!'),
            'role' => 'admin',
        ]);

        $this->token = $this->admin->createToken('admin-token')->plainTextToken;
    }

    public function test_public_can_submit_contact_message()
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Kalam Hossain',
            'phone' => '01825679099',
            'email' => 'kalam@gmail.com',
            'subject' => 'Umrah Visa Inquiry',
            'message' => 'Need 4 Umrah package tickets for next month.',
        ]);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Kalam Hossain',
            'phone' => '01825679099',
        ]);
    }

    public function test_public_can_submit_booking_inquiry()
    {
        $response = $this->postJson('/api/booking-inquiries', [
            'name' => 'Salim Reza',
            'phone' => '01928826736',
            'email' => 'salim@gmail.com',
            'number_of_people' => 2,
            'message' => 'Hajj package booking request.',
        ]);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('booking_inquiries', [
            'name' => 'Salim Reza',
            'phone' => '01928826736',
        ]);
    }

    public function test_admin_can_view_and_manage_messages_and_inquiries()
    {
        $msg = ContactMessage::create([
            'name' => 'Test User',
            'phone' => '01700000000',
            'message' => 'Sample Message',
        ]);

        $inquiry = BookingInquiry::create([
            'name' => 'Test Traveler',
            'phone' => '01800000000',
            'message' => 'Sample Inquiry',
            'status' => 'pending',
        ]);

        // View list
        $msgResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/contact-messages');
        $msgResponse->assertStatus(200)->assertJsonCount(1, 'data');

        $inquiryResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/admin/booking-inquiries');
        $inquiryResponse->assertStatus(200)->assertJsonCount(1, 'data');

        // Update inquiry status
        $statusResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->putJson("/api/admin/booking-inquiries/{$inquiry->id}/status", [
                'status' => 'confirmed',
            ]);
        $statusResponse->assertStatus(200);
        $this->assertDatabaseHas('booking_inquiries', ['id' => $inquiry->id, 'status' => 'confirmed']);

        // Delete message
        $deleteMsgResponse = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/admin/contact-messages/{$msg->id}");
        $deleteMsgResponse->assertStatus(200);
        $this->assertDatabaseMissing('contact_messages', ['id' => $msg->id]);
    }
}
