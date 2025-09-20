<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuItemController; // ✅ staff menu CRUD
use App\Models\MenuItem;

Route::get('/health', fn () => response()->json(['ok' => true]));

// ================= AUTH =================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [UserController::class, 'me']);
    Route::put('/me',      [UserController::class, 'update']);

    // ===== CUSTOMER ORDERS =====
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders',  [OrderController::class, 'index']);

    // ===== STAFF ROUTES =====
    Route::middleware(['auth:sanctum','role:staff'])->group(function () {
    Route::get('/staff/orders', [OrderController::class,'staffIndex']);
    Route::put('/staff/orders/{order}/status', [OrderController::class,'updateStatus']);
    Route::get('/staff/summary', [OrderController::class,'summary']);
    Route::post('/menu', [MenuItemController::class,'store']);
    Route::put('/menu/{id}', [MenuItemController::class,'update']);
    Route::delete('/menu/{id}', [MenuItemController::class,'destroy']);
});

});

// ================= PUBLIC MENU =================
Route::get('/menu', function () {
    return MenuItem::where('is_available', true)
        ->orderBy('name')
        ->get();
});
