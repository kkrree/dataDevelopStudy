/****************************************************************************************
 * @filename      : exmOpptyModifyQaHelper.js
 * @projectname   :
 * @author        : i2max_my.Seo
 * @date          : 2021-01-12 오전 10:58
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
 0.1     2021-01-12 오전 10:58      I2MAX          Create
 ****************************************************************************************/
({
    /**
     * Opportunity update
     *
     * @param component
     */
    fn_save: function (component) {
        const oppty = component.get('v.oppty');

        oppty.Id = component.get('v.recordId');

        this.apex(
            component, 'fn_save', 'save', {
                oppty: oppty
            }
        ).then(({resData}) => {
            this.gfn_toast('성공적으로 저장되었습니다.', 's');
            this.gfn_refresh();
            this.gfn_closeQuickAction();
        }).catch(({error}) => {
            this.gfn_ApexErrorHandle(error);
        });
    },
});