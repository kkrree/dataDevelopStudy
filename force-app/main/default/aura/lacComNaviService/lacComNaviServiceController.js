/****************************************************************************************
 * @filename      : lacComNaviServiceController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:24
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
   0.1     2021-01-04 오전 9:24     I2MAX          Create
 ****************************************************************************************/
({
    /**
     * navi pageReference
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviByPageReference : function (component, event, helper) {
        helper.fn_naviByPageReference(component, event);
    },

    /**
     * pageReference Type : standard__objectPage
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviStdObjectPage : function (component, event, helper) {
        helper.fn_naviStdObjectPage(component, event);
    },

    /**
     * pageReference Type : standard__recordPage
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviStdRecordPage : function (component, event, helper) {
        helper.fn_naviStdRecordPage(component, event)
    },

    /**
     * pageReference Type : standard__navItemPage
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviStdNaviItemPage : function (component, event, helper) {
        helper.fn_naviStdNaviItemPage(component, event);
    },

    /**
     * pageReference Type : standard__namedPage
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviStdNamedPage : function (component, event, helper) {
        helper.fn_naviStdNamedPage(component, event);
    },

    /**
     * pageReference Type : comm__namedPage
     *
     * @param component
     * @param event
     * @param helper
     */
    doNaviCommNamedPage : function (component, event, helper) {
        helper.fn_naviCommNamedPage(component, event);
    }
});