/****************************************************************************************
 * @filename      : exmzListTypePubsubDetail
 * @author        : I2MAX
 * @date          : 2021-03-15
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
 1.0     2021-03-15            I2MAX            Create
 ****************************************************************************************/

import {LightningElement, wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import searchLineItems from "@salesforce/apex/ExmzOppty.searchLineItems"

// Object Info
import OPPORTUNITY_LINEITEM_OBJECT from '@salesforce/schema/OpportunityLineItem'
import {getObjectInfo} from "lightning/uiObjectInfoApi";

export default class ExmzListTypePubsubDetail extends LwcExmzBase {

    opportunityId;
    lineItems = [];

    connectedCallback(){
        this.gfnComConnectedCallback( () => {
            this.gfnPubSubRegisterListener('show_detail', (detail) => {
                this.opportunityId = detail.opportunityId;
                this.doSearchLineItem(detail.opportunityId);
            }, this);
        },{hasLodash:false,onlyInit:true})
    }

    get hasLineItem(){
        return this.wrapperList && this.wrapperList.length > 0;
    }

    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_LINEITEM_OBJECT} )
    opportunityLineItemInfo;

    doSearchLineItem( opportunityId ){
        this.gfnComApex({
            serverAction    : searchLineItems,
            cFuncName       : "doSearchLineItem",
            sFuncName       : "searchLineItems",
            params          : {
                opportunityId : opportunityId
            },
            resultHandler   : ( result ) => {
                try{
                    this.lineItems      = result;
                    this.wrapperList    = this.lineItems;

                }catch(error){
                    this.gfnComHandleError(error);
                }
            }
        })
    }
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
    addLineItem(event){
        this.lineItems.push({
            OpportunityId   : this.opportunityId,
            Product2Id      : '01t5g000001JfCJAA0'
        });
        this.wrapperList = this.lineItems;
    }

    lineItemChange(event){
        const idx = event.target.dataset.index;
        this.gfnLog('[index] ', idx );

    }



}