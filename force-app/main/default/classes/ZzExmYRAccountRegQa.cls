/**
 * Created by MS on 2021-04-06.
 */

public with sharing class ZzExmYRAccountRegQa {

    @AuraEnabled
    public static void init(){
        System.debug('hello world');
    }


    @AuraEnabled
    public static void save(Account account){
        System.debug(account);
        if(account != null) insert account;

    }

}