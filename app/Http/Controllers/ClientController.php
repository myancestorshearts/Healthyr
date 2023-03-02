<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;
use App\Common\Response;

use App\Models\Mysql;

use App\Libraries;

use ApiAuth;

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


	/**purpose
	 *   Register a kit to a user
	 * args
	 *   kit_id (required) - specifies what kit
	 * return 
	 *   model - model after it has been set 
	 */
	public function doKitRegister(Request $request) {
        // create response
        $response = new Response;

        // check inputs
        if (!$response->hasRequired($request, ['kit_id', 'platform_user_id'])) $response->jsonFailure('Missing required fields');

        // validate platform user id
        $platform_user_id_validated = Validator::validateText($request->get('platform_user_id'), ['clearable' => false]);
        if (!isset($platform_user_id_validated)) return $response->jsonFailure('Invalid platform user id');

        $platform_user = Mysql\Common\PlatformUser::where([
            ['platform_user_id', '=', $platform_user_id_validated],
            ['active', '=', 1]
        ])->limit(1)->get()->first();
        if (!isset($platform_user)) return $response->jsonFailure('Invalid platform user id');

        // validate platform user id
        $kit_id_validated = Validator::validateText($request->get('kit_id'), ['clearable' => false]);
        if (!isset($kit_id_validated)) return $response->jsonFailure('Invalid platform user id');

        // check to see if kit is registered to someone else then do not allow
        //    I Feel like this will have to be removed one day - Its a check Logan requested
        $existing_user_kit = Mysql\Common\PlatformUserKit::where([
            ['kit_id', '=', $kit_id_validated],
            ['active', '=', 1],
            ['platform_user_id', '!=', $platform_user_id_validated]
        ])->limit(1)->get()->first();
        if (isset($existing_user_kit)) return $response->jsonFailure('Kit already registered to someone else');

        // check to see if kit already exists for platform user
        $platform_user_kit = Mysql\Common\PlatformUserKit::where([
            ['platform_user_id', '=', $platform_user_id_validated],
            ['kit_id', '=', $kit_id_validated]
        ])->limit(1)->get()->first();

        // if platform user kit does not exist then create it 
        if (!isset($platform_user_kit)) {

            // check test kit
            $spot = new Libraries\Spot;
            $validated_kit_response = $spot->getKit($kit_id_validated);
            if (!$validated_kit_response->has('kit')) return $response->jsonFailure('Invalid kit id. Please double check and try again.');
            
            // check type
            $validated_kit = $validated_kit_response->get('kit');
            $contains_diabetes = false;
            if (isset($validated_kit->panels)) {
                foreach($validated_kit->panels as $panel) {
                    if ($panel == Mysql\Common\PlatformUserKit::PANEL_DIABETES) $contains_diabetes = true;
                }
            }

            // if kit contains diabetes panel then we need to call john hopkins. 
            if ($contains_diabetes) {
                $john_hopkins = new Libraries\JohnHopkins;
                $john_hopkins->register($platform_user);
            }

            $platform_user_kit = new Mysql\Common\PlatformUserKit;
            $platform_user_kit->platform_user_id = $platform_user_id_validated;
            $platform_user_kit->kit_id = $kit_id_validated;
        }

        // save platform user and make sure its active
        $platform_user_kit->active = 1;
        $platform_user_kit->save();

        // return successful response
        return $response->jsonSuccess();
    }

    public function getKits(Request $request) {


        // create response
        $response = new Response;

        // check for platform user
        $user = Mysql\Common\User::where('id', '=', ApiAuth::user()->id)->limit(1)->get()->first();
        if (!isset($user)) return $response->jsonFailure('No user exists with user id', 'INVALID_USER_ID', 'INVALID_USER_ID');

        // get kits
        $user_kits = Mysql\Common\UserKit::where([
            ['user_id', '=', $user->id],
            ['active', '=', 1]
        ])->get();


        $filter_age = 250;
        $filter_gender = $user->gender;

        // spot kits 
        $spot_kits = [];
        foreach($user_kits as $user_kit) {

            // call the patient api
            $spot = new Libraries\Spot;
            $kit_response = $spot->getKit($user_kit->kit_id);
            if ($kit_response->isSuccess()) {

                $spot_kit = $kit_response->get('kit');

                
                foreach ($spot_kit->samples as $sample) {
                    if ($sample->status == 'resulted') {
                        $filtered_results = [];
                        foreach($sample->report->results as $result) {
                            $analyte = Mysql\Common\Analyte::where('key', '=', $result->name)->limit(1)->get()->first();


                            
                            $result->description = 'No Description. Contact Support';

                            $result->effect = 'No Effect. Contact Support';

                            $result->report_min = 0;
                            $result->low_min = 10;
                            $result->healthy_min = 25;
                            $result->healthy_max = 50;
                            $result->high_max = 60;
                            $result->report_max = 90;


                            if (isset($analyte)) {
                                $result->description = $analyte->description;
                                
                                $analyte_range = Mysql\Common\AnalyteRange::where([
                                    ['analyte_id', '=', $analyte->id],
                                    ['gender', '=', $filter_gender],
                                    ['age_min_months', '<', $filter_age],
                                    ['pregnant', '=', 0]
                                ])->whereRaw('(age_max_months > ' . $filter_age . ' OR age_max_months IS NULL)')->limit(1)->get()->first();
                              
                               

                                if (isset($analyte_range)) {
                                    $result->report_min = $analyte_range->report_min;
                                    $result->low_min = $analyte_range->low_min;
                                    $result->healthy_min = $analyte_range->healthy_min;
                                    $result->healthy_max = $analyte_range->healthy_max;
                                    $result->high_max = $analyte_range->high_max;
                                    $result->report_max = $analyte_range->report_max;

                                    $result_filtered = str_replace('<', '', str_replace('>', '', $result->result));

                                    $analyte_range_effect = Mysql\Common\AnalyteRangeEffect::where([
                                        ['analyte_range_id', '=', $analyte_range->id],
                                        ['min', '<=', $result_filtered]
                                    ])->whereRaw('(max > '. $result_filtered . ' OR max IS NULL)')->limit(1)->get()->first();
                                    if (isset($analyte_range_effect)) {
                                        $result->effect = $analyte_range_effect->effect;
                                        $filtered_results[] = $result;
                                    }

                                    // set healthy, warning, unhealthy
                                    $result->range_placement = 'healthy';
                                    if (isset($result->healthy_min) && $result_filtered < $result->healthy_min) {
                                        $result->range_placement = (!isset($result->low_min) || $result_filtered < $result->low_min) ? 'unhealthy' : 'warning';
                                    }
                                    if (isset($result->healthy_max) && $result_filtered > $result->healthy_max) {
                                        $result->range_placement = (!isset($result->high_max) || $result_filtered > $result->high_max) ? 'unhealthy' : 'warning';
                                    }
                                }
                            }
                        }
                        $sample->report->results = $filtered_results;
                    }
                }

                if (isset($user_kit->result_file_id)) {
                    $spot_kit->result_pdf_url = $user_kit->getResultPdfUrl();
                }

                $spot_kits[] = $spot_kit;
            }
        }

        // set kits
        $response->set('kits', $spot_kits);

        // return successful response
        return $response->jsonSuccess();    

    }
}