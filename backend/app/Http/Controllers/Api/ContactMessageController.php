<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactMessageController extends Controller
{
    /**
     * Store a public contact message.
     *
     * POST /api/contact
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
        ], [
            'name.required' => 'Please enter your full name.',
            'phone.required' => 'Please enter your contact phone number.',
            'message.required' => 'Please write your inquiry or message.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $contactMessage = ContactMessage::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'subject' => $request->input('subject', 'General Inquiry'),
            'message' => $request->input('message'),
            'status' => 'unread',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for reaching out! We will contact you shortly.',
            'data' => $contactMessage,
        ], 201);
    }

    /**
     * Display a listing of contact messages for admin view.
     *
     * GET /api/admin/contact-messages
     */
    public function index(): JsonResponse
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ], 200);
    }

    /**
     * Mark a contact message as read/unread.
     *
     * PUT /api/admin/contact-messages/{id}/read
     */
    public function markAsRead(Request $request, $id): JsonResponse
    {
        $message = ContactMessage::find($id);

        if (! $message) {
            return response()->json([
                'success' => false,
                'message' => 'Contact message not found',
            ], 404);
        }

        $message->status = $request->input('status', 'read');
        $message->save();

        return response()->json([
            'success' => true,
            'message' => 'Message status updated',
            'data' => $message,
        ], 200);
    }

    /**
     * Delete a contact message.
     *
     * DELETE /api/admin/contact-messages/{id}
     */
    public function destroy($id): JsonResponse
    {
        $message = ContactMessage::find($id);

        if (! $message) {
            return response()->json([
                'success' => false,
                'message' => 'Contact message not found',
            ], 404);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact message deleted successfully',
        ], 200);
    }
}
