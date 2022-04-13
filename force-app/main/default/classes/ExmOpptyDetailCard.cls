/****************************************************************************************
  * @filename      : ExmOpptyDetailCard
  * @author        : I2MAX
  * @date          : 2021-01-12 오전 8:03
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmOpptyDetailCard_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-01-12 오전 8:03      I2MAX                Create
****************************************************************************************/
public with sharing class ExmOpptyDetailCard {

    @AuraEnabled
    public static Opportunity init(final String recordId) {
        return [
                SELECT Id, Amount, CloseDate
                FROM Opportunity
                WHERE Id = :recordId
        ];
    }

    @AuraEnabled
    public static void save(Opportunity oppty) {
        System.debug('@@@@@@@@@@@@@ oppty : ' + JSON.serializePretty(oppty));

        upsert oppty;
    }
}