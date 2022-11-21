<?php
namespace App\Http\Middleware;

use Closure;

use App\Common\Response;
use App\Common\Validator;
use ApiAuth;

class AuthenticateAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
	public function handle($request, Closure $next)
    {   
        $response = new Response;
        $response->setStatusCode(401);// not authorized

        // check token for profile verification
        if (!ApiAuth::validateToken($request->header('authorization'))) return $response->jsonFailure('Not authorized');
        
        // check to make user is active 
        if (!Validator::validateBoolean(ApiAuth::user()->active)) return $response->jsonFailure('Not authorized');

        // check to see if the user is a support rep
        if (!Validator::validateBoolean(ApiAuth::user()->admin)) return $response->jsonFailure('Not authorized');

        // validation success proceed to next middleware
        return $next($request);
    }
}