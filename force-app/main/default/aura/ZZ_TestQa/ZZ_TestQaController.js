/****************************************************************************************
 * @filename      : ZZ_TestQaController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-06-01
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date             author        description
 * ===============================================================
 0.1     2021-06-01             I2MAX          Create
 ****************************************************************************************/
({
    handleSuccess: function (component, event, helper) {
        console.log('record Id', event.getParam("id"));
        $A.get('e.force:refreshView').fire();
    },
    
});