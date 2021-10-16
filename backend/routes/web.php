<?php

use App\Http\Controllers\DepositController;
use App\Http\Controllers\WithdrawController;
use App\Models\Deposit;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'dashboard');
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/deposits', [DepositController::class, 'index']);

    Route::resource('deposit', DepositController::class);
    Route::resource('withdraw', WithdrawController::class);
});



require __DIR__ . '/auth.php';