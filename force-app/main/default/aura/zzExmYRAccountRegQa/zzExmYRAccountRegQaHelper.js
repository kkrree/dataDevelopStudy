/**
 * Created by MS on 2021-04-06.
 */

({

    fn_save : function (component) {

        // console.log('💥💥💥💥💥💥💥 ', JSON.stringify(component.get('v.account')));

        this.apex(
            component, 'doSave', 'save', {
                account: component.get('v.account')
            }
        ).then(({resData}) => {
            this.gfn_toast('정상적으로 저장되었습니다.', 's');

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