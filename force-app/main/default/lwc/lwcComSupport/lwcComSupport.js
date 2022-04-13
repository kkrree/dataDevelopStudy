/****************************************************************************************
 * @filename      : lwcComSupport
 * @author        : I2MAX
 * @date          : 2021-01-25
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date               author       description
 * ===============================================================
   0.1     2021-01-25         I2MAX          Create
 ****************************************************************************************/

/**
 * Custom Mixin 기능
 * @class
 */
class MixinBuilder {
    /**
     * @constructor
     * @param {class} superclass - 상위 클래스
     */
    constructor(superclass) {
        /**
         * 상위 class
         * @type {class}
         */
        this.superclass = superclass;
    }

    /**
     * mixin 적용할 class들을 순차적으로 mixin 처리하는 함수
     * @param {array<class>}mixins
     * @returns {class}
     * @since 1.0.0
     */
    with(...mixins) {
        !mixins && (() => {
            return this.superclass;
        })();

        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}

const MixinBuilderFactory = (superclass) => new MixinBuilder(superclass);

export {MixinBuilderFactory}