<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OverseasService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OverseasServiceController extends Controller
{
    /**
     * Display a listing of overseas services for admin management.
     *
     * GET /api/admin/overseas-services
     */
    public function index(): JsonResponse
    {
        $services = OverseasService::orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ], 200);
    }

    /**
     * Display a listing of active overseas services for the public website.
     *
     * GET /api/overseas-services
     */
    public function publicIndex(): JsonResponse
    {
        $services = OverseasService::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ], 200);
    }

    /**
     * Store a newly created overseas service in storage.
     *
     * POST /api/admin/overseas-services
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Service title is required.',
            'image.required' => 'Please select a valid image.',
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

        $imagePath = $request->file('image')->store('overseas-services', 'public');
        $slug = $this->generateUniqueSlug($request->input('title'));
        $isActive = filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN);

        $service = OverseasService::create([
            'title' => $request->input('title'),
            'country' => $request->input('country'),
            'slug' => $slug,
            'description' => $request->input('description'),
            'image' => $imagePath,
            'display_order' => (int) $request->input('display_order', 0),
            'is_active' => $isActive,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Overseas service created successfully',
            'data' => $service,
        ], 201);
    }

    /**
     * Display the specified overseas service.
     *
     * GET /api/admin/overseas-services/{id}
     */
    public function show($id): JsonResponse
    {
        $service = OverseasService::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Overseas service not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service,
        ], 200);
    }

    /**
     * Update the specified overseas service in storage.
     *
     * PUT/POST /api/admin/overseas-services/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $service = OverseasService::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Overseas service not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'display_order' => 'nullable|integer',
            'is_active' => 'nullable',
        ], [
            'title.required' => 'Service title is required.',
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
            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }
            $service->image = $request->file('image')->store('overseas-services', 'public');
        }

        if ($request->has('title') && $request->input('title') !== $service->title) {
            $service->title = $request->input('title');
            $service->slug = $this->generateUniqueSlug($request->input('title'), $service->id);
        }

        if ($request->has('country')) {
            $service->country = $request->input('country');
        }
        if ($request->has('description')) {
            $service->description = $request->input('description');
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
            'message' => 'Overseas service updated successfully',
            'data' => $service,
        ], 200);
    }

    /**
     * Remove the specified overseas service from storage.
     *
     * DELETE /api/admin/overseas-services/{id}
     */
    public function destroy($id): JsonResponse
    {
        $service = OverseasService::find($id);

        if (! $service) {
            return response()->json([
                'success' => false,
                'message' => 'Overseas service not found',
            ], 404);
        }

        if ($service->image && Storage::disk('public')->exists($service->image)) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Overseas service deleted successfully',
        ], 200);
    }

    /**
     * Generate a unique slug from title.
     */
    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title) ?: 'overseas-service';
        $slug = $baseSlug;
        $counter = 1;

        while (
            OverseasService::where('slug', $slug)
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
