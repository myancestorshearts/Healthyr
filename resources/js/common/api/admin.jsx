
import WebClient from '../webclient';

/*class Analytics {

    /**purpose
     *   get report totals
     * args
     *   filter_start (nullable)
     *   filter_end (nullable)
     *   keys 
     *     ORDERS, ORDERS_POSTPO, ORDERS_PENDING, ORDERS_COMPLETED, ORDERS_FULFILLED, 
     *     FULFILLMENTS, FULFILLMENTS_IN_TRANSIT, FULFILLMENTS_DELIVERED
     *     CLAIMS, CLAIMS_OPEN, CLAIMS_PENDING, CLAIMS_PROCESSED
     *   returns
     *     counts
     
    static counts(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, '/api/admin/counts', successCallback, failureCallback);
    }

}*/

class Generic {

    static search(parameters, successCallback, failureCallback) {
        WebClient.basicGet(parameters, '/api/admin/search', successCallback, failureCallback);
    }
}

export default class Brand {
   // static Analytics = Analytics;
    static Generic = Generic;
}