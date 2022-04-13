/****************************************************************************************
  * @filename      : ZzMYTest_ts
  * @author        : I2MAX
  * @date          : 2021-04-07
  * @group         :
  * @group-content :
  * @description   : 
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author         description
  * ===============================================================
    1.0     2021-04-07           I2MAX           Create
****************************************************************************************/
@IsTest
private class ZzMYTest_ts {
    @IsTest
    static void testBehavior() {
        //==============================================================================
        // Data Setting
        //==============================================================================
        insert new Account(Name='test');

        //==============================================================================
        // Logic Test
        //==============================================================================
        System.assertNotEquals(null, ZzMYTest.getAccountList('aaa'));
    }
}