/****************************************************************************************
 * @filename      : lacComNaviServiceHelper.js
 * @projectname   :
 * @author        : i2max_my.Seo
 * @date          : 2021-01-04 오전 9:24
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date                    author        description
 * ===============================================================
   0.1     2021-01-04 오전 9:24     I2MAX          Create
 ****************************************************************************************/
({
    /**
     *
     *
     * @param component
     * @param event
     */
    fn_naviByPageReference : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate(param.pageReference);
    },

    /**
     * pageReference Type : standard__objectPage
     *
     * @param component
     * @param event
     */
    fn_naviStdObjectPage : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate({
            type: "standard__objectPage",
            attributes: {
                "objectApiName": param.objectApiName,
                "actionName": param.actionName
            },
            state: param.state
        });
    },

    /**
     * pageReference Type : standard__recordPage
     *
     * @param component
     * @param event
     */
    fn_naviStdRecordPage : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate({
            type: "standard__recordPage",
            attributes: {
                recordId: param.recordId,
                objectApiName: param.objectApiName,
                actionName: param.actionName
            },
            state: param.state
        });
    },

    /**
     * pageReference Type : standard__navItemPage
     *
     * @param component
     * @param event
     */
    fn_naviStdNaviItemPage : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate({
            type: "standard__navItemPage",
            attributes: {
                apiName: param.apiName
            },
            state:param.state
        });
    },

    /**
     * pageReference Type : standard__namedPage
     *
     * @param component
     * @param event
     */
    fn_naviStdNamedPage : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate({
            type: "standard__namedPage",
            attributes: {
                pageName: param.pageName
            }
        });
    },

    /**
     * pageReference Type : comm__namedPage
     *
     * @param component
     * @param event
     */
    fn_naviCommNamedPage : function (component, event) {
        const param = event.getParam('arguments');

        component.find('naviService').navigate({
            type: "standard__navItemPage",
            attributes: {
                apiName: param.apiName
            },
            state:param.state
        });
    }
});