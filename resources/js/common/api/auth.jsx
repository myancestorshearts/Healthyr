
import WebClient from '../webclient';
import Storage from '../storage';

class Authenticate {

    /**purpose
     *   login user and get tokens
     * args
     *   email (required)
     *   password (required)
     * returns
     *   user
     *   token 
     */
    static login(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/login', (success) => {
            // set local storage to pull user
            Storage.set('healthyr-tokens', success.data.tokens);
            Storage.set('healthyr-user', success.data.user);

            // call success callback
            if (successCallback) successCallback(success);
        }, failureCallback);
    }

    /**purpose
     *   logout
     * args
     *   (none)
     * returns
     *   (none)
     */
    static logout() {
        Storage.remove('healthyr-tokens');
        Storage.remove('healthyr-loginasuser-tokens');
        Storage.remove('healthyr-user');
    }

    /**purpose
     *   register a user
     * args
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
    static register(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/register', successCallback, failureCallback);
    }

    /**purpose 
     *   verify email
     * args
     *   key (required)
     * returns
     *   result
     */
    static verifyEmail(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/verify/email', successCallback, failureCallback);
    }

    /**purpose
     *   request a forgotton password
     * args
     *   email (required)
     * returns
     *   result
     */
    static passwordRequest(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/password/request', successCallback, failureCallback);
    }

    /**purpose
     *   set password
     * args
     *   key (required)
     *   password (required)
     * returns
     *   (none)
     */
    static passwordSet(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/password/set', successCallback, failureCallback);
    }
}

export default class Auth {
    static Authenticate = Authenticate;
}