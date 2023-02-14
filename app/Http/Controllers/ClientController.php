<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;
use App\Common\Response;

use App\Models\Mysql;

use App\Libraries;

class ClientController extends BaseController
{
	/**purpose
	 *   genrice set for admins to be able to set any type of model 
	 * args
	 *   classkey (required) - specifies what type of model we are setting
	 *   id (required) - the id specific to the row we are setting
	 * return 
	 *   model - model after it has been set 
	 */
	public function doSet(Request $request) {

		// create response
		$response = new Response;

		// check for required fields
		if (!$response->hasRequired($request, ['classkey', 'id'])) return $response->jsonFailure('Missing required fields');

		// validate the class key
        $class = Mysql\Client\Base::getClassFromClassKey($request->get('classkey'));
        if (!isset($class)) return $response->jsonFailure('Invalid classkey');

		// validate the id 
		$model = $class::find($request->get('id'));
		if (!isset($model)) return $response->jsonFailure('Invalid model id');

		// return success response
		return $model->set($request)->json();
	}
}