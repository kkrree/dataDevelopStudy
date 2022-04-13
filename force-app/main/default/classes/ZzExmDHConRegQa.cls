/**
 * Created by MS on 2021-04-06.
 */

public with sharing class ZzExmDHConRegQa {
    @AuraEnabled
    public static void save(Contact con) {
        System.debug(con);
        if(con != null)    insert con;
    }
}