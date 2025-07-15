<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontend/Home');
})->name('/');

Route::get('/about', function () {
    return Inertia::render('Frontend/About');
})->name('about');

Route::get('/event', function () {
    return Inertia::render('Frontend/Event/Index');
})->name('event');

Route::get('/careers', function () {
    return Inertia::render('Frontend/Careers');
})->name('careers');

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::prefix('resource')->group(function () {
    Route::get('/downloads', [ResourceController::class, 'downloads'])->name('resource.downloads');
    Route::get('/privacy', [ResourceController::class, 'privacy'])->name('resource.privacy');
    Route::get('/faq', [ResourceController::class, 'faq'])->name('resource.faq');
});

Route::prefix('donation')->group(function () {
    Route::get('/appeal', [DonationController::class, 'appeal'])->name('donation.appeal');
    Route::get('/financial', [DonationController::class, 'financial'])->name('donation.financial');
    Route::get('/office', [DonationController::class, 'office'])->name('donation.office');
    Route::get('/specialized', [DonationController::class, 'specialized'])->name('donation.specialized');
});

require __DIR__ . '/auth.php';
