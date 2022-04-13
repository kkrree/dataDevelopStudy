/****************************************************************************************
 * @filename      : exmzListTypePubsubTable
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

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import search from '@salesforce/apex/ExmzOppty.searchWithLineItems'

// Object Info
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OPPORTUNITY_LINEITEM_OBJECT from '@salesforce/schema/OpportunityLineItem'
import {getObjectInfo} from "lightning/uiObjectInfoApi";

export default class ExmzListTypePubsubTable extends LwcExmzBase {

    opportunityList;


    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_OBJECT })
    opportunityInfo;

    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_LINEITEM_OBJECT} )
    opportunityLineItemInfo;

    doSearchOpportunity(cFunc , reqParams=this.ApexUtil.createSearchReqParams(10)){
        this.gfnComApex({
            serverAction    : search,
            cFuncName       : cFunc,
            sFuncName       : 'Search',
            params          : reqParams,
            resultHandler   : result => {
                try{
                    this.opportunityList = result.recordList;
                    this.gfnLog('[opportunityList] ', this.opportunityList);

                    // Pubsub fire
                    this.opportunityList.length > 0 && this.fireShowDetailPubsubEvent({ opportunityId : this.opportunityList[0].Id });

                    // Data Not Found
                    this.ArrayUtil.isEmpty(result.recordList) && this.gfnComShowToast('Data not Found', this.ToastData.gComShowToastVariant.w);
                }
                catch(error){
                    this.gfnComHandleError(error);
                }
            }
        })
    }

    get wrapperList(){
        return this.ArrayUtil.makeArray(this.opportunityList).map( opportunity => {
            return {
                opportunity     : opportunity,
                lineItemSize    : opportunity.OpportunityLineItems?.length ?? 0
            };
        });
    }

    showLineItem(event){
        this.fireShowDetailPubsubEvent({
            opportunityId : event.target.dataset.recordId
        });
    }
    fireShowDetailPubsubEvent(detail){
        this.gfnPubSubFireEvent(this.gComPageRef, 'show_detail',detail);
    }

    handlePreviousPage(event) {
        this.gComPreviousPage(event, this.doSearchOpportunity);
    }
    handleNextPage(event) {
        this.gComNextPage(event, this.doSearchOpportunity);
    }


    connectedCallback(){
        this.gfnComConnectedCallback( () => {
            this.doSearchOpportunity('Search');
        },{hasLodash:false, onlyInit:true});
    }



}