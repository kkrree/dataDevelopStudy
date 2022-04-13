/****************************************************************************************
 * @filename      : exmzListTypeAction
 * @author        : I2MAX
 * @date          : 2021-03-10
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
 1.0     2021-03-10            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import search from '@salesforce/apex/ExmzOppty.search'

// Object Info
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import {getObjectInfo} from "lightning/uiObjectInfoApi";

export default class ExmzListTypeAction extends LwcExmzBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * 조회한 Opportunity 목록
     */
    opportunityList;

    /**
     * Wrapper List
     * Checked Handling 을 위한 변수 처리를 위함
     */
    _wrapperList;
    get wrapperList(){
        if( !this._wrapperList ){
            this._wrapperList = this.ArrayUtil.makeArray(this.opportunityList).map(opportunity => {
                return {
                    checked     : false,
                    opportunity : opportunity
                };
            });
        }
        return this._wrapperList;
    }

    /**
     * 전체 선택박스 체크여부
     */
    _allChecked = false;
    get allChecked(){
        return this._allChecked;
    }
    set allChecked( wrapperList ){
        this._allChecked = wrapperList.map( wrapper => { return !!wrapper.checked; }).indexOf( false ) === -1;
    }

//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

    /**
     * Object Info 조회 (Field Label 처리 등)
     */
    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_OBJECT })
    opportunityInfo;

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
     * Opportunity 목록 조회
     * @param cFunc {String} Client logging 되는 Script Function 명
     * @param reqParams {Object} Table 처리를 위한 페이징 및 파라미터 변수값 (미전달시 기본값 공통처리)
     */
    doSearchOpportunity( cFunc , reqParams=this.ApexUtil.createSearchReqParams(10)){
        this.gfnComApex({
            serverAction    : search,
            cFuncName       : cFunc,
            sFuncName       : 'Search',
            params          : reqParams,
            resultHandler   : result => {
                try{
                    this.opportunityList = result.recordList;

                    // Data Not Found
                    this.ArrayUtil.isEmpty(result.recordList) && this.gfnComShowToast('Data not Found', this.ToastData.gComShowToastVariant.w);
                }
                catch(error){
                    this.gfnComHandleError(error);
                }
            }
        })
    }

    /**
     * Checkbox 상태값 변동시, 수집되는 ID 제어
     * event.target 으로 획득되는 Element 의 data-record-id 속성 획득
     */
    handleCheckboxChange(event){
        const index = this.wrapperList.map( wrapper => {
            return wrapper.opportunity.Id;
        }).indexOf(event.target.dataset.recordId);

        this._wrapperList[index].checked = event.detail.checked;
        this.allChecked = this.wrapperList;
    }

    /**
     * Check All
     */
    handleCheckAll(event){
       this._wrapperList.forEach( wrapper => {
           wrapper.checked = event.detail.checked;
       });
        this.allChecked = this.wrapperList;
    }

    /**
     * 이전 페이지
     */
    handlePreviousPage(event) {
        this.gComPreviousPage(event, this.doSearchOpportunity);
    }

    /**
     * 다음 페이지
     */
    handleNextPage(event) {
        this.gComNextPage(event, this.doSearchOpportunity);
    }

    /**
     * Record 페이지 이동
     */
    handleNavigateToRecord(event){
        const recordId = event.currentTarget.dataset.recordId;
        this.gfnSvcNaviByStdRecordPage(this,recordId);
    }

    /**
     * Popup 화면 Render
     * 체크된 Record Edit 화면
     */
    renderPopup(event) {
        let checkedIds = this.wrapperList.filter( wrapper => {
            return wrapper.checked;
        }).map( checkedWrapper => {
            return checkedWrapper.opportunity.Id;
        })

        this.gfnComRenderDynamicComponent({
            showComponentName: 'c-exmz-list-type-action-popup',
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    checkedIds : checkedIds
                }, isInit:true
            }),
        }, 'quickActionRender');
    }

    /**
     * Popup 화면 Render
     * 특정 Record Edit 화면
     */
    renderPopup2(event) {
        this.gfnComRenderDynamicComponent({
            showComponentName: 'c-exmz-list-type-action-popup-2',
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    opportunityId : event.target.dataset.recordId
                }, isInit:true
            }),
        },'quickActionRender');
    }

    /**
     * Popup 화면 Render
     * LineItem Edit 화면
     */
    renderPopup3(event) {
        this.gfnComRenderDynamicComponent({
            showComponentName: 'c-exmz-list-type-action-popup-3',
            params: new this.DynamicComponentClass({
                paramThis:this, paramData:{
                    opportunityId : event.target.dataset.recordId
                }, isInit:true
            }),
        },'quickActionRender');
    }

    /**
     * 페이지 Reload
     */
    handleReload(event){
        this.doSearchOpportunity('search');
    }

//============================================================================
//============================================================================
// lifecycle hooks
// constructor, connectedCallback, render, renderedCallback, disConnectedCallback
//============================================================================
//============================================================================

    /**
     * Connected Callback
     */
    connectedCallback(){
        this.gfnComConnectedCallback( () => {
            this.doSearchOpportunity('search');
        }, {hasLodash:false,onlyInit:true});

        window.requestIdleCallback( () => {
            let idleJob = new Promise( (resolve,reject) => {
                console.log( 'Idle Job proceed');
                resolve();
            }).then( () => {
                console.log(' Idle Job Resolved ');
            }).catch( (error) => {
                console.log(' Idle Job Error ', error);
            })

        }, {});
    }
}