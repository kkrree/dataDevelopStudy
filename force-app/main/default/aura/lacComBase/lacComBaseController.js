/****************************************************************************************
 * @filename      : lacComBaseController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2020-12-29 오전 7:36
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
   0.1     2020-12-29 오전 7:36       I2MAX          Create
 ****************************************************************************************/
({
    /**
     * 최상위 초기화 처리
     * @param component
     * @param event
     * @param helper
     */
    doInit : function(component, event, helper) {
        helper.gfn_init(component);
        // Record detail page의 QuickAction을 닫을 때 사용하기 위한 변수 할당.
        helper.g_closeQuickAction = $A.get('e.force:closeQuickAction');
    },

    /**
     * Table 관련 리스트 데이터 및 페이징 처리
     * 기존의 searchTerm -> reqData 변경
     * Com_TableFrame에서는 searchTerm 을 그대로 사용
     * @param component
     * @param event
     * @param helper
     */
    doMovePage : function (component, event, helper) {
        helper.gfn_movePage(component, event);
    },
});