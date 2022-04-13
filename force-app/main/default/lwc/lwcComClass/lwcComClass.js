/****************************************************************************************
 * @filename      : lwcComClass
 * @author        : I2MAX
 * @date          : 2021-02-25
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date            author       description
 * ===============================================================
   0.1     2021-02-25      I2MAX          Create
 ****************************************************************************************/

/**
 * 공통으로 사용하는 class 들의 모음
 * @class
 * @hideconstructor
 */
const LwcComClass = {
    /**
     * Dynamic Render 에 사용되는 param Class
     * @type {class}
     */
    DynamicComponentClass : class {
        /**
         * @constructor
         */
        constructor({
            paramThis=null,
            paramData={},
            isInit=false
        }) {
            /**
             * DynamicComponent 에서 사용하는 this.
             * 업무용 main class 에서 자신의 this를 파라미터로 전달.
             * 별도 수행처리가 필요할 경우에 this에 정의된 method를 호출함.
             * @type {Object}
             */
            this.paramThis = paramThis;
            /**
             * 전달 파라미터
             * @type {Object}
             */
            this.paramData = paramData;
            /**
             * 초기 수행여부
             * 초기 수행여부시 업무별로 override 된 gfnComInitDynamicComponent 메소드를 호출
             * @type {boolean}
             * @see LwcComBase.gfnComRenderInitDynamicComponent
             */
            this.isInit    = isInit;
        }
    }
}

export {LwcComClass}