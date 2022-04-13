/****************************************************************************************
  * @filename      : BulkAPITest
  * @projectname   : PMK LocalDCE QA
  * @author        : i2max_JE Yoon
  * @date          : 2021-03-25
  * @group         :
  * @description   :
  * @reference     :
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                author              description
  * ===============================================================
    0.1  2021-03-25          i2max_JE Yoon             Create
****************************************************************************************/
public without sharing class BulkAPITest {
    public static List<ResponseWrapper> importBulkData(String operation, String objectName, String contentDocumentId) {

        ResponseWrapper rw = new ResponseWrapper();
        String username = 'jieun.yoon.practice@i2max.co.kr';
        String password = 'i2max.co.kr!';
        String accessToken ;
        String instanceURL ;
        String clientId = '3MVG9l2zHsylwlpQg_hR8f5wC8L.n7VbsAU2ZxRrHUKJ6NkbNbF1pFNox3Ij4gWwF.HPtZWcXqpopplG5tD_9';
        String clientSecret = '2EAFD20A7493F1D453948EC98B2595544A12D1DE75AA3C55E76E487587A0745A';
/*
        ////org access ////
        HttpRequest request0 = new HttpRequest();
        request0.setMethod('POST');
        request0.setEndpoint('https://i2max-dev-ed.my.salesforce.com/services/oauth2/token');
        request0.setMethod('POST');
        request0.setTimeout(2 * 60 * 1000);
        request0.setHeader('content-type', 'application/x-www-form-urlencoded');
        String body0 = 'grant_type=password' +
                '&client_id=' + clientId +
                '&client_secret=' + clientSecret +
                '&username=' + username +
                '&password=' + password;

        request0.setBody(body0);
        Http h0 = new Http();
        HttpResponse resp0 = h0.send(request0);

        if (resp0.getStatusCode() == 200) {
            System.debug('***: ' + resp0);

            Map<String,Object> resultMap = (Map<String,Object>)JSON.deserializeUntyped(resp0.getBody());

            accessToken = (String)resultMap.get('access_token');
            instanceURL = (String)resultMap.get('instance_url');
        }
*/
        ////org access ////

        ContentVersion cv = [SELECT Id, ContentDocumentId, VersionData FROM ContentVersion WHERE ContentDocumentId =: contentDocumentId];

        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setEndpoint('https://i2max-dev-ed.my.salesforce.com/services/data/v50.0/jobs/ingest');
        request.setEndpoint(Url.getOrgDomainUrl().toExternalForm()+'/services/data/v50.0/jobs/ingest');
//        request.setHeader('content-type', 'application/json; charset=UTF-8' );
//        request.setHeader('Authorization' ,'Bearer '+accessToken );
        request.setHeader('Authorization' ,'Bearer '+ UserInfo.getSessionId() );
        String body = '{ '+
                '"externalIdFieldName": "Id",'+
                '"lineEnding": "CRLF",'+
                '"operation": "'+operation+'",'+
                '"object": "'+objectName+'",'+
                '"contentType": "CSV"'+
                '}';

        request.setBody(body);
        Http h = new Http();
        HttpResponse resp = h.send(request);

        System.debug('***: ' + resp.getStatusCode());
        if(resp.getStatusCode() <= 299) {
            Map<String, Object> respMap = (Map<String, Object>) JSON.deserializeUntyped(resp.getBody());
            String jobId = (String)respMap.get('id');

            //second request to store data
            HttpRequest request1 = new HttpRequest();
            request1.setMethod('PUT');
            request1.setEndpoint(Url.getOrgDomainUrl().toExternalForm()+'/services/data/v50.0/jobs/ingest/'+jobId+'/batches');
            request1.setHeader('content-type', 'text/csv' );
            request1.setHeader('Authorization' ,'Bearer '+UserInfo.getSessionId() );

//            String csvBody = EncodingUtil.base64Encode(cv.VersionData);
//            request1.setBody(csvBody);
            request1.setBody(cv.VersionData.toString());
            Http h1 = new Http();
            HttpResponse resp1 = h1.send(request1);

            System.debug('***: ' + resp1.getStatusCode());
            if(resp1.getStatusCode() <= 299) {
                //third request to start processing
                HttpRequest request2 = new HttpRequest();
                request2.setMethod('PATCH');
                request2.setEndpoint(Url.getOrgDomainUrl().toExternalForm()+'/services/data/v50.0/jobs/ingest/'+jobId);
                request2.setHeader('content-type', 'application/json; charset=UTF-8' );
                request2.setHeader('Authorization' ,'Bearer '+UserInfo.getSessionId() );

                request2.setBody('{ "state" : "UploadComplete" }');
                Http h2 = new Http();
                HttpResponse resp2 = h2.send(request2);

                //Delete the uploaded file as we no longer need that
//                Delete [SELECT ID FROM contentDocument WHERE ID =: contentDocumentId];
                if(resp2.getStatusCode() <= 299) {
                    rw.response = 'Data processing Start '+jobId;
                } else {
                    rw.response = 'There was an error. Please contact your admin.';
                }
            }
        }

        return new List<ResponseWrapper>{rw};
    }

    public class ResponseWrapper {
        public String response;
    }
}