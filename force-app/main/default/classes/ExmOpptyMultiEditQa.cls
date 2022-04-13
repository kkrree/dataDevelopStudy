/****************************************************************************************
  * @filename      : ExmOpptyMultiEditQa
  * @author        : I2MAX
  * @date          : 2021-01-07 오전 7:18
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmOpptyMultiEditQa_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-01-07 오전 7:18      I2MAX                Create
****************************************************************************************/
public with sharing class ExmOpptyMultiEditQa {

    /**
     * Init method
     *
     * @return I2ComClass.InitData
     */
    @AuraEnabled
    public static List<Opportunity> init() {
        return [
                SELECT Id, Name, AccountId, IsWon, CloseDate, StageName
                FROM Opportunity
                WHERE IsWon = FALSE
                AND IsClosed = FALSE
        ];
    }

    @AuraEnabled
    public static void save(List<Opportunity> opptyList, List<String> deleteIds) {
        if(!deleteIds.isEmpty())    delete [SELECT Id FROM Opportunity WHERE Id IN :deleteIds];

        upsert opptyList;
    }
}