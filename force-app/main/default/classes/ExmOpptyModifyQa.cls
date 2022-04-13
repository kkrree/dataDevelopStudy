/****************************************************************************************
  * @filename      : ExmOpptyModifyQa
  * @author        : I2MAX
  * @date          : 2021-01-12 오전 11:05
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmOpptyModifyQa_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-01-12 오전 11:05     I2MAX                Create
****************************************************************************************/
public with sharing class ExmOpptyModifyQa {

    @AuraEnabled
    public static void save(Opportunity oppty) {
        upsert oppty;
    }
}