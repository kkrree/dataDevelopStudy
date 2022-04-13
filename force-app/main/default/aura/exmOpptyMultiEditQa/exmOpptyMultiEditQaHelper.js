/****************************************************************************************
 * @filename      : exmOpptyMultiEditQaHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-07 오전 7:15
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
 0.1     2021-01-07 오전 7:15       I2MAX          Create
 ****************************************************************************************/
({
    /**
     * 초기화
     * 
     * @param component
     */
    fn_init: function (component) {
        this.lacComService.doGetMultiSObjectLabel('Opportunity', function(resData) {
            component.set('v.labelMap', resData.Opportunity);
        });

        this.apex(
            component, 'doInit', 'init', null
        ).then(function ({resData}) {
            component.set('v.recordList', resData);
        }).catch(function ({error}) {
            this.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * 저장
     * 
     * @param component
     */
    fn_save : function (component) {
        const checkedList = this.lacComUtil.doGetInputCheckedArray(component.find('mycheck'));
        let deleteIdSet = Array.from(new Set(component.get('v.deleteIds')));

        this.apex(
            component, 'doSave', 'save', {
                opptyList: checkedList,
                deleteIds: deleteIdSet
            }
        ).then(({resData}) => {
            this.gfn_toast('Success', 's');
            this.gfn_refresh();
            this.gfn_closeQuickActionModal(component);
        }).catch(({error}) => {
            this.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * record 복사
     * 
     * @param component
     * @param event
     */
    fn_copy : function (component, event) {
        const evt = event.getSource();
        let tempList = component.get('v.recordList');
        const obj = evt.get('v.value');
        
        // TODO : utilService 에 추가하기
        const copy = JSON.parse(JSON.stringify(obj));

        copy.Id = null;

        tempList.splice(evt.get('v.name')+1, 0, copy);
        component.set('v.recordList', tempList);
    },

    /**
     * 삭제
     * 
     * @param component
     * @param event
     */
    fn_delete : function (component, event) {
        const evt = event.getSource();

        const targetId = evt.get('v.value');
        const targetIndex = evt.get('v.name');

        let tempList = component.get('v.recordList');
        let deleteIds = component.get('v.deleteIds');

        deleteIds.push(targetId);

        tempList = tempList.filter((oppty, index) => !(index === targetIndex));

        component.set('v.recordList', tempList);
    }
});