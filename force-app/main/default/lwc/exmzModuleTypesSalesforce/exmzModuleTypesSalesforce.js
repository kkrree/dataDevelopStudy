/****************************************************************************************
 * @filename      : ExmzModuleTypesSalesforce
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
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import getOpportunity from '@salesforce/apex/ExmzOppty.getRecord';
import getOpportunities from '@salesforce/apex/ExmzOppty.getSearch';
import COM_BTN_SAVE from '@salesforce/label/c.COM_BTN_SAVE';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';

export default class ExmzModuleTypesSalesforce extends LwcExmzBase {
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
    @api opportunity1;
    /**
     * description
     * @type {{}}
     */
    @track tempObj = {};
    @track opptyList;

    get opptyListSize() {
        return this.opptyList.length;
    }

    get opportunityObjectName() {
        this.gfnLog('OPPORTUNITY_OBJECT', OPPORTUNITY_OBJECT);
        return OPPORTUNITY_OBJECT.objectApiName;
    };

    get stageNameField() {
        this.gfnLog('STAGENAME_FIELD', STAGENAME_FIELD);
        return STAGENAME_FIELD.fieldApiName;
    }

    /**
     * description
     * @type {string}
     * @private
     */
    _tempPrivate = 'hello';
    _labelComBtnSave = COM_BTN_SAVE;

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================
    @wire(getObjectInfo, { objectApiName: "Opportunity" })
    opportunityObject;

    /**
     * recordId에 해당하는 Opportunity Record 구함
     * @param data
     * @param error
     */
    @wire(getOpportunity, { recordId: '$tempRecordId' })
    wiredOpportunity({data, error}){
        this.gfnComWiredApex({data, error})
        .then( data => {
            this.gfnLog('data : ', data);
            this.opportunity = data;
        })
        .catch( error => {
            this.gfnComHandleError(error);
        });
    }

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

    /**
     * call server action
     */
    doCallServerObject() {
        this.gfnComApex({
            serverAction: getOpportunity,
            cFuncName: 'doCallServerObject',
            sFuncName: 'getRecord',
            params: {
                recordId: this.tempRecordId
            },
            resultHandler: result => {
                this.gfnLog('result : ', result);
                this.opportunity1 = result;
            }
        })
        .catch((error) => {
            this.gfnComHandleError(error);
        });
    }

    /**
     * call server action list
     */
    doCallServerList() {
        this.gfnComApex({
            serverAction: getOpportunities,
            cFuncName: 'doCallServerList',
            sFuncName: 'search',
            params: this.ApexUtil.setSearchReqData(this.ApexUtil.createSearchReqParams(10), {
            }),
            resultHandler: result => {
                this.gfnLog('result : ', result);
                this.opptyList = result.recordList;
            }
        })
        .catch((error) => {
            this.gfnComHandleError(error);
        });
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

        this.gfnLog('bbbbbbbbbbbbbbbbb');
    }

    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.gfnLog('bbbbbbbbbbbbbbbbb------------');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.gfnLog('bbbbbbbbbbbbbbbbb============');
        });
    }

}