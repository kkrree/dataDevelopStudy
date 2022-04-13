/****************************************************************************************
 * @filename      : ExmzEventTypesSampleParent
 * @author        : I2MAX
 * @date          : 2021-03-12
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
 0.1     2021-03-12        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';

export default class ExmzEventTypesSampleParent extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * event detail value for addEventListener
     */
    eventValue;
    eventValueSlotOn;

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

    handleTestEventOn(event) {
        this.gfnLog('Sample Parent Slot on : ', event.detail.value);
        this.eventValueSlotOn = event.detail.value;
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
    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.template.addEventListener('test_event_addeventlistener', event => {
                this.gfnLog('sampleParent event.detail.value : ', event.detail.value);
                this.eventValue = event.detail.value;
            });
        });
    }

}