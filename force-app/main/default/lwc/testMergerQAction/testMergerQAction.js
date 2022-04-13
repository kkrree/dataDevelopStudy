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
** @filename     : testMergerQAction
* @projectname   : I2MAX 공통 소스 오그
* @author        : NURI CHOI
* @date          : 2021-07-02 오후 1:33
* @group         :
* @group-content :
* @description   :
* @tester        :
* @reference     :
* @release       : v1.0.0
* @modification Log
* ===============================================================
* ver     date             author              description
* ===============================================================
  0.1     2021-07-02         NURI CHOI         Create
****************************************************************************************/

import { LightningElement, api, wire, track } from 'lwc';

import {LwcComBase} from 'c/lwcComBase';
import {LwcComUtil} from 'c/lwcComUtil';
import {LwcComData} from 'c/lwcComData';




export default class TestMergerQAction extends LwcComBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    @api recordId;

    fileList;

    formatValue = null;

    stages = ['Promotion', 'RFI', 'RFQ', 'SOW'];
    formats = ['pptx', 'docx'];

    // dual-listbox selected vales
    _selected = [];


    get stageOptions(){
        return stages.map(item => new Option(item, item));
    }

    get formatOptions(){
        return formats.map(item => new Option(item, item));
    }

    get isDisabled(){
        return this.fileList && !this.ArrayUtil.isEmpty(this._selected) ? false : true;
    }


//============================================================================
//============================================================================
// @wire Property or Function
//============================================================================
//============================================================================

//============================================================================
//============================================================================
// Function
//      fireXXX : fire custom event
//      handleXXX : handle custom event
//      doXXX : call server action
//      ETC
//============================================================================
//============================================================================

    fireStageChangeEvent(event){
      this.gfnComFireDispatch('stagechange',{stageValue:event.detail.value});
    }

    handleStageChangeEvent(event){
       const stageValue   = event.detail.stageValue;
       const stageElement = this.template.querySelector('c-lwc-ufw-object-quick-action').querySelector('c-lwc-ufw-body-qa').querySelector('c-lwc-ufw-combo-box');
       console.log('stageElemnet >> ' , stageElement);
       stageElement.value = stageValue;
    }

    handleFormatChange(event){
        console.log('format value before >>> ', this.formatValue);
        this.formatValue = event.detail.value;
        console.log('format value after >>> ', this.formatValue);
    }


    searchFileList(){
        //get filter values
        const filterElement = this.template.querySelector('c-lwc-ufw-object-quick-action').querySelector('c-lwc-ufw-body-qa');
        console.log('filterElement >>. ', filterElement);
        const stageValue = filterElement.querySelector('c-lwc-ufw-combo-box')?.value;
        const formatValue = filterElement.querySelector('lightning-radio-group')?.value;
        console.log('stage value >> ', stageValue);
        console.log('format Value >> ', formatValue);

        this.gfnComApex({
            serverAction    : searchFiles,
            cFuncName       : 'searchFileList',
            sFuncName       : 'searchFiles',
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

    handleFileListChange(event){
        console.log('handleFileListChange');
        console.log('is Array >> ', Array.isArray(event.detail.value));
        //this._selected = event.detail.value;
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