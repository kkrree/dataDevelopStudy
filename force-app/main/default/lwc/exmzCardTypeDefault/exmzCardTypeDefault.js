/****************************************************************************************
 * @filename      : exmzCardTypeDefault
 * @author        : I2MAX
 * @date          : 2021-03-18
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
 1.0     2021-03-18            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Object Info
import { getObjectInfo,getPicklistValues , getPicklistValuesByRecordType, getRecordNotifyChange } from "lightning/uiObjectInfoApi";
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';

// Custom Label
import COM_BTN_SAVE from '@salesforce/label/c.COM_BTN_SAVE';

// Apex Method
import updateOpportunity from '@salesforce/apex/ExmzOppty.updateOpportunity';


export default class ExmzCardTypeDefault extends LwcExmzBase {

//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * Record ID
     * Lightning Record Page - Record ID 바인딩
     * Community Record Page - Metadata 파일 <targetConfig> 정의에서 Record ID 바인딩
     */
    @api recordId;

    /**
     * 버튼 표시여부
     * Quick Action 등 Parent Component 에서 활용
     * @type {boolean}
     */
    @api buttonInvisible = false;

    /**
     * Picklist1__c 의 옵션 목록 (Controlling Field)
     */
    picklistOption1;

    /**
     * Picklist2__c 의 옵션 목록 (Dependent Field)
     */
    picklistOption2;

    /**
     * Custom Label
     */
    get saveLabel(){
        return COM_BTN_SAVE;
    }

    /**
     * Object Info @Wire 완료 여부
     */
    get objectInfoWired(){
        return this.opportunityInfo && this.opportunityInfo.fields;
    }

    /**
     * Dependency 필드의 Disable Flag
     */
    get dependentFieldDisableFlag(){
        return this.ArrayUtil.isEmpty(this.picklistOption2);
    }


//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

    /**
     * Opportunity Object Info
     */
    opportunityInfo;

    /**
     * Opportunity Default Record Type Id (@wire-getPicklistValuesByRecordType 사용시, Record Type ID 변수처리를 위함)
     */
    defaultRecordTypeId;

    /**
     * 조회한 Object,Record Type 에 따른 Picklist Value 정보
     */
    picklistInfo;

    /**
     * Object Info @wire Service
     */
    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_OBJECT })
    wireOpportunityInfo({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[getObjectInfo] ', data);

                this.opportunityInfo        = data;
                this.defaultRecordTypeId    = data.defaultRecordTypeId;
            })
            .catch( error => {
                this.gfnComHandleError(error);
            });
    }

    /**
     * Picklist Value @wire Service
     */
    @wire(getPicklistValuesByRecordType , { objectApiName : OPPORTUNITY_OBJECT , recordTypeId: '$defaultRecordTypeId'})
    wirePicklistData({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[wirePicklistData] ', data);

                this.picklistInfo = data;
                this.setControllingFieldOptions();
            })
            .catch( error => {
                this.gfnComHandleError(error)
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
     * Controlling Picklist 의 Option 목록 설정
     */
    setControllingFieldOptions() {
        this.picklistOption1 = this.picklistInfo.picklistFieldValues.Picklist1__c.values.map(entry => {
            return {label: entry.label , value : entry.value};
        });
    }

    /**
     * Dependency Field 의 옵션 목록 변경
     */
    handleDependentFieldOptions(event){
        const controllerValue   = event.detail.value;
        this.picklistOption2    = null;

        this.picklistOption2 = this.ElementUtil.makeOptions(this.ElementUtil.getDependentPicklist(this.picklistInfo.picklistFieldValues.Picklist2__c, controllerValue));
    }

    /**
     * Save
     * Parent Component 에서 호출시 (Quick Action 등) Promise 결과 처리
     */
    @api
    doSave(){
        return new Promise( (resolve,reject) => {
            try{
                this.gfnComApex({
                    serverAction    : updateOpportunity,
                    cFuncName       : 'doSave',
                    sFuncName       : 'updateOpportunity',
                    params          : {
                        record : this.getOpportunityData()
                    },
                    resultHandler   : result => {
                        this.gfnComShowToastDefaultSuccess();
                        eval("$A.get('e.force:refreshView').fire();");
                    }
                }).catch((error) => {
                    this.gfnComHandleError(error);
                });

                resolve();
            }
            catch( error ) {
                reject(error);
            }
        })
    }

    /**
     * 입력값 획득 밎 반환
     */
    getOpportunityData(){
        const opportunity   = this.opportunity ?? { Id : this.recordId };
        const bodyElement   = this.template.querySelector('c-lwc-ufw-container-detail-card').querySelector('c-lwc-ufw-body-detail-card');
        const inputValue    = {
            Amount         : bodyElement.querySelector('[data-id="amount"]').value,
            AccountId      : bodyElement.querySelector('[data-id="accountId"]').value,
            CloseDate      : bodyElement.querySelector('[data-id="closeDate"]').value,
            Picklist1__c   : bodyElement.querySelector('[data-id="picklist1"]').value,
            Picklist2__c   : bodyElement.querySelector('[data-id="picklist2"]').value
        };

        Object.assign(opportunity , inputValue)

        return opportunity;
    }

    /**
     * Popup 화면 Render
     * Record Edit 화면
     */
    renderPopup(event) {
        this.gfnComRenderDynamicComponent({
            showComponentName: 'c-exmz-list-type-action-popup-2',
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    opportunityId : this.recordId
                }, isInit:true
            }),
        },'quickActionRender');
    }

    /**
     * Popup 업데이트 완료시 수행
     */
    handleReload(event){
        eval("$A.get('e.force:refreshView').fire();");
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

}