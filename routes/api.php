<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/countries', [ApiController::class, 'countries'])->name('api.countries');
Route::get('/counties', [ApiController::class, 'counties'])->name('api.counties');
Route::get('/constituencies', [ApiController::class, 'constituencies'])->name('api.constituencies');
Route::get('/wards', [ApiController::class, 'wards'])->name('api.wards');
Route::get('/events', [ApiController::class, 'events'])->name('api.events');
Route::get('/news', [ApiController::class, 'news'])->name('api.news');
Route::get('/gallerly', [ApiController::class, 'gallerly'])->name('api.gallerly');
Route::post('/confirm', [ApiController::class, 'confirm'])->name('api.confirm');
Route::post('/unsubscribe', [ApiController::class, 'unsubscribe'])->name('api.unsubscribe');

Route::get('/search', [SearchController::class, 'search']);

Route::prefix('otp')->group(function () {
    Route::post('/send', [ApiController::class, 'send'])->name('api.otp.send');
    Route::post('/verify', [ApiController::class, 'verify'])->name('api.otp.verify');
});
