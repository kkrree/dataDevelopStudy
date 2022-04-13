/**
 * Created by MS on 2021-04-01.
 */

public with sharing class ZzExmYRAccountList {

    public class InitData extends I2ComClass.InitData {
        @AuraEnabled public List<I2ComClass.Option> listSla {
            get{
                if(this.listSla == null) {

                    this.listSla = I2ComUtil.makePickListOptions('Account', 'SLA__c', false, true);
                }
                return this.listSla;
            }
            set;
        }

    }


    @AuraEnabled
    public static I2ComClass.InitData init(){
        InitData initData = new InitData();
        return initData;
    }


    @AuraEnabled
    public static void click(String str){
        System.debug(str);
    }


    @AuraEnabled
    public static I2ComClass.ResData search(String reqData, Integer pageSize, Integer pageNumber){

        System.debug(System.LoggingLevel.INFO, reqData);

        String whereClause = '';
        Map<String, String> paramMap = I2ComHelper.gfnCheckCondition(reqData);


        // singleQuote를 넣은 이유는 타인이 SOQL문 이용해서 ''를 활용해 정보 뺴갈 수 있는
        // 가능성을 제거하기 위해서 넣어줌.
        if(I2ComHelper.gfnHasCondition(paramMap, 'name')) {
            final String name = String.escapeSingleQuotes(paramMap.get('name'));

            whereClause += ' AND Name LIKE \'%' + name + '%\'' + '\n';
        }
//        if(I2ComHelper.gfnHasCondition(paramMap, 'name')) {
//            whereClause += ' AND Name = \'' + paramMap.get('name') + '\'' + '\n';
//        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'phone')) {
            whereClause += ' AND Phone = \'' + paramMap.get('phone') + '\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'ownerId')) {
            whereClause += ' AND OwnerId = ' + paramMap.get('ownerId') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt') && I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
            whereClause += ' AND (CloseDate >= ' + paramMap.get('fromDt') + ' AND CloseDate <= ' + paramMap.get('toDt') + ')' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt')) {
            whereClause += ' AND CloseDate >= ' + paramMap.get('fromDt') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
            whereClause += ' AND CloseDate <= ' + paramMap.get('toDt') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'SLA__c')) {
            whereClause += ' AND SLA__c <= ' + paramMap.get('SLA__c') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'Ownership')) {
            whereClause += ' AND Ownership <= ' + paramMap.get('Ownership') + '\n';
        }

        // where 조건절 추가
        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Name,  Phone, Owner.Name , AccountNumber, Site, AnnualRevenue, Ownership, SLA__c, Industry',
                'Account',
                whereClause,
                'ORDER BY NAME DESC',
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