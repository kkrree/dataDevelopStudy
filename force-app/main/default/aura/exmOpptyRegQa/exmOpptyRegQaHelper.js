/****************************************************************************************
 * @filename      : exmOpptyRegQaHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오후 12:26
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
 0.1     2021-01-04 오후 12:26      I2MAX          Create
 ****************************************************************************************/
({
    fn_save : function (component) {
        this.apex(
            component, 'doSave', 'save', {
                'oppty':component.get('v.oppty')
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