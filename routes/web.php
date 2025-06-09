<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
    Route::get('/menu', [\App\Http\Controllers\MenuController::class, 'index'])->name('user.menu');
});

// Canteen owner routes
Route::middleware(['auth', 'verified', 'role:canteen_owner'])->group(function () {
    Route::get('/canteen/dashboard', function () {
        return Inertia::render('CanteenOwner/Dashboard');
    })->name('canteen.dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('CanteenOwner/Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        // Ganti 'User/Profile' dengan path halaman profil Anda
        return Inertia::render('User/Profile');
    })->name('profile.edit');
});


// PASTIKAN BARIS INI ADA
require __DIR__ . '/auth.php';
