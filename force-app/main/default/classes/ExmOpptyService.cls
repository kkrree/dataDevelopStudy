/****************************************************************************************
  * @filename      : ExmOpptyService
  * @author        : I2MAX
  * @date          : 2021-01-06 오후 3:56
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmOpptyService_ts.cls
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-01-06 오후 3:56      I2MAX               Create
****************************************************************************************/
public with sharing class ExmOpptyService {

    public static void setOpptyForecastCategoryName(Opportunity oppty) {
        oppty.ForecastCategoryName = oppty.CloseDate < System.today() ? 'Closed' : 'Pipeline';
    }
}