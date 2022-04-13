/****************************************************************************************
 * @filename      : ExmzLmsTypeSample2
 * @author        : I2MAX
 * @date          : 2021-03-25
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
 0.1     2021-03-25        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';
import { publish, subscribe, unsubscribe, MessageContext, createMessageContext, releaseMessageContext } from 'lightning/messageService';
import TestChannel from "@salesforce/messageChannel/TestMessageChannel__c";

export default class ExmzLmsTypeSample2 extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    @track receivedMessage = '';
    @track publishMessage = '';
    subscription = null;

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================
    @wire(MessageContext)
    messageContext;


//============================================================================
//============================================================================
// Function
//      fireXXX : fire custom event
//      handleXXX : handle custom event
//      doXXX : call server action
//      ETC
//============================================================================
//============================================================================
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, TestChannel, (message) => {
            console.log('Sample2 : ', message.payload);
            this.receivedMessage = message.payload;
        });
    }

    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
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
        this.subscribeMC();
    }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }

}