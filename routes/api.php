<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;

// Semua endpoint resource public (tanpa autentikasi)
Route::get('orders/history', [OrderController::class, 'history']);
Route::apiResource('orders', OrderController::class);
Route::apiResource('menu-items', MenuItemController::class);
Route::apiResource('reports', ReportController::class);
// Profile CRUD (show, update)
Route::get('profile/{id}', [ProfileController::class, 'show']);
Route::put('profile/{id}', [ProfileController::class, 'updateProfileApi']);
// Dashboard API
Route::get('/dashboard/stats', [DashboardController::class, 'getOverviewStats']);
Route::get('/dashboard/recent-orders', [DashboardController::class, 'getRecentOrders']);
