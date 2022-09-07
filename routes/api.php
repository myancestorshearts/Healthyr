<?php

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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::get('/test/results', 'ApiController@getTestResults');

Route::post('/email/link', 'ApiController@doEmailLink');
Route::post('/email/link/confirm', 'ApiController@doEmailLinkConfirm');

Route::get('/platform/user', 'ApiController@getPlatformUser'); // completed
Route::post('/platform/user/register', 'ApiController@doPlatformUserRegister'); // completed
Route::post('/platform/user/kit/register', 'ApiController@doPlatformUserKitRegister'); // completed
Route::get('/platform/user/kits', 'ApiController@getPlatformUserKits'); // completed
Route::get('/platform/user/registration/token', 'ApiController@getPlatformUserRegistrationToken'); // completed