<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingInquiryController extends Controller
{
    /**
     * Store a public booking inquiry.
     *
     * POST /api/booking-inquiries
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'package_id' => 'nullable|exists:packages,id',
            'travel_date' => 'nullable|date',
            'number_of_people' => 'nullable|integer|min:1',
            'message' => 'nullable|string|max:2000',
        ], [
            'name.required' => 'Please enter your full name.',
            'phone.required' => 'Please enter your phone number.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $inquiry = BookingInquiry::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'package_id' => $request->input('package_id'),
            'travel_date' => $request->input('travel_date'),
            'number_of_people' => (int) $request->input('number_of_people', 1),
            'message' => $request->input('message'),
            'status' => 'pending',
        ]);

        $inquiry->load('package');

        return response()->json([
            'success' => true,
            'message' => 'Booking request received! Our travel team will contact you shortly.',
            'data' => $inquiry,
        ], 201);
    }

    /**
     * Display a listing of booking inquiries for admin management.
     *
     * GET /api/admin/booking-inquiries
     */
    public function index(): JsonResponse
    {
        $inquiries = BookingInquiry::with('package')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $inquiries,
        ], 200);
    }

    /**
     * Update status of a booking inquiry.
     *
     * PUT /api/admin/booking-inquiries/{id}/status
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $inquiry = BookingInquiry::find($id);

        if (! $inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Booking inquiry not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,contacted,confirmed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid status value',
            ], 422);
        }

        $inquiry->status = $request->input('status');
        $inquiry->save();
        $inquiry->load('package');

        return response()->json([
            'success' => true,
            'message' => 'Inquiry status updated successfully',
            'data' => $inquiry,
        ], 200);
    }

    /**
     * Delete a booking inquiry.
     *
     * DELETE /api/admin/booking-inquiries/{id}
     */
    public function destroy($id): JsonResponse
    {
        $inquiry = BookingInquiry::find($id);

        if (! $inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Booking inquiry not found',
            ], 404);
        }

        $inquiry->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking inquiry deleted successfully',
        ], 200);
    }
}
