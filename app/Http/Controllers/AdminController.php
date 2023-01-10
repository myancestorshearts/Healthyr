<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;
use App\Common\Response;

use App\Models\Mysql;

use App\Libraries;

use DB;

class AdminController extends BaseController
{

    public function getSearch(Request $request) {

        // create response
        $response = new Response;
        
        // check required fields
        if (!$response->hasRequired($request, ['classkey'])) return $response->jsonFailure('Missing required fields');
        $class = Mysql\Admin\Base::getClassFromClassKey($request->get('classkey'));
        if (!isset($class)) return $response->jsonFailure('Invalid class string');

        // get take and page
        $take = (int) min($request->get('take', 25), 1000);
        $page = (int) $request->get('page');

        // validate take
        if ($take <= 0) return $response->jsonFailure('Invalid take');

		// validate page
		if ($page <= 0) return $response->jsonFailure('Invalid page');

        // create query
        $query = $class::query();
    
        // apply the search
        $apply_search_result = $class::applyFilters($request, $query);
        if ($apply_search_result !== true) return $response->jsonFailure('Applying search filters failed');

        // generate meta information if include_meta is true
        if (Validator::validateBoolean($request->get('include_meta',  false)))
        {
			$count_query = clone ($query);
        	$count = count($count_query->select(DB::raw('count(*) as total'))->pluck('total')->all());
	        $response->set('total_count', $count);
	        $response->set('page_count', ceil($count / $take));
        	$response->set('take', $take);
        	$response->set('page', $page);
        }

		// order by arguments 
        $class::applyOrderBy($request, $query);

        // get models and set them in response
        $models = $class::getModels($query->take($take)->offset(($page - 1) * $take)->get(), $request);
        $response->set('models', $models);

		// return successful response
		return $response->jsonSuccess();
    }


	/**purpose
	 *   upload a file
	 * args
	 *   file
	 *   order_id (required)
	 * returns
	 *   (file)
	 */
	public function doFileUpload(Request $request) {
		
		$response = new Response;

		// set some server limits
		set_time_limit(6000);
		ini_set('memory_limit','1024M');

		// make sure we have a file upload 
		if (!$request->hasFile('file') || !$request->file('file')->isValid()) return $response->jsonFailure('Failed to upload file');

		// upload file to s3
		$uploaded_file = $request->file('file');
        $file_contents = file_get_contents($uploaded_file->path());

		// create file 
		$file = new Mysql\Common\File;
		$file->mime_type = $uploaded_file->getMimeType();
		$file->setType();
		$file->save();

		// create s3 client and put object to s3
		$s3_client = S3Client::factory(array(
			'credentials' => array(
				'key'    => env('AWS_ACCESS_KEY_ID'),
				'secret' => env('AWS_SECRET_ACCESS_KEY')
			),
			'region' => env('AWS_DEFAULT_REGION'),
			'version' => 'latest',
		));
		
		// save object to s3 storage
		$s3_client->putObject(array(
            'Bucket'            => env('AWS_BUCKET'),
            'Key'               => $file->id,
            'Body'              => $file_contents
        ));

		$response->set('model', $file);
		return $response->jsonSuccess();
	}
	
	/**purpose
	 *   generic add for admins to be able to add any type of model
	 * args
	 *   classkey (required) - specifies what type of model we are adding
	 * returns
	 *   model - added model
	 */
	public function doAdd(Request $request) {

		// create response
		$response = new Response;
		
        // check required fields
        if (!$response->hasRequired($request, ['classkey'])) return $response->jsonFailure('Missing required fields');

		// validate the class key
        $class = Mysql\Admin\Base::getClassFromClassKey($request->get('classkey'));
        if (!isset($class)) return $response->jsonFailure('Invalid classkey');

		return $class::create($request)->json();
	}
}
