/****************************************************************************************
  * @filename      : TutorialAccountList
  * @author        : I2MAX
  * @date          : 2021-05-07
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
    0.1     2021-05-07                 I2MAX                Create
****************************************************************************************/
public with sharing class TutorialAccountList {

    /**
     * 검색
     * @param reqData request Data String
     * @param pageSize request page size
     * @param pageNumber request page number
     *
     * @return I2ComClass.ResData
     */
    @AuraEnabled
    public static I2ComClass.ResData search(Map<String,Object> reqData, Integer pageSize, Integer pageNumber){
        System.debug(System.LoggingLevel.INFO, reqData);

        String whereClause = '';

        if( reqData != null ){
            if(I2ComHelper.gfnHasCondition(reqData, 'name')) {
                final String name = String.escapeSingleQuotes((String)reqData.get('name'));

                whereClause += ' AND Name LIKE \'%' + name + '%\'' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'accountNumber')) {
                final String accountNumber = String.escapeSingleQuotes((String)reqData.get('accountNumber'));

                whereClause += ' AND AccountNumber LIKE \'%' + accountNumber + '%\'' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'type')) {
                whereClause += ' AND Type = \'' + (String)reqData.get('type') + '\'' + '\n';
            }
        }

        // where 조건절 추가
        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Id,  Name, AccountNumber, Type, Phone, AnnualRevenue',
                'Account',
                whereClause,
                'ORDER BY Name ASC',
                pageSize,
                pageNumber
        );

        return resData;
    }
}