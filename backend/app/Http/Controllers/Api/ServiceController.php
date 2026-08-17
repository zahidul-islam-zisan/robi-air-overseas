<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of services for admin management.
     *
     * GET /api/admin/services
     */
    public function index(): JsonResponse
    {
        $services = Service::orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ], 200);
    }

    /**
     * Store a newly created service in storage.
     *
     * POST /api/admin/services
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Service name is required.',
            'image.required' => 'Please select a valid service image.',
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

        $imagePath = $request->file('image')->store('services', 'public');
        $slug = $this->generateUniqueSlug($request->input('title'));
        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $service = Service::create([
            'title' => $request->input('title'),
            'slug' => $slug,
            'short_description' => $request->input('short_description'),
            'image' => $imagePath,
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'data' => $service,
        ], 201);
    }

    /**
     * Display the specified service.
     *
     * GET /api/admin/services/{id}
     */
    public function show($id): JsonResponse
    {
        $service = Service::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service,
        ], 200);
    }

    /**
     * Update the specified service in storage.
     *
     * PUT/POST /api/admin/services/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $service = Service::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Service name is required.',
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
            // Delete old image file if exists
            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }
            $service->image = $request->file('image')->store('services', 'public');
        }

        if ($request->has('title') && $request->input('title') !== $service->title) {
            $service->title = $request->input('title');
            $service->slug = $this->generateUniqueSlug($request->input('title'), $service->id);
        }

        if ($request->has('short_description')) {
            $service->short_description = $request->input('short_description');
        }
        if ($request->has('display_order')) {
            $service->display_order = (int) $request->input('display_order');
        }
        if ($request->has('is_active')) {
            $service->is_active = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        }

        $service->save();

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'data' => $service,
        ], 200);
    }

    /**
     * Remove the specified service from storage.
     *
     * DELETE /api/admin/services/{id}
     */
    public function destroy($id): JsonResponse
    {
        $service = Service::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found',
            ], 404);
        }

        // Delete associated image file from storage
        if ($service->image && Storage::disk('public')->exists($service->image)) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully',
        ], 200);
    }

    /**
     * Generate a unique slug from title.
     */
    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title) ?: 'service';
        $slug = $baseSlug;
        $counter = 1;

        while (
            Service::where('slug', $slug)
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
