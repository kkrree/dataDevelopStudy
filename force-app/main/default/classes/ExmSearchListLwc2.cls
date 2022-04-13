/****************************************************************************************
  * @filename      : ExmSearchListLwc2
  * @author        : I2MAX
  * @date          : 2021-02-18 오후 1:18
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmSearchListLwc2_ts.cls
  * @reference     : 
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author        description
  * ===============================================================
    1.0     2021-02-18 오후 1:18          I2MAX           Create
****************************************************************************************/
public with sharing class ExmSearchListLwc2 {

    @AuraEnabled
    public static I2ComClass.ResData searchOppty(final Integer pageNumber, final Integer pageSize, Map<String, Object> reqData) {

        System.debug('pageNumber : ' + pageNumber);
        System.debug('pageSize : ' + pageSize);
        System.debug('reqData : ' + reqData);

        final String opptyName = (String)reqData.get('opptyName');
        final String opptyNameStr = '%' + opptyName + '%';
        final String stage = (String)reqData.get('stage');
        final String stageNameStr = '%' + stage + '%';
        final Integer offset = pageSize*(pageNumber-1);

        List<Opportunity> opptyList = [
                SELECT Id, Name, StageName, Account.Name, Amount, Probability, CloseDate
                FROM Opportunity
                WHERE Name LIKE :opptyNameStr
                AND StageName LIKE :stageNameStr
                ORDER BY CloseDate DESC
                LIMIT :pageSize
                OFFSET :offset
        ];

        Integer totalCount = [
                SELECT COUNT()
                FROM Opportunity
                WHERE Name LIKE :opptyNameStr
                AND StageName LIKE :stageNameStr
        ];

        return new I2ComClass.ResData(totalCount, opptyList);
    }

    @AuraEnabled(Cacheable=true)
    public static User getUserDetails(String recordId) {
        return [SELECT Id, Name, Username FROM User WHERE Id = :recordId];
    }
}