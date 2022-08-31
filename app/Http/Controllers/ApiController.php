<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Common\Functions;
use App\Common\Validator;

use App\Models;

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
     *   register a test kit
     * args
     *   kit_id (required) (linked to kit in spot system)
     *   platform_user_id (required) (links kit to platform user id) (must be greater than 30 characters)
     *   first_name (required)
     *   last_name (required)
     *   email (required)
     * returns
     *   (none)
     */
    public function doPlatformUserKitRegister(Request $request) {

        
        header('Access-Control-Allow-Origin: *');

        // create response
        $response = new Response;

        // check inputs
        if (!$response->hasRequired($request, ['kit_id', 'platform_user_id', 'first_name', 'last_name', 'email'])) $response->jsonFailure('Missing required fields');

        // make sure platform user id is greater than 30 characters
        if (strlen($request->get('platform_user_id')) < 30) return $response->jsonFailure('Platform user id must be greater than 30 characters');

        // validate the email
        $validated_email = Validator::validateEmail($request->get('email'));
        if (!isset($validated_email)) return $response->jsonFailure('Invalid Email');

        // register the test kit

        

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
    public function getPlatformUserKitSearch(Request $request) {

        // create response
        $response = new Response;



        // return successful response
        return $response->jsonSuccess();

    }
}
