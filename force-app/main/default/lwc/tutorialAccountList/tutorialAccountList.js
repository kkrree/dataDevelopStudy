/****************************************************************************************
 * @filename      : tutorialAccountList
 * @author        : I2MAX
 * @date          : 2021-05-07
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
 1.0     2021-05-07            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import search from '@salesforce/apex/TutorialAccountList.search'

// Object Info
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {getObjectInfo, getPicklistValuesByRecordType} from "lightning/uiObjectInfoApi";


export default class TutorialAccountList extends LwcExmzBase {

    //============================================================================
    //============================================================================
    // Property / getter, setter
    //============================================================================
    //============================================================================

    /**
     * Account 조회 목록
     */
    accountList;

    /**
     * Account Object Info
     */
    accountObjectInfo;

    /**
     * Account Default Record Type Id
     */
    defaultRecordTypeId;

    /**
     * Type Picklist 목록 (레코드 타입에 따른 선택가능한 옵션)
     */
    typeFieldOptions;

    /**
     * Object Info Wire 여부
     */
    get objectInfoWired(){
        return this.accountObjectInfo && this.accountObjectInfo.fields;
    }

    /**
     * Page Size Option
     */
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
     * Object Info Wire Service
     */
    @wire(getObjectInfo, { objectApiName : ACCOUNT_OBJECT })
    wiredObjectInfo({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[Account Info] ', data);
                this.accountObjectInfo      = data;
                this.defaultRecordTypeId    = data.defaultRecordTypeId;
            })
            .catch( error => {
                this.gfnComHandleError(error);
            });
    }

    /**
     * Picklist Option Wire Service
     */
    @wire(getPicklistValuesByRecordType , { objectApiName : ACCOUNT_OBJECT , recordTypeId: '$defaultRecordTypeId'})
    wiredPicklistData({data,error}){
        this.gfnComWiredApex({data,error})
            .then( data => {
                this.gfnLog('[Picklist Info] ', data);
                const picklistValues    = data.picklistFieldValues.Type.values;
                this.typeFieldOptions   = this.ElementUtil.makeOptions(picklistValues);
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
     * 검색 필터 입력항목 획득
     * Slot 내부에 있는 Element 획득을 위해 querySelector 중첩 사용 (중첩 Shadow Dom 접근)
     */
    getFilterValue(){
        const bodyElement = this.template.querySelector('c-lwc-ufw-container')?.querySelector('c-lwc-ufw-body');

        return {
            name            : bodyElement?.querySelector('[data-id=nameFilter]')?.value,
            accountNumber   : bodyElement?.querySelector('[data-id=numberFilter]')?.value,
            type            : bodyElement?.querySelector('[data-id=typeFilter]')?.value,
        }
    }

    /**
     * Account 목록 조회
     * @param cFunc {String} Client Logging 처리되는 Function 명
     * @param reqParams {Object} 페이징 변수 및 Param 값 (미전달시 기본값 생성)
     */
    doSearchAccount( cFunc , reqParams=this.ApexUtil.createSearchReqParams(this.pageSize)){

        this.ApexUtil.setSearchReqData(reqParams, this.getFilterValue());

        this.gfnComApex({
            serverAction    : search,
            cFuncName       : cFunc,
            sFuncName       : 'Search',
            params          : reqParams,
            resultHandler   : result => {
                try{
                    this.accountList = result.recordList
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
     * <lwc-ufw-combo-box> 컴포넌트에서의 Option 변경시 수행할 event handler
     * 정의된 handler 를 마크업에서 @api Property 를 통해 전달
     * function 의 실제 수행은 <lwc-ufw-combo-box> 에서 처리됨
     */
    fireTypeChange(event){
        this.gfnComFireDispatch('typechange',{typeFieldValue:event.detail.value});
    }

    /**
     * <lwc-ufw-combo-box> 컴포넌트에서 발생되는 이벤트의 handler
     */
    handleTypeValueChange(event){
        const typeFieldValue   = event.detail.typeFieldValue;
        const typeFieldElement = this.template.querySelector('c-lwc-ufw-container').querySelector('c-lwc-ufw-body').querySelector('[data-id=typeFilter]');
        typeFieldElement.value = typeFieldValue;
    }

    /**
     * <lwc-ufw-combo-box> 컴포넌트에서의 Option 변경시 수행할 event handler
     * 정의된 handler 를 마크업에서 @api Property 를 통해 전달
     * function 의 실제 수행은 <lwc-ufw-combo-box> 에서 처리
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
     * 이전 페이지
     * 공통 페이징 이벤트 호출 & 후속 수행 Function
     */
    handlePreviousPage(event) {
        this.gComPreviousPage(event, this.doSearchAccount);
    }

    /**
     * 다음 페이지
     * 공통 페이징 이벤트 호출 & 후속 수행 Function
     */
    handleNextPage(event) {
        this.gComNextPage(event, this.doSearchAccount);
    }

    /**
     * Record Navigate
     */
    navigateToRecord(event){
        const recordId = event.currentTarget.dataset.recordId;
        this.gfnSvcNaviByStdRecordPage(this,recordId);
    }

    /**
     * csv export with custom data
     */
    doCsvExportWithData() {
        this.exportCsvWithData({
                fileName: 'Account List',
                // targetTheadList: this.template.querySelectorAll('th'),
                customTheadList: ['Name', 'AccountNumber', 'Type', 'Phone', 'AnnualRevenue'],
                recordList: this.accountList,
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
        td.innerText = record['AccountNUmber'] || '' ;
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['Type'] || '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['Phone'] || '';
        tr.appendChild(td);

        td = document.createElement("TD");
        td.innerText = record['AnnualRevenue'] || '';
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
            this.doSearchAccount('search');
        }, {hasLodash:false,onlyInit:true});
    }
}