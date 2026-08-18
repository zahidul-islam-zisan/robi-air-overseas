<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PackageCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PackageCategoryController extends Controller
{
    /**
     * Display a listing of package categories for admin package forms.
     * Auto-seeds standard categories if the table is empty.
     *
     * GET /api/admin/package-categories
     */
    public function index(): JsonResponse
    {
        if (PackageCategory::count() === 0) {
            $defaultCategories = [
                'Hajj',
                'Umrah',
                'Tour',
                'Visa',
                'Air Ticket',
                'Other',
            ];

            foreach ($defaultCategories as $categoryName) {
                PackageCategory::create([
                    'name' => $categoryName,
                    'slug' => Str::slug($categoryName),
                    'is_active' => true,
                ]);
            }
        }

        $categories = PackageCategory::where('is_active', true)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ], 200);
    }
}
