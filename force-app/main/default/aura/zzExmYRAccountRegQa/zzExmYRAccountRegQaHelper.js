/**
 * Created by MS on 2021-04-06.
 */

({

    fn_save : function (component) {

        // console.log('π₯π₯π₯π₯π₯π₯π₯ ', JSON.stringify(component.get('v.account')));

        this.apex(
            component, 'doSave', 'save', {
                account: component.get('v.account')
            }
        ).then(({resData}) => {
            this.gfn_toast('μ μμ μΌλ‘ μ μ₯λμμ΅λλ€.', 's');

            this.gfn_refresh();
            this.gfn_closeQuickActionModal(component);
        }).catch(({error}) => {
            this.gfn_ApexErrorHandle(error);
        });
    },

    fn_next : function (component) {
        this.gfn_createComponents(component, 'exmOpptyReg2Qa', null);
    },
});