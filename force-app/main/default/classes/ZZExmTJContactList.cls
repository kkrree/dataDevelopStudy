/** * Created by 곽태정 on 2021-09-02. */

public with sharing class ZZExmTJContactList {

    public class InitData extends I2ComClass.InitData {
        @AuraEnabled public List<I2ComClass.Option> listLeadSource {
            get{
                if(this.listLeadSource == null) {
                    this.listLeadSource = I2ComUtil.makePickListOptions('Contact', 'LeadSource', false, true);
                }
                return this.listLeadSource;
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

            whereClause += 'AND Name LIKE \'%' + name + '%\'' + '\n';
        }

        if(I2ComHelper.gfnHasCondition(paramMap, 'account.name')) {
            whereClause += ' AND Account.Name = \'' + paramMap.get('account.name') + '\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'leadsource')) {
            whereClause += ' AND LeadSource = \'' + paramMap.get('leadsource') + '\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'phone')) {
            whereClause += ' AND Phone = ' + paramMap.get('phone') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'ownerid')) {
            whereClause += ' AND OwnerId = \'' + paramMap.get('ownerid') + '\'' + '\n';
        }

        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Name, Account.Name, LeadSource, Phone, OwnerId ',
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