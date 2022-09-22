<?php

namespace App\Libraries;

use App\Http\Controllers\Response;

class JohnHopkins {
    
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
		$this->endpoint = 'https://jh-prod-integration-api.azure-api.net/healthyr/api/';
	}

    /**purpose
     *   get an access token from john hopkins
     * args
     *   none
     * returns
     *   token
     */
    private function getAccessToken() {
        
		$curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, 'https://login.microsoftonline.com/605bb507-9dca-402b-b95f-c1d07fca7d57/oauth2/v2.0/token');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		$headers = [
			'Content-Type: application/x-www-form-urlencoded'
		];

		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

		
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query([
            'grant_type' => 'client_credentials',
            'client_id' => '04b55459-7213-4b5e-a77c-328e22d82600',
            'client_secret' => 'IyO8Q~SqOHOfFOh2xHHANmnoRxxfdNY4jyBCFagm',
            'scope' => 'api://5dcecda0-5216-440a-bb35-2e83fe51aea6/.default'
        ])); 
		
		$server_output = curl_exec($curl);

		$server_decoded = json_decode($server_output);
    
        return isset($server_decoded->access_token) ? $server_decoded->access_token : '';
		curl_close($curl);
    }

	/**purpose
	 *   create curl for john hopkins call includes access token
	 * args
	 *   api
	 * returns 
	 *   curl object ready for api call
	 */
	private function createCurl($api) {

        $token = $this->getAccessToken();

		$this->curl = curl_init();
        
		curl_setopt($this->curl, CURLOPT_URL, $this->endpoint . $api);
		curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);

		$headers = [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		];

		curl_setopt($this->curl, CURLOPT_HTTPHEADER, $headers);
    }



	/**purpose
	 *   call a post for john hopkins that has auth token
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
	 *   call a post for john hopkins that has auth token
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

    public function register($platform_user) {
        $this->callPost('members', [
            'firstName' => $platform_user->first_name,
            'lastName' => $platform_user->last_name,
            'email' => $platform_user->email
        ]);
    }

}