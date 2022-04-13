/**
* 본 소프트웨어는 관련 법률에 따라 보호되는 삼성의 지식재산 및 영업비밀 입니다.
* 본 소프트웨어를 권한 없이 사용하거나 삼성의 사전 서면 동의 없이 제3자에게 공개하는 행위는 엄격히 금지되어 있으며
 * 위반 시 귀하는 무단 사용 또는 비밀 유지 의무 위반에 대해 법적인 책임을 져야 합니다.
*
* This software is the intellectual property and confidential information of Samsung Electronics, Co., Ltd.
* (“Samsung”) protected by applicable laws. The unauthorized use or disclosure of the software to any third
* party without the prior written consent of Samsung is strictly prohibited, and you should be legally
* responsible for the unauthorized use or violation of confidentiality obligation.
*/ 

/****************************************************************************************
  * @filename      : zz_testDetailEdit
  * @projectname   : lwc.zz_testDetailEdit
  * @author        : NR CHOI
  * @date          : 2021-06-30
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : 
  * @reference     :
  * @release       : v1.0.0
  * @modification Log
  * ===============================================================
  * ver     date                     author              description
  * ===============================================================
    0.1     2021-06-30                  NR CHOI            Create
****************************************************************************************/


import { LightningElement, api, wire, track } from 'lwc';

import {LwcComBase} from 'c/lwcComBase';
import {LwcComUtil} from 'c/lwcComUtil';
import {LwcComData} from 'c/lwcComData';

//ApexMethod
import updateAccountPhone from '@salesforce/apex/ZZ_TestDetailEdit.updateAccountPhone';

// Object Info
import Opportunity_OBJECT from '@salesforce/schema/Opportunity';
import {getObjectInfo, getRecordNotifyChange} from "lightning/uiObjectInfoApi";

export default class ZzTestDetailEdit extends LwcComBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    @api tempRecordId = null;
    @api opportunity = null;

    OpportunityObjectInfo;

    phone = '';
    accountId = '';


    /**
     * Object Info Wire 여부
     */
    get objectInfoWired(){
        return this.opportunityObject && this.opportunityObject.fields;
    }

    get tempButtonLabel(){
        return this.tempRecordId ? 'Update' : 'Create';
    }

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

    @wire(getObjectInfo, { objectApiName: "Opportunity" })
    opportunityObject;

//    /**
//     * Object Info Wire Service
//     */
//    @wire(getObjectInfo, { objectApiName : Opportunity_OBJECT })
//    wiredObjectInfo({data,error}){
//        this.gfnComWiredApex({data,error})
//            .then( data => {
//                this.gfnLog('[Opportunity Info] ', data);
//                this.OpportunityObjectInfo = data;
//            })
//            .catch( error => {
//                this.gfnComHandleError(error);
//            });
//    }



//============================================================================
//============================================================================
// Function
// fireXXX : fire custom event
// handleXXX : handle custom event
// doXXX : call server action
// ETC
//============================================================================
//============================================================================

    handleSubmit(event) {

        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;



        const bodyElement = this.template.querySelector('c-lwc-ufw-container').querySelector('c-lwc-ufw-body');
        console.log('bodyElement >> ', bodyElement);
        const accPhoneNum = bodyElement?.querySelector('[data-id=accPhoneNum]')?.value;
        console.log('accPhoneNum >> ', accPhoneNum);
        const accId = fields?.AccountId;
        console.log('accId >> ', accId);

        const editForm = bodyElement.querySelector('lightning-record-edit-form');
        console.log('editForm >> ' + editForm)
        console.log('fiedls >> ' + JSON.stringify(fields));

        this.phone = accPhoneNum;
        this.accountId = accId;

        bodyElement.querySelector('lightning-record-edit-form')?.submit(fields);


    }
    //To update a record via imperative Apex,
    //call the Apex method and then call getRecordNotifyChange() to update the cache.
    //The refreshApex() function doesn’t refresh data that was fetched by calling an Apex method imperatively.
    doUpdateAccPhone(phoneNum, accId){
        console.log('params >> ', phoneNum, accId);
        console.log('apexMethod >> ', updateAccountPhone);
        console.log('param objc >>>');
        console.log({phoneNo:phoneNum, accId:accId});
        const paramInfo = {phoneNo:phoneNum, accId:accId};

        this.gfnComApex({
            serverAction    : updateAccountPhone,
            cFuncName       : 'updateAccPhoneNum',
            sFuncName       : 'updateAccountPhone',
            params          : paramInfo,
            resultHandler   : result => {
                try{
                    console.log('result >> ', result);

                }
                catch(error){
                    this.gfnComHandleError(error);
                }
            },
            errorHandler : error => {
                this.gfnComHandleError(error);
            }
        })


    }

    handleSuccess(event){
//        const payload = event.detail;
//        console.log(JSON.stringify(payload));
        this.tempRecordId = event.detail.id;
        console.log('created/update id >> ', this.tempRecordId);

        this.doUpdateAccPhone(this.phone, this.accountId);
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