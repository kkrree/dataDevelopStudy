/****************************************************************************************
 * @filename      : lacComTableController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:52
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
   0.1     2021-01-04 오전 9:52     I2MAX          Create
 ****************************************************************************************/
({
    /**
     * X축 scroll
     *
     * @param component
     * @param event
     * @param helper
     */
    doScrollX : function(component, event, helper) {
        helper.fn_scrollX(component, event);
    },

    /**
     * Y축 scroll
     *
     * @param component
     * @param event
     * @param helper
     */
    doScrollY : function (component, event, helper) {
        helper.fn_scrollY(component, event);
    }
});