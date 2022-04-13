/****************************************************************************************
  * @filename      : ZzMYTest
  * @author        : I2MAX
  * @date          : 2021-04-07
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ZzMYTest_ts.cls
  * @reference     : 
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author        description
  * ===============================================================
    1.0     2021-04-07          I2MAX           Create
****************************************************************************************/
public with sharing class ZzMYTest {

    public static String getAccountList(String name) {
        return [
                SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1
        ]?.Name;
    }
}