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
	public function doMigrate()
	{
		set_time_limit(60);
		Artisan::call("migrate", ['--force' => 'default']);
		$response = new Response;
		return $response->jsonSuccess();
	}

    /**purpose
     *   shows view to authentiate (register, login, verify email, reset password)
     * args
     *   (none)
     * returns
     *   authenticate view
     */
    public function showAuthentication() {
        //if (Auth::check()) return Redirect::to('/portal');
        return view('authentication');
    }

    /**purpose 
     *   shows user portal view (customer interacts with site)
     * args
     *   (none)
     * returns
     *   user portal view
     */
    public function showAdmin() {
        //if (!Auth::check()) return Redirect::to('/');
        return view('admin');
    }

    /**purpose 
     *   shows user portal view (customer interacts with site)
     * args
     *   (none)
     * returns
     *   user portal view
     */
    public function showClient() {
        //if (!Auth::check()) return Redirect::to('/');
        return view('client');
    }
}