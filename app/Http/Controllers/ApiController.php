<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;
use App\Common\Response;

use App\Models\Mysql;

use App\Libraries;

class ApiController extends BaseController
{


	/**purpose
	 *   register a user
	 * args
	 *   user_id (optional) (only exists if user is installing app from store)
	 *   first_name (required)
	 *   last_name (required)
	 *   email (required)
	 *   password (required)
	 *   company (optional)
	 *   phone (required)
	 *   code (optional)
 	 * returns
	 *   user
	 */
	public function doRegister(Request $request) {

        // create response
        $response = new Response;

        // validate requests has all required arguments
        if (!$response->hasRequired($request, ['name', 'email', 'phone', 'password'])) return $response->jsonFailure('Missing required fields');

        // validate various fields to make sure they are valid
        $validated_name = Validator::validateText($request->get('name'), ['trim' => true]);
        if (!isset($validated_name)) return $response->jsonFailure('Invalid name', 'INVALID_ARGS');

        $validated_company = Validator::validateText($request->get('company', ''), ['trim' => true, 'clearable' => true]);
        if (!isset($validated_company)) return $response->jsonFailure('Invalid company name', 'INVALID_ARGS');
        
        $validated_email = Validator::validateEmail($request->get('email', ''));
        if (!isset($validated_email)) return $response->jsonFailure('Invalid email', 'INVALID_ARGS');
        
        $validated_phone = Validator::validatePhone($request->get('phone', ''));
        if (!isset($validated_phone)) return $response->jsonFailure('Invalid phone', 'INVALID_ARGS');

		// check to see if user exists with email already
		if (Mysql\Common\User::where('email', '=', $validated_email)->count() > 0) return $response->jsonFailure('User already exists with email', 'DUPLICATE_USER');

        // create initial user and set defaults
		$user = new Mysql\Common\User;

		// set credentials
		$user->name = $validated_name;
		$user->company = $validated_company;
		$user->email = $validated_email;
		$user->phone = $validated_phone;
		$user->verified = 0;
		$user->admin = 0;
		$user->active = 1;
		
		// set password
		if (!$user->setPassword($request->get('password'))) return $response->jsonFailure('Password does not meet requirements. Password must be at least 8 characters long', 'PASSWORD_FAILED_REQUIREMENTS');

		// save the user
		$user->save();
		
		// send email 
		$user->sendVerificationEmail();

		// send admin new user
		$user->sendAdminNewUser();

		// set user in response
		$response->set('user', $user);
    
		// return response
        return $response->jsonSuccess();
	}

	/**purpose
	 *   login user and get tokens
	 * args
	 *   email (required)
	 *   password (required)
	 * returns
	 *   user
	 *   token 
	 */
	public function doLogin(Request $request) {
        
        // create response
		$response = new Response;

        // check for arguments
		if (!$response->hasRequired($request, ['email', 'password'])) return $response->jsonFailure('Missing required fields');

		// validate email
        $validated_email = Validator::validateEmail($request->get('email', ''));
        if (!isset($validated_email)) return $response->jsonFailure('Invalid email', 'INVALID_ARGS');

        // get user by email
        $user = Mysql\Common\User::where('email', '=', $validated_email)->limit(1)->get()->first();
		if (!isset($user)) return $response->jsonFailure('Invalid credentials');

		// check password
		if (!$user->checkPassword($request->get('password'))) return $response->jsonFailure('Invalid credentials');

		// check to make sure email is verified
		if (!Validator::validateBoolean($user->verified)) return $response->jsonFailure('Email is not verified - Must verify before you can log in');

		// check to make sure email is verified
		if (!Validator::validateBoolean($user->active)) return $response->jsonFailure('Invalid credentials');

		// create access token
		$tokens = $user->generateTokens();

		// set response
		$response->set('tokens', $tokens);
		$response->set('user', $user);

        // return successful response
		return $response->jsonSuccess();
	}
	
	/**purpose 
	 *   verify email
	 * args
	 *   key (required)
	 * returns
	 *   result
	 */
	public function doVerifyEmail(Request $request)
	{
		// create response
		$response = new Response;

		// verify has required arguments
		if (!$response->hasRequired($request, ['key'])) return $response->jsonFailure('Missing required fields');

		// decrypt key 
		$email = decrypt($request->get('key'));
		
		// get user
		$user = Mysql\Common\User::where('email', '=', $email)->limit(1)->get()->first();
		if (!isset($user)) return $response->jsonFailure('User not found');

		// set email is verified
		$user->verified = true;

		// save user
		$user->save();

		// return successful repsonse
		return $response->jsonSuccess();
	}

	
	/**purpose
	 *   request a forgotton password
	 * args
	 *   email (required)
	 * returns
	 *   result
	 */
	public function doPasswordRequest(Request $request) {
		// create response
		$response = new Response;

		// check to make sure required fields are set
		if (!$response->hasRequired($request, ['email'])) return $response->jsonFailure('Missing required fields');

		// validate email
        $validated_email = Validator::validateEmail($request->get('email', ''));
        if (!isset($validated_email)) return $response->jsonFailure('Invalid email', 'INVALID_ARGS');

		// check to make sure account exists
		$user = Mysql\Common\User::where('email', '=', $validated_email)->limit(1)->get()->first();
		if (!isset($user)) return $response->jsonFailure('No user found associated with email.');

		// send reset request
		$user->sendPasswordRequest();
		
		// return successful repsonse
		return $response->jsonSuccess();
	}

	/**purpose
	 *   set password
	 * args
	 *   key (required)
	 *   password (required)
	 * returns
	 *   (none)
	 */
	public function doPasswordSet(Request $request) {

		// create response
		$response = new Response;

		// check key 
		if (!$response->hasRequired($request, ['key', 'password'])) return $response->jsonFailure('Missing required fields');

		// decrypted key
		$decrypted_key = decrypt($request->get('key'));

		// get email and expire
		$decrypted_parts = explode('#', $decrypted_key);
		if (count($decrypted_parts) != 2) return $response->jsonFailure('Invalid key');
		$email = $decrypted_parts[0];
		$time = $decrypted_parts[1];

		// check time 
		if ($time < time()) return $response->jsonFailure('Password reset expired.  Please request another password reset');

		// get user from email
		$user = Mysql\Common\User::where('email', '=', $email)->limit(1)->get()->first();
		$user->verified = 1;
		if (!isset($user)) return $response->jsonFailure('Invalid key');

		// check password that it meets requirements
		$password_result = $user->setPassword($request->get('password'));
		if (!$password_result) return $response->jsonFailure('Password did not meet requirements');

		// save user
		$user->save();

		// return successful repsonse
		return $response->jsonSuccess();
	}


    /**purpose
     *   get test results based on id that has verified emails
     * args
     *   id 
     * returns
     *   results
     */
    public function getTestResults(Request $request) {

        $response = new Response;
    
        // check args
        if (!$response->hasRequired($request, ['id'])) $response->jsonFailure('Missing required fields');
        
        // get all emails linked with id
        $email_links = Mysql\Common\EmailLink::where('external_id', '=', $request->get('id'))->get();

        $tests_by_email = [];
        foreach ($email_links as $email_link) {

            if (!isset($tests_by_email[$email_link->email])) $tests_by_email[$email_link->email] = [];

            // call spots api to get test results by email

        }

        // return results
        $response->set('results', $tests_by_email);
        return $response->jsonSuccess();
    }

    /**purpose
     *   link shopify account to email so client an see test results linked to their email
     * args
     *   id
     *   email
     * returns
     *   (none)
     */
    public function doEmailLink(Request $request) {
        
        // create response
        $response = new Response;

        // check args
        if (!$response->hasRequired($request, ['id', 'email'])) $response->jsonFailure('Missing required fields');

        // generate random code
        $code = Functions::getRandomID(6);

        // store code in database with expiring time stamp
        $email_link_code = new Mysql\Common\EmailLinkCode;
        $email_link_code->code = $code;
        $email_link_code->external_id = $request->get('id');
        $email_link_code->email = $request->get('email');
        $email_link_code->expire = Functions::convertTimeToMysql(strtotime('+ 10 minutes', time()));
        $email_link_code->save();

        // send email to customer with code
        return $response->jsonSuccess('Email sent');
    }

    /**purpose
     *   confirms link shopify account to email so client an see test results linked to their email
     * args
     *   id
     *   email
     *   code
     * returns
     *   (none)
     */
    public function doEmailLinkConfirm(Request $request) {

        $response = new Response;

        // check args
        if (!$response->hasRequired($request, ['id', 'email', 'code'])) $response->jsonFailure('Missing required fields');

        // confirm code with internal code.  '
        $email_link_code = Mysql\Common\EmailLinkCode::where([
            ['external_id', '=', $request->get('id')],
            ['email', '=', $request->get('email')],
            ['code', '=', $request->get('code')]
        ])->limit(1)->get()->first();

        if (!isset($email_link_code)) return $response->jsonFailure('Invalid code');

        $email_link_code->delete();
        
        
        // link email to id so that future calls to get test results are allowed

        $email_link = Mysql\Common\EmailLink::where([
            ['email', '=', $email_link_code->email],
            ['external_id', '=', $email_link_code->external_id]
        ])->limit(1)->get()->first();

        if (!isset($email_link)) $email_link = new Mysql\Common\EmailLink;

        $email_link->email = $email_link_code->email;
        $email_link->external_id = $email_link_code->external_id;
        $email_link->active = 1;
        $email_link->save();

        return $response->jsonSuccess('Linked email');
    }

    /**purpose
     *   create a platform user
     * args
     *   platform_user_id (required)
     *   first_name (required)
     *   last_name (required)
     *   email (required)
     *   phone (required)
     *   gender (required)
     *   date_of_birth (required)
     */
    public function doPlatformUserRegister(Request $request) {

        header('Access-Control-Allow-Origin: *');

        // create response
        $response = new Response;

        // check inputs
        if (!$response->hasRequired($request, ['first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender', 'platform_user_id'])) return $response->jsonFailure('Missing required fields');

        // check if platform user already exists
        $platform_user = Mysql\Common\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
        if (isset($platform_user)) return $response->jsonFailure('Platform user already exists');

        // validate email
        $email_validated = Validator::validateEmail($request->get('email'));
        if (!isset($email_validated)) return $response->jsonFailure('Invalid email');

        // validate phone
        $phone_validated = Validator::validatePhone($request->get('phone'));
        if (!isset($phone_validated)) return $response->jsonFailure('Invalid phone');

        // validate platform user id
        $platform_user_id_validated = Validator::validateText($request->get('platform_user_id'), ['clearable' => false]);
        if (!isset($platform_user_id_validated)) return $response->jsonFailure('Invalid platform user id');

        // validate first name
        $first_name_validated = Validator::validateText($request->get('first_name'), ['clearable' => false]);
        if (!isset($first_name_validated)) return $response->jsonFailure('Invalid first name');
        
        // validate last name
        $last_name_validated = Validator::validateText($request->get('last_name'), ['clearable' => false]);
        if (!isset($last_name_validated)) return $response->jsonFailure('Invalid last name');

        // validate gender 
        $gender = $request->get('gender');
        if ($gender != 'M' && $gender != 'F' && $gender != 'O') return $response->jsonFailure('Invalid gender');

        // validate date of birth
        $date_of_birth = strtotime($request->get('date_of_birth'));
        if ($date_of_birth > time()) return $response->jsonFailure('Invalid date of birth');

        $platform_user = new Mysql\Common\PlatformUser;
        $platform_user->platform_user_id = $platform_user_id_validated;
        $platform_user->first_name = $first_name_validated;
        $platform_user->last_name = $last_name_validated;
        $platform_user->email = $email_validated;
        $platform_user->gender = $gender;
        $platform_user->date_of_birth = Functions::convertTimeToMysqlDateOnly($date_of_birth);
        $platform_user->phone = $phone_validated;
        $platform_user->active = 1;

        // call the patient api
        $spot = new Libraries\Spot;
        $patient_response = $spot->createPatient($platform_user);
        if ($patient_response->isFailure()) return $patient_response->jsonFailure();

        // set patient id and save
        $platform_user->patient_id = $patient_response->get('patient_id');
        $platform_user->save();

        // set platform user in response
        $response->set('platform_user', $platform_user);

        // return successful response
        return $response->jsonSuccess();
    }

    /**purpose
     *   get a platform user
     * args
     *   platform_user_id (required)
     * returns
     *   platform_user
     */
    public function getPlatformUser(Request $request) {

        header('Access-Control-Allow-Origin: *');

        // create response
        $response = new Response;

        // check to see if platform user exists
        if (!$response->hasRequired($request, ['platform_user_id'])) return $response->jsonFailure('Missing required fields');

        // check for platform user
        $platform_user = Mysql\Common\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
        if (!isset($platform_user)) return $response->jsonFailure('No user exists with platform user id', 'INVALID_PLATFORM_USER_ID', 'INVALID_PLATFORM_USER_ID');

        // set platform user
        $response->set('platform_user', $platform_user);

        // return response
        return $response->jsonSuccess();
    }


    /**purpose
     *   register a test kit
     * args
     *   kit_id (required) (linked to kit in spot system)
     *   platform_user_id (required) (links kit to platform user id) (must be greater than 30 characters)
     * returns
     *   (none)
     */
    public function doPlatformUserKitRegister(Request $request) {

        header('Access-Control-Allow-Origin: *');

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


    /**purpose
     *   search test kits registered to platform user
     * args
     *   platform_user_id (required) 
     * returns
     *   tests
     */
    public function getPlatformUserKits(Request $request) {

        header('Access-Control-Allow-Origin: *');

        // create response
        $response = new Response;

        // check inputs
        if (!$response->hasRequired($request, ['platform_user_id'])) $response->jsonFailure('Missing required fields');

        // check for platform user
        $platform_user = Mysql\Common\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
        if (!isset($platform_user)) return $response->jsonFailure('No user exists with platform user id', 'INVALID_PLATFORM_USER_ID', 'INVALID_PLATFORM_USER_ID');

        // get kits
        $platform_user_kits = Mysql\Common\PlatformUserKit::where([
            ['platform_user_id', '=', $platform_user->platform_user_id],
            ['active', '=', 1]
        ])->get();


        $filter_age = 250;
        $filter_gender = $platform_user->gender;

        // spot kits 
        $spot_kits = [];
        foreach($platform_user_kits as $platform_user_kit) {

            // call the patient api
            $spot = new Libraries\Spot;
            $kit_response = $spot->getKit($platform_user_kit->kit_id);
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

                if (isset($platform_user_kit->result_file_id)) {
                    $spot_kit->result_pdf_url = $platform_user_kit->getResultPdfUrl();
                }

                $spot_kits[] = $spot_kit;
            }
        }

        // set kits
        $response->set('kits', $spot_kits);

        // return successful response
        return $response->jsonSuccess();    

    }

    /**purpose
     *   get a test kit registration token
     * args
     *   platform_user_id (required)
     * returns
     *   token
     */
    public function getPlatformUserRegistrationToken(Request $request) {
        
        header('Access-Control-Allow-Origin: *');

        // create response
        $response = new Response;

        // check inputs
        if (!$response->hasRequired($request, ['platform_user_id'])) $response->jsonFailure('Missing required fields');

        // check for platform user
        $platform_user = Mysql\Common\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
        if (!isset($platform_user)) return $response->jsonFailure('No user exists with platform user id', 'INVALID_PLATFORM_USER_ID', 'INVALID_PLATFORM_USER_ID');

        // call the patient api
        $spot = new Libraries\Spot;
        $token_response = $spot->getRegistrationToken($platform_user);
        if ($token_response->isFailure()) return $token_response->jsonFailure();

        // return successful response
        return $token_response->jsonSuccess();
    }

    /**purpose
     *   get a result pdf
     * args
     *   kit_id (in url)
     *   platform_user_id (in url)
     * returns
     *   pdf
     */
    public function getPlatformUserKitResult($platform_user_id, $kit_id) {
        $response = new Response;

        // check for kit existance
        $kit = Mysql\Common\PlatformUserKit::find($kit_id);
        if (!isset($kit)) return $response->jsonFailure('Invalid kit id');
        if ($kit->platform_user_id != $platform_user_id) return $response->jsonFailure('Invalid kit id');

        // check to see if the pdf result is available
        if (!isset($kit->result_file_id)) return $response->jsonFailure(('Not authorized'));
        $file = Mysql\Common\File::find($kit->result_file_id);
        if (!isset($file)) return $response->jsonFailure(('Invalid file'));

        // resturn file response
        $contents = $file->download();
		return response($contents)->header('Content-Type', $file->mime_type);
    }
}
