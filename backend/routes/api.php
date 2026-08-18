<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\PackageCategoryController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Health Check API Endpoint
|--------------------------------------------------------------------------
*/
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Robi Air Overseas API is running',
    ]);
});

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::get('/hero-slides', [HeroSlideController::class, 'publicIndex']);
Route::get('/services', [ServiceController::class, 'publicIndex']);

/*
|--------------------------------------------------------------------------
| Admin Protected API Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/me', [AdminAuthController::class, 'me']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        // Hero Slides Management
        Route::get('/hero-slides', [HeroSlideController::class, 'index']);
        Route::post('/hero-slides', [HeroSlideController::class, 'store']);
        Route::get('/hero-slides/{id}', [HeroSlideController::class, 'show']);
        Route::put('/hero-slides/{id}', [HeroSlideController::class, 'update']);
        Route::post('/hero-slides/{id}', [HeroSlideController::class, 'update']);
        Route::delete('/hero-slides/{id}', [HeroSlideController::class, 'destroy']);

        // Services Management
        Route::get('/services', [ServiceController::class, 'index']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::get('/services/{id}', [ServiceController::class, 'show']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::post('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

        // Package Categories & Packages Management
        Route::get('/package-categories', [PackageCategoryController::class, 'index']);
        Route::get('/packages', [PackageController::class, 'index']);
        Route::post('/packages', [PackageController::class, 'store']);
        Route::get('/packages/{id}', [PackageController::class, 'show']);
        Route::put('/packages/{id}', [PackageController::class, 'update']);
        Route::post('/packages/{id}', [PackageController::class, 'update']);
        Route::delete('/packages/{id}', [PackageController::class, 'destroy']);
    });
});
