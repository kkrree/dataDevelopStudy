/****************************************************************************************
 * @filename      : lacComUtilHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 10:15
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
   0.1     2021-01-04 오전 10:15    I2MAX          Create
 ****************************************************************************************/
({
    /**
     * Array를 flat 해서 return.
     *
     * @param targetList
     * @returns {[]}
     */
    fn_convertArray: function (targetList) {
        return $A.util.isArray(targetList) ? targetList : [targetList].flat(Infinity);
    },

    /**
     * check된 checkbox의 value 값을 배열화 해서 return.
     *
     * @param targetList
     * @returns {*[]}
     */
    fn_getInputCheckedArray : function (targetList) {
        return this.fn_convertArray(targetList)
            .filter((ele) => ele.get('v.checked'))
            .map((ele) => ele.get('v.value'));
    },
});