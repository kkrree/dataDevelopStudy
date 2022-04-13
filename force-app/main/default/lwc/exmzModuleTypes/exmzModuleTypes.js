/****************************************************************************************
 * @filename      : ExmzModuleTypes
 * @author        : I2MAX
 * @date          : 2021-03-11
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
 0.1     2021-03-11        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';

export default class ExmzModuleTypes extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * description
     */
    tempRecordId = '0064x0000071SWdAAM';
    /**
     * description
     */
    @api opportunity;
    /**
     * description
     * @type {{}}
     */
    @track tempObj = {};
    /**
     * description
     * @type {string}
     * @private
     */
    _tempPrivate = 'hello';

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
     * @param event
     */
    checkTest(event) {
        this.gfnLog(this.opportunityObject);
    }

//============================================================================
//============================================================================
// Function
//    override super function
//============================================================================
//============================================================================
    /**
     * description
     * @override
     */
    gfnTest() {
        this.gfnLog('override gfnTest called...');
    }

//============================================================================
//============================================================================
// lifecycle hooks
// constructor, connectedCallback, render, renderedCallback, disConnectedCallback
//============================================================================
//============================================================================
    constructor() {
        super();

        this.gfnLog('aaaaaaaaaaaaaaaaaa');
    }

    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.gfnLog('aaaaaaaaaaaaaaaaaa------------');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.gfnLog('aaaaaaaaaaaaaaaaaa============');
        });
    }

}