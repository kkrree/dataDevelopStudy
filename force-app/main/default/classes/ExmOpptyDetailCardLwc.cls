/****************************************************************************************
  * @filename      : ExmOpptyDetailCardLwc
  * @author        : I2MAX
  * @date          : 2021-02-22
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : 
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-02-22                 I2MAX                Create
****************************************************************************************/
public with sharing class ExmOpptyDetailCardLwc {

//    @AuraEnabled(Cacheable=true)
//    public static List<Schema.DescribeSObjectResult> getSObjectMeta(String sObjectType){
//        List<String> sObjectTypes = new List<String>{sObjectType};
//        return Schema.describeSObjects(sObjectTypes);
//    }


    @AuraEnabled
    public static void doSave(Opportunity opportunity){
        try{
            update opportunity;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}