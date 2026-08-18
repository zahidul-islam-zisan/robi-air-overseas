<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    /**
     * Display a listing of packages with their category for admin management.
     *
     * GET /api/admin/packages
     */
    public function index(): JsonResponse
    {
        $packages = Package::with('category')
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $packages,
        ], 200);
    }

    /**
     * Store a newly created package in storage.
     *
     * POST /api/admin/packages
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'package_category_id' => 'required|exists:package_categories,id',
            'short_description' => 'nullable|string|max:1000',
            'price' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Package name is required.',
            'package_category_id.required' => 'Please select a package category.',
            'package_category_id.exists' => 'Selected package category is invalid.',
            'image.required' => 'Please select a valid package image.',
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

        $imagePath = $request->file('image')->store('packages', 'public');
        $slug = $this->generateUniqueSlug($request->input('title'));
        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $package = Package::create([
            'title' => $request->input('title'),
            'package_category_id' => (int) $request->input('package_category_id'),
            'slug' => $slug,
            'short_description' => $request->input('short_description'),
            'price' => $request->input('price'),
            'duration' => $request->input('duration'),
            'image' => $imagePath,
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        $package->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Package created successfully',
            'data' => $package,
        ], 201);
    }

    /**
     * Display the specified package.
     *
     * GET /api/admin/packages/{id}
     */
    public function show($id): JsonResponse
    {
        $package = Package::with('category')->find($id);

        if (! $package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
        ], 200);
    }

    /**
     * Update the specified package in storage.
     *
     * PUT/POST /api/admin/packages/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $package = Package::find($id);

        if (! $package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'package_category_id' => 'required|exists:package_categories,id',
            'short_description' => 'nullable|string|max:1000',
            'price' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Package name is required.',
            'package_category_id.required' => 'Please select a package category.',
            'package_category_id.exists' => 'Selected package category is invalid.',
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
            // Delete old image if exists
            if ($package->image && Storage::disk('public')->exists($package->image)) {
                Storage::disk('public')->delete($package->image);
            }
            $package->image = $request->file('image')->store('packages', 'public');
        }

        if ($request->has('title') && $request->input('title') !== $package->title) {
            $package->title = $request->input('title');
            $package->slug = $this->generateUniqueSlug($request->input('title'), $package->id);
        }

        if ($request->has('package_category_id')) {
            $package->package_category_id = (int) $request->input('package_category_id');
        }
        if ($request->has('short_description')) {
            $package->short_description = $request->input('short_description');
        }
        if ($request->has('price')) {
            $package->price = $request->input('price');
        }
        if ($request->has('duration')) {
            $package->duration = $request->input('duration');
        }
        if ($request->has('display_order')) {
            $package->display_order = (int) $request->input('display_order');
        }
        if ($request->has('is_active')) {
            $package->is_active = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $package->save();
        $package->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Package updated successfully',
            'data' => $package,
        ], 200);
    }

    /**
     * Remove the specified package from storage.
     *
     * DELETE /api/admin/packages/{id}
     */
    public function destroy($id): JsonResponse
    {
        $package = Package::find($id);

        if (! $package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found',
            ], 404);
        }

        // Delete associated image file from storage
        if ($package->image && Storage::disk('public')->exists($package->image)) {
            Storage::disk('public')->delete($package->image);
        }

        $package->delete();

        return response()->json([
            'success' => true,
            'message' => 'Package deleted successfully',
        ], 200);
    }

    /**
     * Generate a unique slug from package title.
     */
    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title) ?: 'package';
        $slug = $baseSlug;
        $counter = 1;

        while (
            Package::where('slug', $slug)
                ->when($ignoreId, function ($query, $id) {
                    return $query->where('id', '!=', $id);
                })
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
