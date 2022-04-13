/**
 * Created by 곽태정 on 2021-09-06.
 */

({
    doInit : function (component, event, helper) {
            // 다국어 처리.
            helper.lacComService.doGetMultiSObjectLabel(['Contact', 'Account'], (resData) => {
                component.set('v.labelMap', resData);
            });

            // 기본 서버 통신.
            helper.apex(
                component, 'doInit', 'init', null
            ).then(({resData}) => {
                component.set('v.initData', resData);
                helper.fn_initSearch(component);
                $A.enqueueAction(component.get('c.doSearch'))
            }).catch(({error}) => {
                helper.gfn_ApexErrorHandle(error);
            });
        },

    doMultiSave : function (component, event, helper) {
            helper.gfn_createComponents(component, 'ZZExmTJConMultiEditQa', null, 'slds-modal_medium');
        },

    doSearch : function (component, event, helper) {
            helper.fn_search(component, event, helper);
        },

    doExcel : function (component, event, helper) {
            helper.fn_excel(component, event);
        },

    doContactReg : function (component, event, helper) {
            helper.gfn_ContactReg(component, 'ZZExmTJConRegQa', null, 'slds-modal_medium');
        },

    doNaviService : function (component, event) {
            const dataset = event.currentTarget.dataset;

            helper.lacComNaviService.doNaviStdRecordPage(dataset.recordid, 'view', 'Contact');
        },

});