<?php

namespace App\Models\Mysql\Common;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use UnexpectedValueException;

use App\Common\Functions;
use App\Common\Email;
use App\Mail;

class User extends Base
{
    const PROPERTIES = [
        [
            'key' => 'name',
            'type' => 'TEXT',
        ],
    ];



    public $table = 'users';
    
    // token keys
    private static $TOKEN_KEY_ACCESS = 'iejfdj-ued-ckd-widid';
    private static $TOKEN_KEY_REFRESH = 'owkdfj-iklcode-pleod';

    protected $hidden = [
        'password',
        'salt'
    ];

    /**purpose
     *   set password
     * args
     *   password
     * returns
     *   valid
     */
    public function setPassword($password) {

        // check character limit 
        if (strlen($password) < 8) return false;
        
        // create salt 
        $this->salt = Functions::getRandomID(32);

        // hash password
        $password_with_salt = $password . $this->salt;
        $this->password = password_hash($password_with_salt, PASSWORD_BCRYPT);

        // return success
        return true;
    }   

    /**purpose
     *   check password
     * args
     *   password
     * returns
     *   valid (bool)
     */
    public function checkPassword($password) {
        $password_with_salt = $password . $this->salt;
        return password_verify($password_with_salt, $this->password);
    }
    
	/**purpose
     *   create token
     * args
     *   (none)
     * returns
     *   tokens
     */
    public function generateTokens($api_key = null) {
  
        $access_token = $this->generateAccessToken($api_key);
        $refresh_token = $this->generateRefreshToken($api_key);

        return [
            'access' => $access_token,
            'refresh' => $refresh_token
        ];
    }
	
    /**purpose
     *   generate a refersh token
     * args
     *   (none)
     * returns
     *   token
     */
    private function generateRefreshToken($api_key) {
        $expires = strtotime('+1 year', time());
        return $this->generateToken(User::$TOKEN_KEY_REFRESH, $expires, $api_key);
    }

    /**purpose
     *   generate a access token
     * args
     *   (none)
     * returns
     *   token
     */
    private function generateAccessToken($api_key) {
        $expires = strtotime('+1 day', time());
        return $this->generateToken(User::$TOKEN_KEY_ACCESS, $expires, $api_key);
    }
	 
    /**purpose
     *   generate a single token
     * args
     *   secret
     *   expire time
     * returns
     *   token
     */
    private function generateToken($key, $expires, $api_key) {

        // create payload
        $payload = [
            'id' => $this->id,
            'exp' => $expires,
        ];

        // check to see if api key exists
        if (isset($api_key)) {
            $payload['api_key_id'] = $api_key->id;
        }
        
        // generate token and return
        return [
            'token' => JWT::encode($payload, $key, 'HS256'),
            'expires' => $expires
        ];
    }

    /**purpose
     *   user by token
     * args
     *   token
     * returns
     *   user
     */
    private static function findByToken($token, $key) {

        // decode claims
        try {
            $claims = JWT::decode($token,  new Key($key, 'HS256'));
        }
        catch (UnexpectedValueException $ex) {
            return null;
        }
        catch (SignatureInvalidException $ex) {
            return null;
        }

        // if expired we should return null
        if (time() > $claims->exp) return null;

        // return proflie
        return User::find($claims->id);
    }

    /**purpose
     *   profile by access token
     * args
     *   token
     * returns
     *   profile
     */
    public static function findByAccessToken($token) {
        return User::findByToken($token, User::$TOKEN_KEY_ACCESS);
    }
    
    /**purpose
     *   profile by refresh token
     * args
     *   token
     * returns
     *   profile
     */
    public static function findByRefreshToken($token) {
        return User::findByToken($token, User::$TOKEN_KEY_REFRESH);
    }

    
    /**purpose
     *   send verification email
     * args
     *   (none)
     * returns
     *   (none)
     */
    public function sendVerificationEmail() {
        $mailer = new Mail\EmailVerification($this);
        Email::sendMailer($mailer);
    }

    /**purpose
     *   send admins a new user email
     * args
     *   (none)
     * returns
     *   (none)
     */
    public function sendAdminNewUser() {
        $mailer = new Mail\AdminNewUser($this);
        Email::sendMailer($mailer);
    }

     
    /**purpose
     *   send password request email
     * args
     *   (none)
     * returns
     *   (none)
     */
    public function sendPasswordRequest() {
        $mailer = new Mail\PasswordReset($this);
        Email::sendMailer($mailer);
    }

}
