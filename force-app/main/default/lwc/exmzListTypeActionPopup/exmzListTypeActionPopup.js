/****************************************************************************************
 * @filename      : exmzListTypeActionPopup
 * @author        : I2MAX
 * @date          : 2021-03-11
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
 1.0     2021-03-11            I2MAX            Create
 ****************************************************************************************/

import {api} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

// Apex Method
import searchById from '@salesforce/apex/ExmzOppty.searchByIds'
import update from '@salesforce/apex/ExmzOppty.updateOpportunities'

export default class ExmzListTypeActionPopup extends LwcExmzBase {

//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * 호출측에서 전달받는 Check 된 ID 목록
     */
    @api checkedIds;

    /**
     * 조회된 Opportunity 목록
     */
    opportunityList;

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
    gfnComInitDynamicComponent(renderData){
        this.gfnLog('renderData >> ', JSON.parse(JSON.stringify(renderData)));

        this.checkedIds = renderData.paramData.checkedIds;
        this.doSearchOpportunityById();
    }

    /**
     * Opportunity 조회
     */
    doSearchOpportunityById(){
        this.gfnComApex({
            serverAction    : searchById,
            cFuncName       : 'Search check records',
            sFuncName       : 'Search',
            // params          : this.ProxyUtil.toObject(this.checkedIds),
            params          : {
                recordIds : this.checkedIds
            },
            resultHandler   : result => {
                try{
                    this.opportunityList = result;
                }
                catch(error){
                    this.gfnComHandleError(error);
                    this.close();
                }
            }
        })
    }

    /**
     * 저장
     */
    save() {
        const inputFields       = this.template.querySelector('c-lwc-ufw-container-qa')?.querySelector('c-lwc-ufw-body-qa')?.querySelectorAll('lightning-input-field');
        const opportunityIds    = this.opportunityList.map( opportunity => {
            return opportunity.Id;
        });

        inputFields.forEach( inputField => {
            let index = opportunityIds.indexOf( inputField.dataset.recordId );
            this.opportunityList[index].Description = inputField.value;
        })

        this.gfnComApex({
            serverAction    : update,
            cFuncName       : 'Update records',
            sFuncName       : 'Update',
            params          : {
                records : this.opportunityList
            },
            resultHandler   : result => {
                try{
                    this.gfnComShowToastDefaultSuccess();
                    this.gfnComFireDispatch('saverecord');
                    this.close();
                }catch(error){
                    this.gfnComHandleError(error);
                    this.close();
                }
            }
        })
    }

    /**
     * Popup Close
     */
    close() {
        this.gfnComCloseModal();
    }
}