/****************************************************************************************
  * @filename      : ExmOpptyEditQa
  * @projectname   :
  * @author        : i2max_byeon jw
  * @date          : 2021-02-15
  * @group         : 
  * @description   : 
  * @reference     :
  * @modification Log
  * ===============================================================
  * ver     date                author              description
  * ===============================================================
    0.1     15             i2max_byeon jw      Create
****************************************************************************************/
public with sharing class ExmOpptyEditQa {


    @AuraEnabled
    public static Opportunity init(final String recordId){
        try {
            return [SELECT Id,Name,CreatedDate FROM Opportunity WHERE Id=:recordId];
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}