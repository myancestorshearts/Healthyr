
import WebClient from './webclient';
import Storage from './storage';

class Kit {

	/**purpose
	 *   register a kit
	 * args
	 * 	 kit_id
	 *   platform_user_id
	 *   first_name
	 * 	 last_name
	 *   email
	 *   date_of_birth
	 * 	 sex
	 *	 phone
	 *   consent_test_taker
	 *   consent_product
	 *   consent_research
	 */
    static register(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, 'https://api.behealthyr.com/api/platform/user/kit/register', successCallback, failureCallback);
    }
}

class User {

	/**purpose
	 *   first_name (pull from shopify user)
	last_name (pull from shopify user)
	phone (pull from shopify user) (if no phone, then show an input field)
	email (pull from shopify user)
	date_of_birth (show input field) 
	gender (show dropdown field) (M, F, O) AKA (Male , Femail, Other)
	 */


    static registerUser(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, 'https://api.behealthyr.com/api/platform/user/register', successCallback, failureCallback);
    }

    static getUser(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, 'https://api.behealthyr.com/api/platform/user', successCallback, failureCallback);
    }

    static registerKit(parameters, successCallback, failureCallback) {
        WebClient.basicPost(parameters, 'https://api.behealthyr.com/api/platform/user/kit/register', successCallback, failureCallback);
    }

    static getKit(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, 'https://api.behealthyr.com/api/platform/user/kits', successCallback, failureCallback);
    }

    static getRegistrationToken(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, 'https://api.behealthyr.com/api/platform/user/registration/token', successCallback, failureCallback);
    }
}


export default class Api {
    static Kit = Kit;
    static User= User;
}