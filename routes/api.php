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


Route::post('/platform/user/kit/register', 'ApiController@doPlatformUserKitRegister');
Route::get('/platform/user/kit/search', 'ApiController@getPlatformUserKitSearch');
