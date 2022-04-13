/**
 * Created by MS on 2021-06-10.
 */

({
    doInit : function(component, event, helper) {
        helper.fn_init(component);
    },

    doSave : function (component, event, helper) {
        helper.fn_save(component, event);
    },

    doCopy : function (component, event, helper) {
        helper.fn_copy(component, event);
    },

    doDelete : function (component, event, helper) {
        helper.fn_delete(component, event);
    }

});