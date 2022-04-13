/****************************************************************************************
 * @filename      : lwcComPubSubAura
 * @author        : I2MAX
 * @date          : 2020-04-01 오전 7:57
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
   0.1     2020-04-01         I2MAX            Create
 ****************************************************************************************/
import { api } from 'lwc';
import {LwcComBase} from "c/lwcComBase";

/**
 * Aura / Lwc 연동 PublishSubscribe 이벤트 처리 서비스
 * @class
 * @hideconstructor
 */
class LwcComPubSubAura extends LwcComBase {

    /**
     * 이벤트 등록
     * @function
     * @param {string} eventName - 이벤트명
     * @param {function} callback - 처리 callback function
     * @since 1.0.0
     */
    @api
    gfnPubSubAuraRegisterListener(eventName, callback) {
        this.gfnPubSubRegisterListener(eventName, callback, this);
    }

    /**
     * 이벤트 해제
     * @function
     * @param {string} eventName - 이벤트명
     * @param {function} callback - 처리 callback function
     * @since 1.0.0
     */
    @api
    gfnPubSubAuraUnregisterListener(eventName, callback) {
        this.gfnPubSubUnRegisterListener(eventName, callback, this);
    }

    /**
     * 등록 이벤트 일괄 해제
     * @function
     * @since 1.0.0
     */
    @api
    gfnPubSubAuraUnregisterAllListeners() {
        this.gfnPubSubUnregisterAllListeners(this);
    }

    /**
     * 이벤트 발생
     * @function
     * @param {string} eventName - 이벤트명
     * @param {object} data - 이벤트 전달 detail 데이터
     * @since 1.0.0
     */
    @api
    gfnPubSubAuraFireEvent(eventName, data) {
        this.gfnPubSubFireEvent(this.gComPageRef, eventName, data);
    }

    /**
     * lifecycle connectCallback에서 ready 이벤트 fire 처리
     * lac(Aura)에서 아래와 같이 사용
     * <c:lwcComPubSubAura aura:id="pubsub" onready="{!c.handlePubsubReady}" />
     * @override
     */
    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.gfnComFireDispatch('ready');
        });
    }

}

export default LwcComPubSubAura;