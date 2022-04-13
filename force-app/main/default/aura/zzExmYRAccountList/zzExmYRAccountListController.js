/**
 * Created by YR on 2021-04-01.
 */

({
    doInit : function(component, event, helper) {
        helper.fn_init(component, event, helper);
    },


    doAccReg : function (component, event, helper) {
        helper.fn_accReg(component);
    },


    doSearch : function (component, event, helper) {
        helper.fn_search(component);
    },


    doNaviService : function (component, event, helper) {
        helper.fn_naviService(component);
    },


    doClick : function (component, event, helper) {

        helper.apex(
            component, 'doClick', 'click', {
                // str은 apex class쪽에서 내가 param으로 받아올 변수. 이게 key값이 된다.
                // value값은 v.str 내가 컴포넌트쪽에서 어트리뷰트로 설정한 str값이 resData로 받아와져서 v.str로 나온다.
                str: component.get('v.str')
            }
        ).then(({resData}) => {
            helper.gfn_toast('축하합니다! ')
            // 여기가 비어있는 이유는 내가 apex Class에서 리턴을 void로 했기 때문에 리턴값이 없어서 null이 되기 때문에 필요없다.
        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });
    },


    doMultiSave : function (component, event, helper) {
        helper.fn_multiSave(component);
    },


    doNewFile : function (component, event, helper) {
        helper.fn_newFile(component);
    }



});