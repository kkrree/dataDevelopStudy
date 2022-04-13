/****************************************************************************************
 * @filename      : ExmzWrapperSample
 * @author        : I2MAX
 * @date          : 2021-03-16
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date           author       description
 * ===============================================================
 0.1     2021-03-16        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';

export default class ExmzWrapperSample extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    @api lwcString;

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

//============================================================================
//============================================================================
// Function
//      fireXXX : fire custom event
//      handleXXX : handle custom event
//      doXXX : call server action
//      ETC
//============================================================================
//============================================================================
    /**
     * lwc 에서 lac 로 이벤트 fire
     */
    fireEventFromLWC() {
        this.gfnComFireDispatch('lwctolac', {
            value: 'LWC Component 에서 직접 event를 Fire 합니다.'
        });

    }

    /**
     * lwc 에서 lac 로 pubsub 이벤트 발생
     */
    firePubSubEventFromLWC() {
        this.gfnPubSubFireEvent(this.gComPageRef, 'lwctolac_pubsub', {
            value:'LWC Component에 Aura로 PubSub 이벤트를 발생합니다.'
        });
    }

    /**
     * lac 에서 직접 호출 가능한 함수
     * @param detail
     */
    @api
    callTest(detail) {
        this.gfnLog('detail.value : ', detail.value);
        this.gfnComShowToast(detail.value);
    }

//============================================================================
//============================================================================
// Function
//    override super function
//============================================================================
//============================================================================

//============================================================================
//============================================================================
// lifecycle hooks
// constructor, connectedCallback, render, renderedCallback, disConnectedCallback
//============================================================================
//============================================================================
    constructor() {
        super();
        this.gfnLog('000000000000000000');
    }

    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            //============================================================================
            // lac 에서 pubsub으로 발생한 이벤틀 핸들러 등록
            //============================================================================
            this.gfnPubSubRegisterListener('lactolwc_pubsub', (detail) => {
                console.log('LWC PubSub Action > ' + detail.value);
                this.gfnComShowToast('LWC PubSub Action > ' + detail.value);
            }, this)
        });
    }

}