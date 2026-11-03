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

Route::prefix('resource')->name('resource.')->group(function () {
    Route::get('/publications', [ResourceController::class, 'publications'])->name('publications');
    Route::get('/publications/{publication}', [ResourceController::class, 'showPublication'])->name('publication.show');
    Route::get('/publications/{publication}/pdf', [ResourceController::class, 'downloadPublicationPdf'])->name('publication.pdf');
    Route::get('/downloads', [ResourceController::class, 'downloads'])->name('downloads');
    Route::get('/privacy', [ResourceController::class, 'privacy'])->name('privacy');
    Route::get('/faq', [ResourceController::class, 'faq'])->name('faq');
});

Route::prefix('donation')->name('donation.')->group(function () {
    Route::get('/appeal', [DonationController::class, 'appeal'])->name('appeal');
    Route::get('/financial', [DonationController::class, 'financial'])->name('financial');
    Route::get('/office', [DonationController::class, 'office'])->name('office');
    Route::get('/specialized', [DonationController::class, 'specialized'])->name('specialized');
});

// Auth routes
require __DIR__ . '/auth.php';
