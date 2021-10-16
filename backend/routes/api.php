<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('create-room', [RoomController::class, 'create']);
Route::post('join-room', [RoomController::class, 'join']);
Route::post('leave-room', [RoomController::class, 'leave']);
Route::post('get-game-status', [RoomController::class, 'game_status']);
Route::post('check-user-in-room', [RoomController::class, 'check_user_in_room']);
Route::post('get-room', [RoomController::class, 'get_room']);




Route::post('register', [AuthController::class, 'register']);
Route::post('/api-login', [AuthenticatedSessionController::class, 'apiStore']);

require __DIR__ . '/auth.php';