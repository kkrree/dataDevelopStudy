/****************************************************************************************
 * @filename      : exmBaseHelper.js
 * @author        : I2MAX
 * @date          : 2021-01-25 오후 1:05
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
 0.1     2021-01-25 오후 1:05         I2MAX          Create
 ****************************************************************************************/
({
    fn_init: function (component) {
        this.lacComService = component.find('lacComService');
        this.lacComNaviService = component.find('lacComNaviService');
        this.lacComUtil = component.find('lacComUtil');
    },

    lacComService: null,
    lacComNaviService: null,
    lacComUtil: null
});