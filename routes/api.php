<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Users Routes
Route::apiResource('users', UserController::class);
Route::get('users/{userId}/articles', [ArticleController::class, 'userArticles']);
Route::get('users/{userId}/comments', [CommentController::class, 'userComments']);

// Articles Routes
Route::apiResource('articles', ArticleController::class);
Route::get('articles/{articleId}/comments', [CommentController::class, 'articleComments']);

// Comments Routes
Route::apiResource('comments', CommentController::class);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('dashboard', [AdminController::class, 'dashboard']);
    Route::get('users', [AdminController::class, 'users']);
    Route::get('articles', [AdminController::class, 'articles']);
    Route::get('comments', [AdminController::class, 'comments']);
});

// Additional utility routes
Route::get('profile', [UserController::class, 'profile']);