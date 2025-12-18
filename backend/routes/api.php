<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CateringController;
use App\Http\Controllers\ServiceCharterController;

Route::post('/catering-inquiry', [CateringController::class, 'store']);
Route::post('/download-charter', [ServiceCharterController::class, 'download']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
