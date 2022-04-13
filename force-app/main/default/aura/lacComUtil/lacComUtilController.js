/****************************************************************************************
 * @filename      : lacComUtilController.js
 * @projectname   :
 * @author        : i2max_my.Seo
 * @date          : 2021-01-04 오전 10:14
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date                    author              description
 * ===============================================================
 0.1     2021-01-04 오전 10:14    i2max_my.Seo          Create
 ****************************************************************************************/
({
    /**
     * utilConvertArray
     *
     * @param component
     * @param event
     * @param helper
     * @returns {*[]}
     */
    doConvertArray : function (component, event, helper) {
        const param = event.getParam('arguments');

        return helper.fn_convertArray(param.targetList);
    },

    /**
     * utilGetInputCheckedArray
     *
     * @param component
     * @param event
     * @param helper
     * @returns {*[]}
     */
    doGetInputCheckedArray : function (component, event, helper) {
        const param = event.getParam('arguments');

        return helper.fn_getInputCheckedArray(param.targetList);
    },
});