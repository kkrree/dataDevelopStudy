/****************************************************************************************
  * @filename      : ExmOpptyService_ts
  * @author        : I2MAX
  * @date          : 2021-01-15 오후 1:28
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
    0.1     2021-01-15 오후 1:28      I2MAX               Create
****************************************************************************************/
@IsTest
private class ExmOpptyService_ts {
    @IsTest
    static void testBehavior() {
        //==============================================================================
        // Logic Test
        //==============================================================================
        ExmOpptyService.setOpptyForecastCategoryName(TestDataSalesFactory.baseOppty);
    }
}