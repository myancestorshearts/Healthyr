<?php

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
// migrations
Route::get('/migrate', 'ViewController@doMigrate');
Route::post('/migrate', 'ViewController@doMigrate');

// admin portal
Route::get('/admin', 'ViewController@showAdmin');
Route::get('/admin/{path}', 'ViewController@showAdmin')->where('path', '.*');


// client portal
Route::get('/client', 'ViewController@showClient');
Route::get('/client/{path}', 'ViewController@showClient')->where('path', '.*');

// authentication
Route::get('/', 'ViewController@showAuthentication');
Route::get('/register', 'ViewController@showAuthentication');
Route::get('/forgot', 'ViewController@showAuthentication');
Route::get('/set', 'ViewController@showAuthentication');
Route::get('/verify', 'ViewController@showAuthentication');
Route::get('/thank-you', 'ViewController@showAuthentication');
Route::get('/shopify-set', 'ViewController@showAuthentication');
