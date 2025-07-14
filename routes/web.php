<?php

use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontend/Home');
})->name('/');

Route::get('/about', function () {
    return Inertia::render('Frontend/About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::get('/event', function () {
    return Inertia::render('Frontend/Event/Index');
})->name('event');

Route::get('/careers', function () {
    return Inertia::render('Frontend/Careers');
})->name('careers');

Route::prefix('resource')->group(function () {
    Route::get('/downloads', [ResourceController::class, 'downloads'])->name('resource.downloads');
    Route::get('/privacy', [ResourceController::class, 'privacy'])->name('resource.privacy');
    Route::get('/faq', [ResourceController::class, 'faq'])->name('resource.faq');
});

require __DIR__ . '/auth.php';
