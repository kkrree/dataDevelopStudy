/****************************************************************************************
 * @filename      : exmOpptyMultiEditQaController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-06 오후 5:19
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
 0.1     2021-01-06 오후 5:19       I2MAX          Create
 ****************************************************************************************/
({
    /**
     * 초기화
     * 
     * @param component
     * @param event
     * @param helper
     */
    doInit : function(component, event, helper) {
        helper.fn_init(component);
    },

    /**
     * 저장
     * 
     * @param component
     * @param event
     * @param helper
     */
    doSave : function (component, event, helper) {
        helper.fn_save(component, event);
    },

    /**
     * record 복사
     * 
     * @param component
     * @param event
     * @param helper
     */
    doCopy : function (component, event, helper) {
        helper.fn_copy(component, event);
    },

    /**
     * 삭제
     *
     * @param component
     * @param event
     * @param helper
     */
    doDelete : function (component, event, helper) {
        helper.fn_delete(component, event);
    }
});