/****************************************************************************************
 * @filename      : lacComTableFrameController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:57
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
   0.1     2021-01-04 오전 9:57     I2MAX          Create
 ****************************************************************************************/
({
    /**
     * 초기
     *
     * @param component
     * @param event
     * @param helper
     */
    doInit : function(component, event, helper) {
        helper.fn_init(component);
    },

    /**
     * 강제적 Reset
     *
     * @param component
     * @param event
     * @param helper
     */
    doReset : function(component, event, helper) {
        helper.fn_reset(component);
    },

    /**
     * 다음 페이지
     *
     * @param component
     * @param event
     * @param helper
     */
    doNext : function(component, event, helper) {
        helper.fn_next(component);
    },

    /**
     * 넘어온 데이터를 정제하고 화면에 표시하는 역할
     *
     * @param component
     * @param event
     * @param helper
     */
    doSortData : function(component, event, helper) {
        helper.fn_sortData(component, event);
    },

    /**
     * 이전 페이지
     *
     * @param component
     * @param event
     * @param helper
     */
    doPrev : function(component, event, helper) {
        helper.fn_prev(component);
    },

    /**
     * 페이지 번호 선택
     *
     * @param component
     * @param event
     * @param helper
     */
    doMove : function(component, event, helper) {
        helper.fn_move(component, event);
    }
});