<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials for admin management.
     *
     * GET /api/admin/testimonials
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials,
        ], 200);
    }

    /**
     * Display a listing of active testimonials for the public website.
     *
     * GET /api/testimonials
     */
    public function publicIndex(): JsonResponse
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials,
        ], 200);
    }

    /**
     * Store a newly created testimonial in storage.
     *
     * POST /api/admin/testimonials
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'nullable|string|max:255',
            'message' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'customer_name.required' => 'Client name is required.',
            'message.required' => 'Feedback message is required.',
            'image.image' => 'Uploaded file must be a valid image format.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('testimonials', 'public');
        }

        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $testimonial = Testimonial::create([
            'customer_name' => $request->input('customer_name'),
            'customer_role' => $request->input('customer_role'),
            'message' => $request->input('message'),
            'rating' => (int) $request->input('rating', 5),
            'image' => $imagePath,
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial created successfully',
            'data' => $testimonial,
        ], 201);
    }

    /**
     * Display the specified testimonial.
     *
     * GET /api/admin/testimonials/{id}
     */
    public function show($id): JsonResponse
    {
        $testimonial = Testimonial::find($id);

        if (! $testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $testimonial,
        ], 200);
    }

    /**
     * Update the specified testimonial in storage.
     *
     * PUT/POST /api/admin/testimonials/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $testimonial = Testimonial::find($id);

        if (! $testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'customer_role' => 'nullable|string|max:255',
            'message' => 'required|string|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'customer_name.required' => 'Client name is required.',
            'message.required' => 'Feedback message is required.',
            'image.image' => 'Uploaded file must be a valid image format.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('image')) {
            if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $testimonial->image = $request->file('image')->store('testimonials', 'public');
        }

        if ($request->has('customer_name')) {
            $testimonial->customer_name = $request->input('customer_name');
        }
        if ($request->has('customer_role')) {
            $testimonial->customer_role = $request->input('customer_role');
        }
        if ($request->has('message')) {
            $testimonial->message = $request->input('message');
        }
        if ($request->has('rating')) {
            $testimonial->rating = (int) $request->input('rating');
        }
        if ($request->has('display_order')) {
            $testimonial->display_order = (int) $request->input('display_order');
        }
        if ($request->has('is_active')) {
            $testimonial->is_active = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $testimonial->save();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial updated successfully',
            'data' => $testimonial,
        ], 200);
    }

    /**
     * Remove the specified testimonial from storage.
     *
     * DELETE /api/admin/testimonials/{id}
     */
    public function destroy($id): JsonResponse
    {
        $testimonial = Testimonial::find($id);

        if (! $testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found',
            ], 404);
        }

        if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
            Storage::disk('public')->delete($testimonial->image);
        }

        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted successfully',
        ], 200);
    }
}
