/****************************************************************************************
 * @filename      : exmzListTypeActionPopup3
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
 * ver     date               author         description
 * ===============================================================
 1.0     2021-03-16            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmBase} from "c/lwcExmBase";

// Apex Methods
import searchLineItems from "@salesforce/apex/ExmzOppty.searchLineItems"
import upsertLineItems from "@salesforce/apex/ExmzOppty.upsertLineItems"
import deleteLineItems from '@salesforce/apex/ExmzOppty.deleteLineItem'

// Object Info
import OPPORTUNITY_LINEITEM_OBJECT from '@salesforce/schema/OpportunityLineItem'
import {getObjectInfo} from "lightning/uiObjectInfoApi";


export default class ExmzListTypeActionPopup3 extends LwcExmBase {

//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * 호출측에서 전달받는 Record ID
     */
    opportunityId;

    /**
     * 조회된 Opportunity LineItem 목록
     */
    lineItems;

    /**
     * LineItem Wrapper 목록
     */
    _wrapperList;
    get wrapperList(){
        return this._wrapperList;
    }
    set wrapperList(lineItems){
        this._wrapperList = lineItems.map( (lineItem , index) => {
            return {
                idx         : index,
                lineItem    : lineItem,
                totalPrice  : lineItem.Id ? lineItem.TotalPrice : parseFloat(lineItem.UnitPrice) * parseFloat(lineItem.Quantity)
            }
        });
    }

    /**
     * LineItem 포함 여부 판단
     */
    get hasLineItem(){
        return this.wrapperList && this.wrapperList.length > 0;
    }

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

    /**
     * Object Info 조회 (Field Label 처리 등)
     */
    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_LINEITEM_OBJECT} )
    lineItemInfo;


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
     * Dynamic Component 초기화 함수
     * @param renderData {Object} Parameter
     */
    @api
    gfnComInitDynamicComponent(renderData) {
        this.opportunityId = renderData.paramData.opportunityId;

        this.doSearchLineItemData();
    }

    /**
     * Opportunity LineItem 조회
     */
    doSearchLineItemData(){
        this.gfnComApex({
            serverAction    : searchLineItems,
            cFuncName       : 'doSearchLineItemData',
            sFuncName       : 'searchLineItemData',
            params          : {
                opportunityId : this.opportunityId
            },
            resultHandler   : result => {
                try {
                    this.lineItems      = result;
                    this.wrapperList    = this.lineItems;
                }catch(error){
                    this.gfnComHandleError(error);
                }
            }
        })
    }

    /**
     * Opportunity LineItem 업데이트
     */
    doUpdateLineItemData(){
        this.gfnComApex({
            serverAction    : upsertLineItems,
            cFuncName       : 'doUpdateLineItemData',
            sFuncName       : 'upsertLineItem',
            params          : {
                lineItems : this.lineItems
            },
            resultHandler   : result => {
                this.gfnComShowToastDefaultSuccess();
                this.gfnComCloseModal();
            }
        })
    }

    /**
     * Opportunity LineItem 삭제
     */
    doDeleteLineItem(event){
        const index     = event.target.dataset.index;
        const recordId  = this.lineItems[index].Id

        const removeItem = () => {
            this.lineItems.splice(index,1);
            this.wrapperList = this.lineItems
        }
        const deleteLineItem = (itemId) => {
            this.gfnComApex({
                serverAction    : deleteLineItems,
                cFuncName       : 'doDeleteLineItem',
                sFuncName       : 'deleteLineItems',
                params          : {
                    lineItemId : itemId
                },
                resultHandler   : result => {
                    this.gfnComShowToastDefaultSuccess();
                    this.doSearchLineItemData();
                }
            })
        }

        recordId ? deleteLineItem(recordId) : removeItem(index);
    }

    /**
     * Opportunity LineItem 추가
     */
    addLineItem(event){
        this.lineItems.push({
            OpportunityId   : this.opportunityId,
            Product2Id      : '01t5g000001JfCJAA0'
        });
        this.wrapperList = this.lineItems;
    }

    /**
     * Opportunity LineItem Field 변경 Handling
     */
    handleLineItemChange(event){
        const index = event.target.dataset.index;
        const field = event.target.fieldName;
        const value = event.target.value;

        this.lineItems[index][field] = value;
        this.wrapperList = this.lineItems;
    }

    /**
     * Save
     */
    save(event){
        this.doUpdateLineItemData();
    }

    /**
     * Close
     */
    close(event){
        this.gfnComCloseModal();
    }

}