<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CabinController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public (guest) routes
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store']);

// Routes for logged-in users only
Route::middleware('auth')->group(function () {
    Route::post('/logout', [SessionController::class, 'destroy'])->name('logout');

    Route::get('/', fn () => redirect('/dashboard'));
    //Route::get('/dashboard', fn () => Inertia::render('Dashboard'));
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    
    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{booking}/check-in', [BookingController::class, 'showCheckinPage']);

    Route::put('/bookings/{booking}/check-in', [BookingController::class, 'checkIn'])->name('bookings.checkIn');
    Route::put('/bookings/{booking}/check-out', [BookingController::class, 'checkOut'])->name('bookings.checkOut');

    Route::get('/bookings/{booking}', [BookingController::class, 'show']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

    // Cabins
    Route::get('/cabins', [CabinController::class, 'index']);
    Route::post('/cabins', [CabinController::class, 'store']);
    Route::post('/cabins/{cabin}', [CabinController::class, 'update']);
    Route::delete('/cabins/{cabin}', [CabinController::class, 'destroy']);

    // Settings
    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings/{setting}', [SettingController::class, 'update']);

    //Route::get('/account', fn () => Inertia::render('Account'));
    // Account Settings
    Route::post('/account/theme', [UserController::class, 'updateTheme'])->name('account.theme.update');
    Route::get('/account', [UserController::class, 'edit'])->name('account.edit');
    
    // Specific password route — first
    Route::put('/account/password', [UserController::class, 'updatePassword'])->name('account.password.update');
    // Generic update route — second
    Route::post('/account', [UserController::class, 'update'])->name('account.update');

    Route::get('/users', fn () => Inertia::render('Users'));
});
