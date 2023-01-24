<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "admin" middleware group. Enjoy building your admin api!
|
*/

// search apis 
Route::get('search', 'AdminController@getSearch');

// generic add
Route::post('add', 'AdminController@doAdd');

// generic set
Route::post('set', 'AdminController@doSet');

//Route::get('properties', 'Controller@getProperties');


// report apis
//Route::get('counts', 'Controller@getCounts');
