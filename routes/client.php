<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('set', 'ClientController@doSet');
Route::get('kits', 'ClientController@getKits');
Route::post('kits/register', 'ClientController@doKitRegister');


// user
Route::get('user', 'ClientController@getUser');
Route::post('user/set', 'ClientController@doUserSet');
Route::post('user/password/set', 'ClientController@doUserPasswordSet');

