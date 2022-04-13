/**
 * Created by 곽태정 on 2021-09-06.
 */

({

    fn_initSearch : function(component) {
            component.set('v.reqData.pageSize', '10');
            component.set('v.reqData.name', '');
            component.set('v.reqData.accountId', '');

        },

    fn_multiSave : function (component) {
            this.gfn_createComponents(component, 'ZZExmTJContactMultiEditQa', null, 'slds-modal_medium');
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

    fn_excel : function (component) {

            const theadList = null;
            const recordList = null;
            const theadAuraId = null

            this.lacComService.doCsvExportWithData(
                component, 'mytest', theadList, 'dataThead', recordList, this.fn_callback
            );

        },

    fn_ContactReg : function (component) {
            this.gfn_createComponents(component, 'ZZExmTJContactRegQa', null, 'slds-modal_medium');
        },

});