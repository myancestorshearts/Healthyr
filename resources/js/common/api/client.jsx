
import WebClient from '../webclient';
import Storage from '../storage';

class User {

    /**purpose
     *   get verified user
     * args
     *   (none)
     * returns
     *   user
     */
    static get(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, '/api/client/user', successCallback, failureCallback);
    }
    
    /**purpose
     *   for user to set basic client data
     * args
     *   name (optional)
     *   email (optional)
     *   phone (optional)
     *   company (optional)
     * returns
     *   user
     */
    static set(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/client/user/set', successCallback, failureCallback);
    }
    
    /**purpose
     *   allow logged in user to set password
     * args
     *   current_password (required)
     *   new_password (required)
     * returns
     *   (none)
     */
    static passwordSet(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/client/user/password/set', successCallback, failureCallback);
    }

    
    /**purpose
     *   get user preferences
     * args
     *   (none)
     * returns
     *   preferences
     *
    static preferences(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, '/api/user/preferences', successCallback, failureCallback);
    }*/

    /**purpose
     *   set user preference
     * args
     *   key (key of preference)
     *   value (value) 
     * returns
     *   (none)
     *
    static setPreference(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/user/preference/set', successCallback, failureCallback);
    }*/

}
class Kit {
    /**purpose
     *   allow logged in user to set password
     * args
     *   current_password (required)
     *   new_password (required)
     * returns
     *   (none)
     */
    static register(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, '/api/client/kits/register', successCallback, failureCallback);
    }

    static get(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, '/api/client/kits', successCallback, failureCallback);
    }
}

export default class Api {
    static User = User;
    static Kit = Kit;
}