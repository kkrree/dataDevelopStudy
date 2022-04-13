/****************************************************************************************
 * @filename      : ExmzDynamicRenderTypes
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
 * ver     date           author       description
 * ===============================================================
 0.1     2021-03-15        I2MAX        Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcExmzBase} from 'c/lwcExmzBase';
import { getRecord } from 'lightning/uiRecordApi';

export default class ExmzDynamicRenderTypes extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * test Opportunity recordId
     * @type {string}
     */
    tempRecordId = '0064x0000071SWdAAM';

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================
    /**
     * description
     */
    @wire(getRecord, {
        recordId: '$tempRecordId',
        fields: [
            "OwnerId", "Amount",
            "IsPrivate", "ExpectedRevenue",
            "Name", "CloseDate",
            "AccountId", "NextStep",
            "Type", "StageName",
            "LeadSource", "Probability"
        ]
    })
    opportunity;

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
     * Dynamic Render Component for main
     */
    renderMain() {
        const showComponentName = 'c-exmz-dynamic-render-types-main';
        this.gfnComRenderDynamicComponent({
            showComponentName: showComponentName,
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    value: 'call main'
                }, isInit:true
            }),
            isQuickAction: false,
            addCallback: () => {
                this.addCallback({value: showComponentName});
            }
        }, '.directRender');
    }

    /**
     * Dynamic Render Component for sub
     */
    renderSub() {
        const showComponentName = 'c-exmz-dynamic-render-types-sub';
        this.gfnComRenderDynamicComponent({
            showComponentName: showComponentName,
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    value: 'call sub'
                }, isInit:true
            }),
            isQuickAction: false,
            addCallback: () => {
                this.addCallback({value: showComponentName});
            }
        }, '.directRender');
    }

    /**
     * Dynamic Render Component for qa sample1
     */
    renderQaSample1() {
        const showComponentName = 'c-exmz-dynamic-render-types-qa-sample-1';
        this.gfnComRenderDynamicComponent({
            showComponentName: showComponentName,
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    value: 'call qa sample1'
                }, isInit:true
            }),
            isQuickAction: true,
            addCallback: () => {
                this.addCallback({value: showComponentName});
            }
        }, '.directRenderQa');
    }

    /**
     * Dynamic Render Component for qa sample2
     */
    renderQaSample2() {
        const showComponentName = 'c-exmz-dynamic-render-types-qa-sample-2';
        this.gfnComRenderDynamicComponent({
            showComponentName: showComponentName,
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    value: 'call qa sample2'
                }, isInit:true
            }),
            isQuickAction: true,
            addCallback: () => {
                this.addCallback({value: showComponentName});
            }
        }, '.directRenderQa');
    }

    /**
     * 추가 실행 callback 함수
     */
    addCallback(params) {
        this.LogUtil.log('addCallback called....', params);
    }

    /**
     * Dynamic Render 에서 수행되는 this의 function
     */
    testCallThisFn(paramData) {
        this.gfnLog('call testCallThisFn called.', paramData.value);
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
            this.gfnLog('ccccccccccccccc');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.renderMain();
        });
    }

}