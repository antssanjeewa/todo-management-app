<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TodoController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:auth');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::apiResource('todos', TodoController::class)->except(['show']);
    Route::patch('/todos/{todo}/toggle', [TodoController::class, 'toggleStatus']);
});