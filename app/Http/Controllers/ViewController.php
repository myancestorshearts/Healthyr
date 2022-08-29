<?php namespace App\Http\Controllers;

use Auth;
use Redirect;



use Illuminate\Http\Request;
use App\Http\Controllers\Response;


use Artisan;

class ViewController extends Controller {

    /**purpose
     *   run migrations
     * args
     *   (none)
     * returns 
     *   result
     */
	public function doMigrate(Request $request)
	{
        dd('test');
        dd(env('APP_KEY'));
		set_time_limit(60);
		Artisan::call("migrate", ['--force' => 'default']);
		$response = new Response;
		return $response->jsonSuccess();
	}

}