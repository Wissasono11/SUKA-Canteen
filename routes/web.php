<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Homepage');
})->name('homepage');

// Error pages
Route::get('/unauthorized', function () {
    return Inertia::render('Auth/Unauthorized');
})->name('unauthorized');

Route::get('/pending-approval', function () {
    return Inertia::render('Auth/PendingApproval');
})->middleware('auth')->name('pending-approval');

// User routes
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('/menu', function () {
        return Inertia::render('User/Menu');
    })->name('user.menu');
});

// Canteen owner routes
Route::middleware(['auth', 'verified', 'role:canteen_owner'])->group(function () {
    Route::get('/canteen/dashboard', function () {
        return Inertia::render('CanteenOwner/Dashboard');
    })->name('canteen.dashboard');
});


// PASTIKAN BARIS INI ADA
require __DIR__ . '/auth.php';
