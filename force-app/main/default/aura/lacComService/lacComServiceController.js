/****************************************************************************************
 * @filename      : lacComServiceController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:20
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
   0.1     2021-01-04 오전 9:20     I2MAX          Create
 ****************************************************************************************/
({
    /**
     *  Object list를 넘기면 해당하는 object의 label정보를 가져옴 (다국어 지원)
     *
     * @param component
     * @param event
     * @param helper
     */
    doGetMultiSObjectLabel: function (component, event, helper) {
        helper.fn_getMultiSObjectLabel(component, event);
    },

    /**
     * Single Table excel export
     *
     * @param component
     * @param event
     * @param helper
     */
    doCsvExport : function (component, event, helper) {
        helper.fn_csvExport(component, event);
    },

    /**
     * Single Table excel export : 렌더링 html이 아닌 데이터 레코드 이용
     *
     * @param component
     * @param event
     * @param helper
     */
    doCsvExportWithData : function (component, event, helper) {
        helper.fn_csvExportWithData(component, event);
    },

    /**
     * Multi Table Excel export
     *
     * @param component
     * @param event
     * @param helper
     */
    doCsvMultiExport : function (component, event, helper) {
        helper.fn_csvMultiExport(component, event);
    }
});