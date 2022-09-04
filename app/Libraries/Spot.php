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
		$this->endpoint = 'https://app.spotdx.com/api/v1/';
	}

	/**purpose
	 *   create curl for Pitney call includes access token
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
	 *   call a post for pitney that has auth token
	 * args
	 *   api
	 *   data
	 * returns
	 *   decoded response
	 */
	public function callPost($api, $data) {

		$this->createCurl($api);
		
		curl_setopt($this->curl, CURLOPT_POST, 1);
		curl_setopt($this->curl, CURLOPT_POSTFIELDS, json_encode($data)); 

		$server_output = curl_exec($this->curl);

		$server_decoded = json_decode($server_output);

		curl_close($this->curl);
		return $server_decoded;
	}

	
	/**purpose
	 *   call a post for pitney that has auth token
	 * args
	 *   api
	 *   data
	 * returns
	 *   decoded response
	 */
	public function callGet($api, $data) {

        $data_string = http_build_query($data);
        $this->createCurl($api . '?' . $data_string);

		$server_output = curl_exec($this->curl);
		$server_decoded = json_decode($server_output);

		curl_close($this->curl);
		return $server_decoded;
	}


    public function registerKit($kit_id, $email, $first_name, $last_name) {
        return true;
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

		$response->set('patient_id', $result->patient_id);

		return $response->setSuccess();
	}

}