<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    /**
     * Display a listing of gallery items for admin management.
     *
     * GET /api/admin/gallery
     */
    public function index(): JsonResponse
    {
        $gallery = Gallery::orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $gallery,
        ], 200);
    }

    /**
     * Display a listing of active gallery items for the public website.
     *
     * GET /api/gallery
     */
    public function publicIndex(): JsonResponse
    {
        $gallery = Gallery::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $gallery,
        ], 200);
    }

    /**
     * Store a newly created gallery item in storage.
     *
     * POST /api/admin/gallery
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'image.required' => 'Please select a valid gallery image.',
            'image.image' => 'Uploaded file must be a valid image format.',
            'image.max' => 'Image file size is too large (maximum 5MB allowed).',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        $imagePath = $request->file('image')->store('gallery', 'public');
        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $item = Gallery::create([
            'title' => $request->input('title'),
            'category' => $request->input('category', 'General'),
            'image' => $imagePath,
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Gallery image uploaded successfully',
            'data' => $item,
        ], 201);
    }

    /**
     * Display the specified gallery item.
     *
     * GET /api/admin/gallery/{id}
     */
    public function show($id): JsonResponse
    {
        $item = Gallery::find($id);

        if (! $item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
        ], 200);
    }

    /**
     * Update the specified gallery item in storage.
     *
     * PUT/POST /api/admin/gallery/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $item = Gallery::find($id);

        if (! $item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'image.image' => 'Uploaded file must be a valid image format.',
            'image.max' => 'Image file size is too large (maximum 5MB allowed).',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('image')) {
            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }
            $item->image = $request->file('image')->store('gallery', 'public');
        }

        if ($request->has('title')) {
            $item->title = $request->input('title');
        }
        if ($request->has('category')) {
            $item->category = $request->input('category');
        }
        if ($request->has('display_order')) {
            $item->display_order = (int) $request->input('display_order');
        }
        if ($request->has('is_active')) {
            $item->is_active = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $item->save();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item updated successfully',
            'data' => $item,
        ], 200);
    }

    /**
     * Remove the specified gallery item from storage.
     *
     * DELETE /api/admin/gallery/{id}
     */
    public function destroy($id): JsonResponse
    {
        $item = Gallery::find($id);

        if (! $item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found',
            ], 404);
        }

        if ($item->image && Storage::disk('public')->exists($item->image)) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery item deleted successfully',
        ], 200);
    }
}
