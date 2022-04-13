/****************************************************************************************
  * @filename      : ExmOpptyRegQa
  * @author        : I2MAX
  * @date          : 2021-01-04 오후 12:28
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmOpptyRegQa_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-01-04 오후 12:28     I2MAX                Create
****************************************************************************************/
public with sharing class ExmOpptyRegQa {

    @AuraEnabled
    public static void save(Opportunity oppty) {
        if(oppty != null)    insert oppty;
    }
}