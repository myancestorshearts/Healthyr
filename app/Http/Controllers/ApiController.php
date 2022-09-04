<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;

use App\Models;

use App\Libraries;

class ApiController extends BaseController
{

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
        $email_links = Models\EmailLink::where('external_id', '=', $request->get('id'))->get();

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
        $email_link_code = new Models\EmailLinkCode;
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
        $email_link_code = Models\EmailLinkCode::where([
            ['external_id', '=', $request->get('id')],
            ['email', '=', $request->get('email')],
            ['code', '=', $request->get('code')]
        ])->limit(1)->get()->first();

        if (!isset($email_link_code)) return $response->jsonFailure('Invalid code');

        $email_link_code->delete();
        
        
        // link email to id so that future calls to get test results are allowed

        $email_link = Models\EmailLink::where([
            ['email', '=', $email_link_code->email],
            ['external_id', '=', $email_link_code->external_id]
        ])->limit(1)->get()->first();

        if (!isset($email_link)) $email_link = new Models\EmailLink;

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
        $platform_user = Models\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
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

        $platform_user = new Models\PlatformUser;
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
        $platform_user = Models\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
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

        // make sure platform user id is greater than 8 characters
        if (strlen($request->get('platform_user_id')) < 8) return $response->jsonFailure('Platform user id must be greater than 8 characters');

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

        // get all kit ids 
        

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
        $platform_user = Models\PlatformUser::where('platform_user_id', '=', $request->get('platform_user_id'))->limit(1)->get()->first();
        if (!isset($platform_user)) return $response->jsonFailure('No user exists with platform user id', 'INVALID_PLATFORM_USER_ID', 'INVALID_PLATFORM_USER_ID');

        // call the patient api
        $spot = new Libraries\Spot;
        $token_response = $spot->getRegistrationToken($platform_user);
        if ($token_response->isFailure()) return $token_response->jsonFailure();

        // return successful response
        return $token_response->jsonSuccess();
    }
}
