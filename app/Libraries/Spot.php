<?php

namespace App\Libraries;

use App\Http\Controllers\Response;

class Spot {
    
	private $key;
	private $endpoint;
	private $curl;

	/**purpose
	 *   constructs class from environment variables
	 * args
	 *   (none)
	 * returns
	 *   (none)
	 */
	function __construct() {
		$this->key = env('SPOT_KEY', '');
		$this->endpoint = 'https://mytest.behealthyr.com/api/v1/';
	}

	/**purpose
	 *   create curl for Spot call includes access token
	 * args
	 *   api
	 * returns 
	 *   curl object ready for api call
	 */
	private function createCurl($api) {

		$this->curl = curl_init();

		curl_setopt($this->curl, CURLOPT_URL, $this->endpoint . $api);
		curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);

		$headers = [
			'Content-Type: application/json',
			'Authorization: Token ' . $this->key
		];

		curl_setopt($this->curl, CURLOPT_HTTPHEADER, $headers);
    }

	/**purpose
	 *   call a post for Spot that has auth token
	 * args
	 *   api
	 *   data
	 * returns
	 *   decoded response
	 */
	public function callPost($api, $data = []) {

		$this->createCurl($api);
		
		curl_setopt($this->curl, CURLOPT_POST, 1);
		curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode($data)); 
		
		$server_output = curl_exec($this->curl);

		$server_decoded = json_decode($server_output);

		curl_close($this->curl);
		return $server_decoded;
	}

	
	/**purpose
	 *   call a post for Spot that has auth token
	 * args
	 *   api
	 *   data
	 * returns
	 *   decoded response
	 */
	public function callGet($api, $data = null) {
		if (!isset($data)) $this->createCurl($api);
		else {
			$data_string = http_build_query($data);
			$this->createCurl($api . '?' . $data_string);
		}

		$server_output = curl_exec($this->curl);
		$server_decoded = json_decode($server_output);

		curl_close($this->curl);
		return $server_decoded;
	}


    public function getKit($kit_id) {
        
		$response = new Response;

		$result = $this->callGet('kits/' . strtoupper($kit_id) . '/');
		
		if (!isset($result->kit_id)) return $response->setFailure();
		
		$response->set('kit', $result);

		return $response->setSuccess();

    }

	public function createPatient($platform_user) {

		$response = new Response;

		$args = [
			'first_name' => $platform_user->first_name,
			'last_name' => $platform_user->last_name,
			'email' => $platform_user->email,
			'sex' => $platform_user->gender,
			'date_of_birth' => $platform_user->date_of_birth,
			'phone' => $platform_user->phone
		];

		$result = $this->callPost('patient/', $args);

		if (isset($result->error)) {
			$error_strings = [];
			foreach($result->error as $key => $value) {
				$error_strings[] = $key . ': ' . implode('', $value);
			}
			$error = implode(' - ', $error_strings);

			return $response->setFailure($error);
		}

		if (!isset($result->patient_id)) {
			return $response->setFailure('Patient could not be created - double check infor and try again: ' . json_encode($result));
		}

		$response->set('patient_id', $result->patient_id);

		return $response->setSuccess();
	}

	public function getRegistrationToken($platform_user) {
		
		$response = new Response;

		$result = $this->callPost('tokens/patient_registration/', ['patient_id' => $platform_user->patient_id]);

		if (isset($result->error)) {
			return $response->setFailure($result->error);
		}

		if (!isset($result->token)) {
			return $response->setFailure('Patient could not be created - double check infor and try again: ' . json_encode($result));
		}

		$response->set('token', $result->token);

		return $response->setSuccess();

	}

}