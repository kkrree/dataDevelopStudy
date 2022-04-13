/**
 * Created by YR on 2021-03-24.
 */

({
    doInit : function (component, event, helper) {

        helper.apex(component, 'doInit', 'init', null
        ).then(({resData}) => {
            component.set('v.str', resData);
        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });

    },

    doClick : function (component, event, helper) {

        alert(component.get('v.str'));
        helper.apex(
            component, 'doClick', 'click', {
                str1: component.get('v.str')

            }
        ).then(({resData}) => {

        }).catch(({error}) => {
            helper.gfn_ApexErrorHandle(error);
        });
    },

    init: function (component) {
        var items = [];
        for (var i = 0; i < 500; i++) {
            var item = {
                "label": i + " Option",
                "value": i.toString()
            };
            items.push(item);
        }
        component.set("v.options", items);
    },


    //
    // doChange : function (component, event, helper) {
    //
    //     helper.apex(
    //         component, 'doChange', 'change', null
    //     ).then(({resData}) => {
    //         component.set('v.options', resData);
    //     }).catch(({error}) => {
    //         helper.gfn_ApexErrorHandle(error);
    //     });
    //
    // }
});