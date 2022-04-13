/**
 * Created by MS on 2021-04-05.
 */

public with sharing class ZzExmYROppty {



    @AuraEnabled
    public static String init(){
        return 'hello world!';
    }


    @AuraEnabled
    public static void click(String str1){
        System.debug(str1);
    }


    @AuraEnabled
    public static List<Account> change() {

        List<Account> accList = new List<Account>();
        for(Account acc : [SELECT Name FROM Account]){
            accList.add(acc);
        }
        return accList;
    }

}