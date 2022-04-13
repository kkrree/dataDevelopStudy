/****************************************************************************************
 * @filename      : lacComFooterQaHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-14 오전 10:57
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
   0.1     2021-01-14 오전 10:57    I2MAX          Create
 ****************************************************************************************/
({
    /**
     * Close pop up
     *
     * @param component
     */
    fn_close : function (component) {
        component.find("overlayLib").notifyClose();
    }
});