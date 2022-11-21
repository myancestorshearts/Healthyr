<?php

namespace App\Services;

use App\Models\Mysql;

use App\Common;

class ApiAuth {

    // stored user that we can call from multiple places in the platform
    protected $api_user;

    /**purpose
     *   validate user token
     * args
     *   token
     * returns
     *   result
     */
    public function validateToken($token) {
        $this->api_user = Mysql\Common\User::findByAccessToken(str_replace('Bearer ', '', $token));
        return isset($this->api_user);
    }

    /**purpose 
     *   get validated user
     * user 
     *   (none)
     * returns
     *   user
     */
    public function user() {
        return $this->api_user;
    }


    /**purpose
     *   set user
     * args
     *   user
     * returns
     *   (none)
     */
    public function setUser($user) {
        $this->api_user = $user;
    }
}