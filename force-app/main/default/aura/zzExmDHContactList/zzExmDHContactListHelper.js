/**
 * Created by MS on 2021-04-08.
 */

({
     fn_initSearch : function(component) {
        component.set('v.reqData.pageSize', '10');

        // 검색조건 초기화
        component.set('v.reqData.name', '');
        component.set('v.reqData.accountId', '');
//        component.set('v.reqData.isWon', false);
//        component.set('v.reqData.fromDt', '');
//        component.set('v.reqData.toDt', '');
//        component.set('v.reqData.name', '');
    },

    fn_likeClick: function (component, event, helper) {

        const targetIdx = event.getSource().get('v.value');
        console.log('**************** targetIdx : ' + targetIdx);
//        v.targetIdxList.add(targetIdx);
        component.set('v.disableIdx', targetIdx);

//        const buttonName = event.getSource().get('v.name');
//        event.getSource().disabled = true;


        // let button = component.find('\'' + likedIdeaId + '\'');
        console.log('**************** button : ' + buttonName);
        console.log('**************** disabled : ' + event.getSource().disabled);

        // event.getSource().disabled = true;

        // if (likedIdeaId === component.get('\'' + likedIdeaId + '\'')) {
        //     event.getSource().disabled = true;
        // }

        // event.target.disable = true;

        // likedIdeaId.set('v.disabled', true);

        // let buttonDisable = event.getSource();
        // buttonDisable.set('v.disabled', true);
        // console.log('**************** buttonDisabled : ' + buttonDisable);


        // let clickedButton = component.find('\'' + likedIdeaId + '\'');
        // console.log('**************** clicked Button : ' + clickedButton);
        // clickedButton.set('v.disabled',true);

//        component.set('v.liked', !component.get('v.liked'));
//        const likedState = component.get('v.liked');
//        console.log('**************** liked : ' + likedState);
//
//
//
//        this.apex(
//            component, 'likeClick', 'likeClick', {
//                'reqData' : JSON.stringify({
//                    likedIdeaId : likedIdeaId,
//                    likedState : likedState
//                })
//            }
//        ).then(({resData}) => {
//
//            component.set('v.ideaList', resData);
//
//        }).catch((error) => {
//            this.gfn_ApexErrorHandle(error);
//        });

    },


});