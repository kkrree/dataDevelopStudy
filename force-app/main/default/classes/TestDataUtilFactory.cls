/****************************************************************************************
  * @filename      : TestDataUtilFactory
  * @author        : I2MAX
  * @date          : 2021-01-06 오후 3:16
  * @group         :
  * @group-content :
  * @description   : util test factory
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author            description
  * ===============================================================
    0.1     2021-01-06 오후 3:16      I2MAX               Create
****************************************************************************************/
@IsTest
public class TestDataUtilFactory {

    final public static Datetime dt = System.now();
    final public static Date d = dt.date();

    final public static Map<String, Id> profiles = new Map<String, Id>();
    final public static Map<String, Map<String, Id>> recordTypesBySObject = new Map<String, Map<String,Id>>();

    static {
        //-------------------------------------------------------  -----------------------
        //  모든 프로필 세팅
        //------------------------------------------------------------------------------
        for(Profile pf : [SELECT Id, Name FROM Profile]) {
            profiles.put(pf.Name, pf.Id);
        }
        //------------------------------------------------------------------------------
        //  각 SObject별 RecordType Map을 세팅
        //------------------------------------------------------------------------------
        String sobjectType;
        for(RecordType rt : [SELECT Id, DeveloperName, SobjectType FROM RecordType]){
            sobjectType = rt.SobjectType;
            if(recordTypesBySObject.containsKey(sobjectType) == true) {
                recordTypesBySObject.get(sobjectType).put(rt.DeveloperName, rt.Id);
            }
            else {
                recordTypesBySObject.put(sobjectType, new Map<String, Id>{rt.DeveloperName => rt.Id});
            }
        }
    }

    /**
     * profileName을 이용한 Profile Id를 구함
     *
     * @param pfName profile name
     *
     * @return Id
     */
    public static Id getProfileId(String pfName) {
        return profiles.get(pfName);
    }

    /**
     * SObject의 developement의 레코드타입 Id를 구함
     *
     * @param sojectName SObjectName
     * @param devName development name
     *
     * @return ID
     */
    public static Id getRecordTypeId (String sojectName, String devName) {
        return recordTypesBySObject.get(sojectName).get(devName);
    }

    /**
     * 테스트 사용자명 리턴
     *
     * @return String
     */
    public static String getRandomUsername() {
        return 'testUser@i2test.com' + Math.floor(Math.random() * 1000);
    }
}