/****************************************************************************************
 * @filename      : lwcUfwContainerQa
 * @author        : I2MAX
 * @date          : 2021-02-15
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date               author         description
 * ===============================================================
 1.0     2021-02-15            I2MAX            Create
 ****************************************************************************************/

import {api,track,wire} from 'lwc';
import {LwcUfwBase} from "c/lwcUfwBase";

export default class LwcUfwContainerQa extends LwcUfwBase {
/*
 * =============================================================================
 * =============================================================================
 * Property / getter, setter
 * =============================================================================
 * =============================================================================
 */
    /**
     * Modal QuickAction Show 여부
     * @type {boolean}
     */
    @api showModal = false;
    /**
     * Large Modal 여부
     * @type {boolean}
     */
    @api isLarge = false;
    /**
     * Medium Modal 여부
     * @type {boolean}
     */
    @api isMedium = false;

    /**
     * Modal QuickAction 사이즈별 전체 Class 지정
     * @returns {string}
     */
    get clazz() {
        return (this.PropertyUtil.isTrue(this.isLarge))
            ? 'slds-modal slds-fade-in-open slds-modal--large'
            : ((this.PropertyUtil.isTrue(this.isMedium)) ? 'slds-modal slds-fade-in-open slds-modal_medium' : 'slds-modal slds-fade-in-open');
    }

/*
 * =============================================================================
 * =============================================================================
 * function 구현
 * fireXXX : custom 이벤트 발생
 * handleXXX : custom 이벤트 핸들러
 * doXXX : Server 데이터 조회
 * 그 외 함수는 업무에 맞게 구현
 * =============================================================================
 * =============================================================================
 */


/*
 * =============================================================================
 * =============================================================================
 * lifecycle hooks
 * 업무에서는 필요시 override 처리하고,
 * super호출이 필요할 경우 super 호출후에 업무별 로직을 구현
 * constructor, connectedCallback, render, renderedCallback, disConnectedCallback
 * =============================================================================
 * =============================================================================
 */
    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.addEventListener('ufw_model_close', (detail) => {
                this.showModal = detail.showModal;
            }, this);
        });
    }

}