/****************************************************************************************
 * @filename      : exmOpptyRegQaController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오후 12:26
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date                    author        description
 * ===============================================================
 0.1     2021-01-04 오후 12:26      I2MAX          Create
 ****************************************************************************************/
({
    /**
     * Init
     *
     * @param component
     * @param event
     * @param helper
     */
    doSave: function (component, event, helper) {
        helper.fn_save(component);
    },

    doNext : function (component, event, helper) {
        helper.fn_next(component);
    },
});