/****************************************************************************************
  * @filename      : I2ComUtil_ts
  * @author        : I2MAX
  * @date          : 2020-12-29 오후 5:29
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
    0.1     2020-12-29 오후 5:29      I2MAX               Create
****************************************************************************************/
@IsTest
private class I2ComUtil_ts {

    @IsTest
    static void testBehavior() {
        //==============================================================================
        // Logic Test
        //==============================================================================
        System.assertNotEquals(null, I2ComUtil.getPickList('Account', 'Industry'));
        System.assertNotEquals(null, I2ComUtil.makePickListOptions('Account', 'Industry'));
        System.assertNotEquals(null, I2ComUtil.makePickListOptions('Account', 'Industry', true, true, new Set<String>{'test'}));
        System.assertNotEquals(null, I2ComUtil.makeInitOptions('All'));
    }
}