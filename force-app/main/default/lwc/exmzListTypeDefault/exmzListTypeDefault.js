/****************************************************************************************
 * @filename      : exmzListTypeDefault
 * @author        : I2MAX
 * @date          : 2021-03-09
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
 1.0     2021-03-09            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import search from '@salesforce/apex/ExmzOppty.search'

// Object Info
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import {getObjectInfo, getPicklistValuesByRecordType} from "lightning/uiObjectInfoApi";

export default class ExmzListTypeDefault extends LwcExmzBase {

//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * 조회된 Opportunity 목록
     */
    opportunityList;

    /**
     * Object Info Wire 여부
     */
    get objectInfoWired(){
        return this.opportunityInfo && this.opportunityInfo.fields;
    }

    get pageSizeOptions(){
        return [
            { label : "10" , value : "10" },
            { label : "15" , value : "15" },
            { label : "20" , value : "20" }
        ];
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
     * Stage Field Picklist 목록 (레코드 타입에 따른 선택가능한 옵션)
     */
    stageFieldOptions;

    /**
     * Object Info Wire Service
     */
    @wire(getObjectInfo, { objectApiName : OPPORTUNITY_OBJECT })
    wiredObjectInfo({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[Opportunity Info] ', data);
                this.opportunityInfo        = data;
                this.defaultRecordTypeId    = data.defaultRecordTypeId;
            })
            .catch( error => {
                this.gfnComHandleError(error);
            });
    }

    /**
     * Picklist Option Wire Service
     */
    @wire(getPicklistValuesByRecordType , { objectApiName : OPPORTUNITY_OBJECT , recordTypeId: '$defaultRecordTypeId'})
    wiredPicklistData({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[Picklist Info] ', data);
                const picklistValues    = data.picklistFieldValues.StageName.values;
                this.stageFieldOptions  = this.ElementUtil.makeOptions(picklistValues);
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
     * <lwc-ufw-combo-box> 컴포넌트에서의 Option 변경시 수행할 event handler
     * 정의된 handler 를 마크업에서 @api Property 를 통해 전달
     * function 의 실제 수행은 <lwc-ufw-combo-box> 에서 처리됨
     */
    fireStageChange(event){
        this.gfnComFireDispatch('stagechange',{stageFieldValue:event.detail.value});
    }

    /**
     * <lwc-ufw-combo-box> 컴포넌트에서 발생되는 이벤트의 handler
     */
    handleStageValueChange(event){
        const stageFieldValue   = event.detail.stageFieldValue;
        const stageFieldElement = this.template.querySelector('c-lwc-ufw-container').querySelector('c-lwc-ufw-body').querySelector('[data-id=stageFilter]');
        stageFieldElement.value = stageFieldValue;
    }

    /**
     * <lwc-ufw-combo-box> 컴포넌트에서의 Option 변경시 수행할 event handler
     * 정의된 handler 를 마크업에서 @api Property 를 통해 전달
     * function 의 실제 수행은 <lwc-ufw-combo-box> 에서 처리됨
     */
    firePageSizeChange(event){
        this.gfnComFireDispatch('pagesizechange',{pageSizeValue:event.detail.value});
    }

    /**
     * <lwc-ufw-combo-box> 컴포넌트에서 발생되는 이벤트의 handler
     */
    handlePageSizeValueChange(event){
        this.pageSize = event.detail.pageSizeValue;
    }

    /**
     * 검색 필터 입력항목 획득
     * Slot 내부에 있는 Element 획득을 위해 querySelector 중첩 사용 (중첩 Shadow Dom 접근)
     */
    getFilterValue(){
        const bodyElement = this.template.querySelector('c-lwc-ufw-container')?.querySelector('c-lwc-ufw-body');

        return {
            name        : bodyElement?.querySelector('[data-id=nameFilter]')?.value,
            stage       : bodyElement?.querySelector('[data-id=stageFilter]')?.value,
            accountId   : bodyElement?.querySelector('[data-id=accountFilter]')?.value,
            fromDt      : bodyElement?.querySelector('[data-id=closeFromFilter]')?.value,
            toDt        : bodyElement?.querySelector('[data-id=closeToFilter]')?.value,
            isWon       : bodyElement?.querySelector('[data-id=isWonFilter]')?.checked ? "true" : null
        }
    }

    /**
     * Opportunity 목록 조회
     * @param cFunc {String} Client Logging 처리되는 Function 명
     * @param reqParams {Object} 페이징 변수 및 Param 값 (미전달시 기본값 생성)
     */
    doSearchOpportunity( cFunc , reqParams=this.ApexUtil.createSearchReqParams(this.pageSize)){
        this.ApexUtil.setSearchReqData(reqParams, this.getFilterValue());

        this.gfnComApex({
            serverAction    : search,
            cFuncName       : cFunc,
            sFuncName       : 'Search',
            params          : reqParams,
            resultHandler   : result => {
                try{
                    this.opportunityList = result.recordList
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
     * 이전 페이지
     * 공통 페이징 이벤트 호출 & 후속 수행 Function
     */
    handlePreviousPage(event) {
        this.gComPreviousPage(event, this.doSearchOpportunity);
    }

    /**
     * 다음 페이지
     * 공통 페이징 이벤트 호출 & 후속 수행 Function
     */
    handleNextPage(event) {
        this.gComNextPage(event, this.doSearchOpportunity);
    }

    /**
     * Record Navigate
     */
    navigateToRecord(event){
        const recordId = event.currentTarget.dataset.recordId;
        this.gfnSvcNaviByStdRecordPage(this,recordId);
    }

    /**
     * csv export
     */
    doCsvExport() {
        // NOTE : 2021-03-17    text 기반이 아닐 경우 사용 불가.
        this.CsvUtil.exportCsv({
                fileName: 'Oppty List',
                targetTable: this.template.querySelector('table')
            }
        );
    }

    /**
     * csv export with custom data
     */
    doCsvExportWithData() {
        this.exportCsvWithData({
                fileName: 'Oppty List',
                // targetTheadList: this.template.querySelectorAll('th'),
                customTheadList: ['Name', 'StageName', 'Account', 'Amount', 'Probability', 'CloseDate', 'IsWon'],
                recordList: this.opportunityList,
                callbackFn: this.doSetDataCallback
            }
        );
    }

    /**
     * record 기반으로 data 세팅하는 callback fn
     *
     * @param record
     * @returns {HTMLElement}
     */
    doSetDataCallback(record) {
        let tr = document.createElement("TR");

        let td = document.createElement("TD");
        td.innerText = record['Name'] || '' ;
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['StageName'] || '' ;
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['Account'] ? record['Account']['Name'] : '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['Amount'] || '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['Probability'] || '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['CloseDate'] || '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['IsWon'] ? 'Y' : 'N';
        tr.appendChild(td);

        return tr;
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
    }

}