/****************************************************************************************
 * @filename      : ExmzDetailTypesBox
 * @author        : I2MAX
 * @date          : 2021-03-09
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
 0.1     2021-03-09        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';

export default class ExmzDetailTypesBox extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * description
     */
    @api tempRecordId;
    /**
     * description
     */
    @api opportunity;
    /**
     * description
     * @type {{}}
     */
    @track tempObj = {

    };
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
    /**
     * description
     */
    @wire(getObjectInfo, { objectApiName: "Opportunity" })
    opportunityObject;

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

        this.gfnLog('55555555555555555');
    }

    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.gfnLog('55555555555555555----------------');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.gfnLog('55555555555555555===============');
        });
    }

}