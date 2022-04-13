/**
 * Created by MS on 2021-04-14.
 */

public with sharing class ZzExmDHConMultiEditQa {
    /**
     * Init method
     *
     * @return I2ComClass.InitData
     */

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
        @AuraEnabled public List<Contact> contactList{get;set;}
    }

    @AuraEnabled
    public static InitData init() {

        InitData initData = new InitData();
        initData.contactList = [
                SELECT Id, Name, AccountId, LeadSource, DoNotCall
                FROM Contact
        ];
        return initData;
    }

    @AuraEnabled
    public static void save(List<Contact> conList, List<String> deleteIds) {
        if(!deleteIds.isEmpty())    delete [SELECT Id FROM Contact WHERE Id IN :deleteIds];

        upsert conList;
    }
}