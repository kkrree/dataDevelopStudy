/**
 * Created by MS on 2021-04-12.
 */

({
    fn_init: function (component, event) {
        this.lacComService.doGetMultiSObjectLabel('Account', function(resData) {
            component.set('v.labelMap', resData.Account);
        });

        this.apex(
            component, 'doInit', 'init', null
        ).then(function ({resData}) {
            component.set('v.options', resData.listInd);
            component.set('v.recordList', resData.accountList);

            console.log('💥💥💥💥💥💥💥 ', component.get('v.options'));
        }).catch(function ({error}) {
            this.gfn_ApexErrorHandle(error);
        });
    },

    fn_save : function (component) {

        const checkedList = this.lacComUtil.doGetInputCheckedArray(component.find('mycheck'));
        let deleteIdSet = Array.from(new Set(component.get('v.deleteIds')));

        this.apex(
            component, 'doSave', 'save', {
                accList: checkedList,
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

    fn_copy : function (component, event) {

        const evt = event.getSource();
        let tempList = component.get('v.recordList');
        const obj = evt.get('v.value');

        // TODO : utilService 에 추가하기
        const copy = JSON.parse(JSON.stringify(obj));

        copy.Id = null;

        // name을 복사해 온 다음 인덱스부터 0개를 제거하고 copy를 배열에 추가함
        tempList.splice(evt.get('v.name')+1, 0, copy);
        component.set('v.recordList', tempList);
    },

    fn_delete : function (component, event) {

        const evt = event.getSource();

        const targetId = evt.get('v.value');
        const targetIndex = evt.get('v.name');

        let tempList = component.get('v.recordList');
        let deleteIds = component.get('v.deleteIds');

        deleteIds.push(targetId);

        tempList = tempList.filter((acc, index) => !(index === targetIndex));

        component.set('v.recordList', tempList);
    }

});