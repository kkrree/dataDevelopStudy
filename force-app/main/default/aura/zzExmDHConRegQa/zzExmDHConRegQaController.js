/**
 * Created by MS on 2021-04-06.
 */

({
    doSave : function (component, event, helper) {
        console.log(JSON.stringify(component.get('v.con')))
        helper.apex(
            component, 'doSave', 'save', {
                'con':component.get('v.con')
            }
        ).then(({resData}) => {
            helper.gfn_toast('정상적으로 저장되었습니다.', 's');

            helper.gfn_refresh();
            helper.gfn_closeQuickActionModal(component);
        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });
    },

    doNext : function (component, event, helper) {
        helper.gfn_createComponents(component, 'zzExmDHConReg2Qa', null);
    },
});