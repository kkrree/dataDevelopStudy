/**
 * Created by 곽태정 on 2021-08-09.
 */

({

    fn_init : function (component, event, helper) {
        this.lacComService.doGetMultiSObjectLabel(['Opportunity', 'Account'], (resData) => {
            component.set('v.labelMap', resData);
        });

        this.apex(
            component, 'doInit', 'init', null
        ).then(({resData}) => {
            component.set('v.initData', resData);

            helper.fn_initSearch(component);

            helper.fn_search(component, event, helper);

        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });

    },



    fn_initSearch : function(component) {
        component.set('v.reqData.pageSize', '10');


        // 검색조건 초기화
        component.set('v.reqData.name', '');
        component.set('v.reqData.phone', '');
        component.set('v.reqData.ownerId', '');
        component.set('v.reqData.Ownership', '');
        component.set('v.reqData.accountNumber', '');
        component.set('v.reqData.site', '');
        component.set('v.reqData.annualRevenue', '');
    },


    fn_accReg : function (component) {
        this.gfn_createComponents(component, 'zzExmTJAccountRegQa', null, 'slds-modal_medium');
    },




    fn_search : function (component) {
        const self = this;

        // component.get('v.reqData').name = component.find('accName').get('v.value');
        console.log('ok');

        this.gfn_pageFrameReset(component, 'table', 'getSearch')
            .then(function (params) {
                return self.gfn_search(
                    component,
                    10,
                    1,
                    params.tableId,
                    params.apexCallMethodName);
                console.log('also Ok');
            }).catch(function (error) {
                this.gfn_ApexErrorHandle(error);
            });

    },


    fn_naviService : function (component, event) {
            const dataset = event.currentTarget.dataset;

            this.lacComNaviService.doNaviStdRecordPage(dataset.recordid, 'view', 'Account');
        },


    fn_multiSave : function (component) {
        this.gfn_createComponents(component, 'zzExmTJAccMultiEditQa', null, 'slds-modal_medium');
    },


    fn_newFile : function (component, event, helper) {
        this.gfn_createComponents(component, 'zzExmTJAccNewFileQa', null, 'slds-modal_medium');
    }



});