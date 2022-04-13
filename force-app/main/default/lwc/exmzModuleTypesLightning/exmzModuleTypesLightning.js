/****************************************************************************************
 * @filename      : ExmzModuleTypesLightning
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
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';

import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class ExmzModuleTypesLightning extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    @api tempRecordId;
    @api opportunity;

    /**
     * 단일 SObject
     */
    opportunityObject;

    /**
     * 복수 SObjects
     */
    opportunityObjects;

    object1;
    object2;

    defaultRecordTypeId;

    accountPicklistValues;
    picklistFieldValues;

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT.objectApiName })
    wireGetObjectInfo({error, data}) {
        // sync 로 처리할 경우
        this.gfnComWiredSync({error, data}, (data) => {
            //============================================================================
            // log를 반드시 찍어보고 해당 항목을 처리할 것
            //============================================================================
            this.gfnLog('111. opportunityObject for data', data);
            this.opportunityObject = data;
            this.defaultRecordTypeId = data.defaultRecordTypeId;

        });
    }

    @wire(getObjectInfos, { objectApiNames: [ ACCOUNT_OBJECT, OPPORTUNITY_OBJECT ] })
    wireGetObjectInfos({error, data}) {
        // sync 로 처리할 경우
        this.gfnComWiredSync({error, data}, (data) => {
            //============================================================================
            // log를 반드시 찍어보고 해당 항목을 처리할 것
            //============================================================================
            this.gfnLog('222. opportunityObjects for data', data);
            // 전체 List
            this.opportunityObjects = data.results;
            // Account
            this.object1 = data.results[0].result;
            // Opportunity
            this.object2 = data.results[1].result;
        });
    }

    @wire(getPicklistValues, { fieldApiName: ACCOUNT_TYPE_FIELD, recordTypeId: '$defaultRecordTypeId' })
    wireGetPicklistValues({error, data}) {
        // sync 로 처리할 경우
        this.gfnComWiredSync({error, data}, (data) => {
            //============================================================================
            // log를 반드시 찍어보고 해당 항목을 처리할 것
            //============================================================================
            this.gfnLog('333. picklistValue for data', data);
            this.accountPicklistValues = data.values;
        });
    }

    @wire(getPicklistValuesByRecordType , { objectApiName : OPPORTUNITY_OBJECT , recordTypeId: '$defaultRecordTypeId'})
    wiredPicklistData({error, data}){
        // sync 로 처리할 경우
        this.gfnComWiredSync({error, data}, (data) => {
            //============================================================================
            // log를 반드시 찍어보고 해당 항목을 처리할 것
            //============================================================================
            this.gfnLog('444. picklistValuesByRecorType for data', data);
            this.picklistFieldValues = data.picklistFieldValues;
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

    navigatorRecordPage() {
        this.gfnSvcNaviByStdRecordPage(this, this.tempRecordId);
    }

    navigatorSObjectPage() {
        this.gfnSvcNaviByStdObjectPage(this, OPPORTUNITY_OBJECT.objectApiName);
    }

    navigatorItemPage() {
        this.gfnSvcNaviByStdNaviItemPage(this, 'exmzEventTypes');
    }

    navigatorNamedPage() {
        this.gfnSvcNaviByNamedPage(this, 'home');
    }

    navigatorWebPage() {
        this.gfnSvcNaviByWebPage(this, 'https://www.naver.com');
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
            this.gfnLog('000000000000000000------------');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.gfnLog('000000000000000000============');
        });
    }

}