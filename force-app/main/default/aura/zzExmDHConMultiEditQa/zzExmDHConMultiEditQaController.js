/**
 * Created by MS on 2021-04-14.
 */

({
    /**
     * 초기화
     *
     * @param component
     */
    doInit: function (component, event, helper) {
        helper.lacComService.doGetMultiSObjectLabel('Contact', function(resData) {
            component.set('v.labelMap', resData.Contact);
        });

        helper.apex(
            component, 'doInit', 'init', null
        ).then(function ({resData}) {
            component.set('v.recordList', resData);
        }).catch(function ({error}) {
            helper.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * 저장
     *
     * @param componen
     */
    doSave : function (component, event, helper) {
        const checkedList = helper.lacComUtil.doGetInputCheckedArray(component.find('mycheck'));
        let deleteIdSet = Array.from(new Set(component.get('v.deleteIds')));

        helper.apex(
            component, 'doSave', 'save', {
                conList: checkedList,
                deleteIds: deleteIdSet
            }
        ).then(({resData}) => {
            helper.gfn_toast('Success', 's');
            helper.gfn_refresh();
            helper.gfn_closeQuickActionModal(component);
        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * record 복사
     *
     * @param component
     * @param event
     */
    doCopy : function (component, event, helper) {
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
    doDelete : function (component, event, helper) {
        const evt = event.getSource();

        const targetId = evt.get('v.value');
        const targetIndex = evt.get('v.name');

        let tempList = component.get('v.recordList');
        let deleteIds = component.get('v.deleteIds');

        deleteIds.push(targetId);

        tempList = tempList.filter((con, index) => !(index === targetIndex));

        component.set('v.recordList', tempList);
    }
});