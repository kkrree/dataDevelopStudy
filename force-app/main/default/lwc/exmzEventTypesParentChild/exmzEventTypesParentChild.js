/****************************************************************************************
 * @filename      : ExmzEventTypesParentChild
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

export default class ExmzEventTypesParentChild extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * event detail value for addEventListener
     */
    eventValue;
    /**
     * event detail value for on
     */
    eventValueOn;

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
     * event handler
     * @param event
     */
    handleTestEventOn(event) {
        this.gfnLog('event.detail.value : ', event.detail.value);
        this.eventValueOn = event.detail.value;
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
            // ParentChile 에서 addEventListener
            this.template.addEventListener('test_event_addeventlistener', event => {
                this.gfnLog('ParentChild event.detail.value : ', event.detail.value);
                this.eventValue = event.detail.value;
            })
        });
    }

}