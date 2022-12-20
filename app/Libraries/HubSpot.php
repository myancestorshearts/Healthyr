<?php

namespace App\Libraries;

use App\Http\Controllers\Response;

use App\Models\Mysql;

class HubSpot {


	private $endpoint;
	private $curl;
    private $token;


	/**purpose
	 *   constructs class from environment variables
	 * args
	 *   (none)
	 * returns
	 *   (none)
	 */
	function __construct() {
		$this->endpoint = 'https://api.hubapi.com';
        $this->token = $this->getAccessToken();
    }



    /**purpose
     *   get an access token from john hopkins
     * args
     *   none
     * returns
     *   token
     */
    private function getAccessToken() {
        
        $key = Mysql\Common\Key::where('type', '=', Mysql\Common\Key::TYPE_HUBSPOT)->limit(1)->get()->first();
     
		$curl = curl_init();

		curl_setopt($curl, CURLOPT_URL, $this->endpoint . '/oauth/v1/token');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		$headers = [
			'Content-Type: application/x-www-form-urlencoded'
		];

		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query([
            'grant_type' => 'refresh_token',
            'client_id' => 'ada14290-0057-4ff9-ab66-ca91c4db4a5d',
            'client_secret' => '9974690d-e68d-4feb-97b7-8392d0f3a124',
            'redirect_uri' => 'https://api.behealthyr.com',
            'refresh_token' => decrypt($key->refresh_token)
        ])); 
		
		$server_output = curl_exec($curl);

		$server_decoded = json_decode($server_output);

        if (isset($server_decoded->refresh_token)) {
            $key->refresh_token = encrypt($server_decoded->refresh_token);
            $key->save();
        }
		curl_close($curl);

        return isset($server_decoded->access_token) ? $server_decoded->access_token : '';
    }

	/**purpose
	 *   create curl for john hopkins call includes access token
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
			'Authorization: Bearer ' . $this->token
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



    /**purpose
     *   find a client by email
     * args
     *   user
     * returns
     *   hubspot_client
     */
    public function getClient($user) {
        // get user from hub spot
        $response = $this->callPost('/crm/v3/objects/contacts/search', [
            'filters' => [
                [
                    'propertyName' => 'email',
                    'operator' => 'EQ',
                    'value' => $user->email
                ]
            ]
        ]);

        if ($response->total > 0) {
            return $response->results[0];
        }

        $first_name = '';
        $last_name = '';

        if (isset($user->name)) {

            $parts = explode(" ", $user->name);
            if(count($parts) > 1) {
                $last_name = array_pop($parts);
                $first_name = implode(" ", $parts);
            }
            else
            {
                $first_name = $name;
                $last_name = "-";
            }
        }
        else {
            $first_name = $user->first_name;
            $last_name = $user->last_name;
        }


        $add_response = $this->callPost('/crm/v3/objects/contacts', [
            'properties' => [
                'firstname' => $first_name,
                'lastname' => $last_name,
                'phone' => $user->phone,
                'email' => $user->email
            ]
        ]);

        return $add_response;
    }

    /**purpose
     *   add kit registration event
     * args
     *   kit_id
     *   kit_type
     *   vendor
     * returns
     *   timeline_event
     */
    public function addKitRegistrationEvent($email, $kit_id, $kit_type, $vendor, $time) {  

        
        
        $add_response = $this->callPost('/crm/v3/timeline/events', [
            'eventTemplateId' => 1196762,
            'email' => $email,
            'tokens' => [
                'kit_type' => $first_name,
                'kit_id' => $last_name,
                'vendor' => $user->phone
            ],
            'timestamp' => date("Y-m-d", $time) . 'T' . date("H:i:s", $time) . 'Z'
        ]);

        dd($add_response);
    }
}