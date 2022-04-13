/****************************************************************************************
  * @filename      : I2ComService
  * @author        : I2MAX
  * @date          : 2020-12-29 오후 5:19
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : I2ComService_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2020-12-29 오후 5:19      I2MAX               Create
****************************************************************************************/
public with sharing class I2ComService {

    /**
     * Sobject field label 정보 가져옴
     *
     * @param targetObject  : String(Sobject)
     *
     * @return  Map<String, Map<String, String>>
     */
    public static Map<String, Map<String, String>> gfnGetMultiSObjectLabel(String targetObject) {
        return gfnGetMultiSObjectLabel(new List<String>{targetObject});
    }

    /**
     * Sobject field label 정보 가져옴(Multi 처리)
     *
     * @param targetObjectList  : List<String>
     *
     * @return  Map<String, Map<String, String>>
     */
    public static Map<String, Map<String, String>> gfnGetMultiSObjectLabel(List<String> targetObjectList) {
        Map<String, Map<String, String>> multiFieldResultMap = new Map<String, Map<String, String>>();

        Map<String, Schema.SObjectField> fieldMap;


        List<Schema.DescribeSObjectResult> results = I2ComMetaUtil.getDescribeSObjectResults(targetObjectList);

        Schema.DescribeFieldResult fieldResult;
        String sobjectName;
        String label;

        for(Schema.DescribeSObjectResult result : results) {
            sobjectName = result.getName();
            fieldMap = result.fields.getMap();

            for(String fieldName : fieldMap.keySet()) {
                fieldResult = fieldMap.get(fieldName).getDescribe();
                label = fieldResult.getLabel();

                if(!multiFieldResultMap.containsKey(sobjectName)) {
                    multiFieldResultMap.put(sobjectName, new Map<String, String>{fieldName => label});
                } else {
                    multiFieldResultMap.get(sobjectName).put(fieldName, label);
                }
            }
        }

        return multiFieldResultMap;
    }
}