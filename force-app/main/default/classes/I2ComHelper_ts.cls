/****************************************************************************************
  * @filename      : I2ComHelper_ts
  * @author        : I2MAX
  * @date          : 2021-01-04 오전 7:50
  * @group         :
  * @group-content :
  * @description   : 
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author            description
  * ===============================================================
    0.1     2021-01-04 오전 7:50      I2MAX               Create
****************************************************************************************/
@IsTest
private class I2ComHelper_ts {
    @IsTest
    static void testBehavior() {
        //==============================================================================
        // Data Setting
        //==============================================================================
        Account testAccount = new Account(Name='test');
        insert testAccount;

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Id, Name',
                'Account',
                'WHERE Id = \'' + testAccount.Id + '\'',
                '',
                1,
                1
        );

        I2ComClass.ResData resData2 = I2ComHelper.gfnQueryNoPaging(
                'Id, Name',
                'Account',
                'WHERE Id = \'' + testAccount.Id + '\'',
                ''
        );

        Map<String, String> tmpMap = I2ComHelper.gfnCheckCondition(JSON.serialize(new Map<String, String>{'111'=>'111'}));

        //==============================================================================
        // Logic Test
        //==============================================================================
        System.assertNotEquals(resData, null);

        System.assertNotEquals(resData2, null);

        System.assertNotEquals(tmpMap, null);

        System.assertNotEquals(I2ComHelper.gfnHasCondition(tmpMap, '111'), null);
        System.assertNotEquals(I2ComHelper.gfnRefineCondition(' AND '), null);
    }
}