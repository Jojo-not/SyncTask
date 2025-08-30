<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TasksController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
     Route::get('/user', [AuthController::class, 'checkAuth']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/tasks', [TasksController::class, 'index']);
    Route::post('/tasks', [TasksController::class, 'store']);
    Route::put('/tasks/{id}', [TasksController::class, 'update']);
    Route::delete('/tasks/{id}', [TasksController::class, 'destroy']);
    Route::get('/{userId}/tasks', [TasksController::class, 'getUserTasks']);
    Route::patch('/tasks/{id}/status', [TasksController::class, 'updateStatus']);
    Route::get('/tasks/stats', [TasksController::class, 'getTaskStats']); 
    Route::get('/tasks/search', [TasksController::class, 'search']);
    Route::get('/tasks/priority', [TasksController::class, 'getTasksByPriority']);
    Route::get('/tasks/status', [TasksController::class, 'getTasksByStatus']);
    Route::get('/tasks/due-today', [TasksController::class, 'getTasksDueToday']);
    Route::get('/tasks/overdue', [TasksController::class, 'getOverdueTasks']);
    Route::get('/tasks/priority/{priority}', [TasksController::class, 'getTasksByPriority']);
    Route::get('/tasks/status/{status}', [TasksController::class, 'getTasksByStatus']);
    Route::get('/tasks/due-today', [TasksController::class, 'getTasksDueToday']);
    Route::get('/tasks/overdue', [TasksController::class, 'getOverdueTasks']);
      
    Route::get('/profile', [SettingController::class, 'getProfile']);
    Route::post('/settings/email', [SettingController::class, 'updateEmail']);
    Route::post('/settings/password', [SettingController::class, 'updatePassword']);
});