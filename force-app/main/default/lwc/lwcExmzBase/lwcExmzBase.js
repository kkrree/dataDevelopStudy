/****************************************************************************************
 * @filename      : lwcExmBase
 * @author        : I2MAX
 * @date          : 2020-04-01
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

import {LwcComBase} from 'c/lwcComBase';
import {LwcExmzUtil} from 'c/lwcExmzUtil';
import {LwcExmzData} from 'c/lwcExmzData';

export class LwcExmzBase extends LwcComBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================


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
     * description
     */
    gfnTest() {
        this.gfnLog('LwcExmzBase gfnTest called...');
    }

//============================================================================
//============================================================================
// Function
//    override super function
//============================================================================
//============================================================================

    /**
     * lwcComBase override
     * @param args
     */
    // gfnLog = (...args) => {
    //     this.LogUtil.log( 'Override function called' );
    // }



//============================================================================
//============================================================================
// lifecycle hooks
// constructor, connectedCallback, render, renderedCallback, disConnectedCallback
//============================================================================
//============================================================================
    constructor() {
        super();
    }

}

Object.assign(LwcExmzBase.prototype, LwcExmzUtil, LwcExmzData);