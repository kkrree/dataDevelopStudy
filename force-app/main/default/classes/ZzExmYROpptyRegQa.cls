/**
 * Created by MS on 2021-03-23.
 */

public with sharing class ZzExmYROpptyRegQa {
    // account list 를 반환하는 메소드

    public static List<Account> accList() {

//        List<Account> accList = [SELECT Id FROM Account];
//        return accList;

        return [SELECT Id FROM Account];

    }


    // public method => param으로 name을 받아서 name에 해당하는 account list만 반환하는 메서드

    public static List<Account> accListName(String name){

        return [SELECT Id, Name FROM Account WHERE Name = :name];
    }
}