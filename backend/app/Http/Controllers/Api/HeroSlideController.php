<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HeroSlideController extends Controller
{
    /**
     * Display a listing of hero slides for admin management.
     *
     * GET /api/admin/hero-slides
     */
    public function index(): JsonResponse
    {
        $slides = HeroSlide::orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $slides,
        ], 200);
    }

    /**
     * Store a newly created hero slide in storage.
     *
     * POST /api/admin/hero-slides
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $imagePath = $request->file('image')->store('hero-slides', 'public');

        // Convert string boolean inputs ('true', 'false', '1', '0') if present
        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $slide = HeroSlide::create([
            'title' => $request->input('title'),
            'subtitle' => $request->input('subtitle'),
            'image' => $imagePath,
            'button_text' => $request->input('button_text'),
            'button_url' => $request->input('button_url'),
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hero slide created successfully',
            'data' => $slide,
        ], 201);
    }

    /**
     * Display the specified hero slide.
     *
     * GET /api/admin/hero-slides/{id}
     */
    public function show($id): JsonResponse
    {
        $slide = HeroSlide::find($id);

        if (! $slide) {
            return response()->json([
                'success' => false,
                'message' => 'Hero slide not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $slide,
        ], 200);
    }

    /**
     * Update the specified hero slide in storage.
     *
     * PUT/POST /api/admin/hero-slides/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $slide = HeroSlide::find($id);

        if (! $slide) {
            return response()->json([
                'success' => false,
                'message' => 'Hero slide not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'button_text' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($slide->image && Storage::disk('public')->exists($slide->image)) {
                Storage::disk('public')->delete($slide->image);
            }
            $slide->image = $request->file('image')->store('hero-slides', 'public');
        }

        if ($request->has('title')) {
            $slide->title = $request->input('title');
        }
        if ($request->has('subtitle')) {
            $slide->subtitle = $request->input('subtitle');
        }
        if ($request->has('button_text')) {
            $slide->button_text = $request->input('button_text');
        }
        if ($request->has('button_url')) {
            $slide->button_url = $request->input('button_url');
        }
        if ($request->has('display_order')) {
            $slide->display_order = (int) $request->input('display_order');
        }
        if ($request->has('is_active')) {
            $slide->is_active = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $slide->save();

        return response()->json([
            'success' => true,
            'message' => 'Hero slide updated successfully',
            'data' => $slide,
        ], 200);
    }

    /**
     * Remove the specified hero slide from storage.
     *
     * DELETE /api/admin/hero-slides/{id}
     */
    public function destroy($id): JsonResponse
    {
        $slide = HeroSlide::find($id);

        if (! $slide) {
            return response()->json([
                'success' => false,
                'message' => 'Hero slide not found',
            ], 404);
        }

        // Delete associated image file from storage
        if ($slide->image && Storage::disk('public')->exists($slide->image)) {
            Storage::disk('public')->delete($slide->image);
        }

        $slide->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hero slide deleted successfully',
        ], 200);
    }
}
