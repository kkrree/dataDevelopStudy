/**
 * Created by MS on 2021-04-01.
 */

public with sharing class ZzExmDHContactList {

    public class InitData extends I2ComClass.InitData {
        @AuraEnabled public List<I2ComClass.Option> leadSourceList {
            get{
                if(this.leadSourceList == null) {
                    this.leadSourceList = I2ComUtil.makePickListOptions('Contact', 'LeadSource', false, true);
                }
                return this.leadSourceList;
            }
            set;
        }
    }

    @AuraEnabled
    public static I2ComClass.InitData init() {
        InitData initData = new InitData();
        return initData;
    }

    @AuraEnabled
    public static I2ComClass.ResData search(String reqData, Integer pageSize, Integer pageNumber){

        System.debug(System.LoggingLevel.INFO, reqData);

        String whereClause = '';
        Map<String, String> paramMap = I2ComHelper.gfnCheckCondition(reqData);

        if(I2ComHelper.gfnHasCondition(paramMap, 'name')) {
            final String name = String.escapeSingleQuotes(paramMap.get('name'));

            whereClause += ' AND Name LIKE \'%' + name + '%\'' + '\n';
        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'stage')) {
//            whereClause += ' AND StageName = \'' + paramMap.get('stage') + '\'' + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'accountId')) {
//            whereClause += ' AND AccountId = \'' + paramMap.get('accountId') + '\'' + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'isWon')) {
//            whereClause += ' AND IsWon = ' + paramMap.get('isWon') + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt') && I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
//            whereClause += ' AND (CloseDate >= ' + paramMap.get('fromDt') + ' AND CloseDate <= ' + paramMap.get('toDt') + ')' + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt')) {
//            whereClause += ' AND CloseDate >= ' + paramMap.get('fromDt') + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
//            whereClause += ' AND CloseDate <= ' + paramMap.get('toDt') + '\n';
//        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'leadSource')) {
//            whereClause += ' AND LeadSource = \'' + paramMap.get('leadSource') + '\'' + '\n';
//        }

        // where 조건절 추가
        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Name, Account.Name, LeadSource ',
                'Contact',
                whereClause,
                'ORDER BY AccountId DESC',
                pageSize,
                pageNumber
        );

        return resData;
    }

    @AuraEnabled
    public static I2ComClass.ResData getSearch(String reqData, Integer pageSize, Integer pageNumber){
        return search(reqData, pageSize, pageNumber);
    }


}