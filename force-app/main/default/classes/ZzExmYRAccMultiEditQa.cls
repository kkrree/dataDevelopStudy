/**
 * Created by MS on 2021-04-12.
 */

public with sharing class ZzExmYRAccMultiEditQa {



    public class InitData extends I2ComClass.InitData {

        @AuraEnabled public List<I2ComClass.Option> listInd {
            get {
                if (this.listInd == null) {

                    this.listInd = I2ComUtil.makePickListOptions('Account', 'Industry', false, true);
                }
                return this.listInd;
            }
            set;
        }
        @AuraEnabled public List<Account> accountList {get;private set;}
    }


    @AuraEnabled
    public static InitData init() {

        InitData initData = new InitData();
        initData.accountList = [SELECT Id, Industry FROM Account LIMIT 5];

        return initData;

    }


//    @AuraEnabled
//    public static I2ComClass.InitData init() {
//
//        InitData initData = new InitData();
//
//        return initData;
//    }


    @AuraEnabled
    public static void save(List<Account> accList, List<String> deleteIds) {
        if(!deleteIds.isEmpty())    delete [SELECT Id FROM Account WHERE Id IN :deleteIds];

        upsert accList;
    }


//    public class InitData extends I2ComClass.InitData {
//        @AuraEnabled public List<I2ComClass.Option> listInd {
//            get{
//                if(this.listInd == null) {
//
//                    this.listInd = I2ComUtil.makePickListOptions('Account', 'Industry', false, true);
//                }
//                return this.listInd;
//            }
//            set;
//        }
//    }

}