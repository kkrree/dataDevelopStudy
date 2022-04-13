/****************************************************************************************
  * @filename      : TestDataMockFactory
  * @author        : I2MAX
  * @date          : 2021-01-06 오후 3:18
  * @group         :
  * @group-content :
  * @description   : Mock data test factory
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author            description
  * ===============================================================
    0.1     2021-01-06 오후 3:18      I2MAX               Create
****************************************************************************************/
@IsTest
public class TestDataMockFactory {

    /**
     * 성공한 Mock Class return.
     *
     * @param body : 해당 Response Body.
     *
     * @return CalloutMock
     */
    public static CalloutMock createSuccessCalloutMock(String body) {
        return new CalloutMock(200, 'OK', body, new Map<String,String>());
    }

    /**
     * 실패한 Mock Class return.
     *
     * @param body : 해당 Response Body.
     *
     * @return CalloutMock
     */
    public static CalloutMock createErrorCalloutMock(String body) {
        return new CalloutMock(500, 'Error', body, new Map<String,String>());
    }

    /**
     * HttpCallout Mock Class
     */
    public class CalloutMock implements HttpCalloutMock {
        protected Integer code;
        protected String status;
        protected String body;
        protected Map<String, String> responseHeaders;

        public CalloutMock(Integer code, String status, String body, Map<String, String> responseHeaders) {
            this.code = code;
            this.status = status;
            this.body = body;
            this.responseHeaders = responseHeaders;
        }

        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            for (String key : this.responseHeaders.keySet()) {
                res.setHeader(key, this.responseHeaders.get(key));
            }
            res.setBody(this.body);
            res.setStatusCode(this.code);
            res.setStatus(this.status);
            return res;
        }
    }
}