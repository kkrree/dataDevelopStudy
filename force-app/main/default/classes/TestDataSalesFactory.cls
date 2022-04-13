/****************************************************************************************
  * @filename      : TestDataSalesFactory
  * @author        : I2MAX
  * @date          : 2021-01-15 오후 1:20
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
    0.1     2021-01-15 오후 1:20      I2MAX               Create
****************************************************************************************/
@IsTest
public class TestDataSalesFactory {

    public static void init() {}

    /**
     * Opportunity Test Data
     *
     * @param isInsert : Boolean
     *
     * @return Opportunity
     */
    public static Opportunity createOpportunity(final Boolean isInsert) {
        Opportunity oppty = new Opportunity();

        oppty.Name = 'testOppty';
        oppty.StageName = 'Qualification';
        oppty.CloseDate = TestDataUtilFactory.d;

        if(isInsert)    insert oppty;

        return oppty;
    }

    public static Opportunity baseOppty {get;set;}

    static {
        baseOppty = createOpportunity(true);
    }
}