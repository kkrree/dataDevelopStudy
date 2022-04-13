/**
 * Created by MS on 2021-04-01.
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


    doSearch : function (component, event, helper) {
//        const self = this;

//        if (component.find('fromDt').get('v.value') > component.find('toDt').get('v.value')) {
//            helper.gfn_toast('시작 날짜가 종료 날짜보다 클 수 없습니다.', 'w');
//            return;
//        }


        helper.gfn_pageFrameReset(component, 'table', 'getSearch')
            .then(function (params) {
                return helper.gfn_search(
                    component,
                    10,
                    1,
                    params.tableId,
                    params.apexCallMethodName);
            }).catch(function (error) {
                helper.gfn_ApexErrorHandle(error);
            });
    },

    doNaviService : function (component, event) {
        const dataset = event.currentTarget.dataset;

        helper.lacComNaviService.doNaviStdRecordPage(dataset.recordid, 'view', 'Contact');
    },

    doMultiSave : function (component, event, helper) {
        helper.gfn_createComponents(component, 'zzExmDHConMultiEditQa', null, 'slds-modal_medium');
    },



//    doClick : function (component, event, helper) {
//        helper.apex(
//            component, 'doClick', 'input', {
//                str: component.get('v.str')
//            }
//        ).then(({resData}) => {
//
//        }).catch(({error}) => {
//            helper.gfn_ApexErrorHandle(error);
//        });
//    },

    doConReg : function (component, event, helper) {
        helper.gfn_createComponents(component, 'zzExmDHConRegQa', null, 'slds-modal_medium');
    },

    doLikeClick : function(component, event, helper){
        helper.fn_likeClick(component, event, helper);
    },

});