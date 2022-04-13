/**
 * Created by 곽태정 on 2021-07-30.
 */

({

    //------------------------------------------------------------------------------
    // 초기화
    //------------------------------------------------------------------------------
    doInit : function(component, event, helper){
        helper.fn_init(component, event, helper);
    },

    //------------------------------------------------------------------------------
    // 검색
    //------------------------------------------------------------------------------
    doSearch : function (component, event, helper) {
        helper.fn_search(component, event, helper);
    },

    //------------------------------------------------------------------------------
    // Oppty 등록 QA call
    //------------------------------------------------------------------------------
    doOpptyReg : function (component, event, helper) {
        helper.fn_opptyReg(component);
    },

    //------------------------------------------------------------------------------
    // Sample 저장 QA call
    //------------------------------------------------------------------------------
    doMultiSave : function (component, event, helper) {
        helper.fn_multiSave(component);
    },

    //------------------------------------------------------------------------------
    // 클릭 시, 해당 Oppty로 이동.
    //------------------------------------------------------------------------------
    doNaviService : function(component, event, helper){
        helper.fn_naviService(component, event);
    },

    doExcel : function (component, event, helper) {
        helper.fn_excel(component, event);
    },

    doClick : function (component, event, helper) {
        helper.fn_click();
    },
});