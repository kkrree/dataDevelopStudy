/****************************************************************************************
 * @filename      : exmzListTypeActionPopup2
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
import getOpportunity from "@salesforce/apex/ExmzOppty.getOpportunity"
import updateOpportunity from "@salesforce/apex/ExmzOppty.updateOpportunity"

export default class ExmzListTypeActionPopup2 extends LwcExmzBase {

//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================

    /**
     * 호출측에서 전달받는 Record Id
     */
    opportunityId;

    /**
     * 조회된 Opportunity Record
     */
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
     * Dynamic Component 초기화 함수
     * @param renderData {Object} Parameter
     */
    @api
    gfnComInitDynamicComponent(renderData){
        this.opportunityId = renderData.paramData.opportunityId;
        this.doSearchOpportunityData()
    }

    /**
     * Opportunity Record 조회
     */
    doSearchOpportunityData(){
        this.gfnComApex({
            serverAction    : getOpportunity,
            cFuncName       : 'doSearchOpportunityData',
            sFuncName       : 'getOpportunity',
            params          : {
                opportunityId : this.opportunityId
            },
            resultHandler   : result => {
                try {
                    this.opportunity = result;
                }catch(error){
                    this.gfnComHandleError(error);
                }
            }
        });
    }

    /**
     * Opportunity Record 업데이트
     */
    doUpdateOpportunityData(){
        const formElement = this.template.querySelector('c-lwc-ufw-container-qa').querySelector('c-lwc-ufw-body-qa');

        let inputValue = {
            Name        : formElement.querySelector('[data-name="Name"]').value,
            AccountId   : formElement.querySelector('[data-name="AccountId"]').value,
            StageName   : formElement.querySelector('[data-name="StageName"]').value,
            CloseDate   : formElement.querySelector('[data-name="CloseDate"]').value,
            Amount      : formElement.querySelector('[data-name="Amount"]').value,
            Probability : formElement.querySelector('[data-name="Probability"]').value
        };

        Object.assign(this.opportunity , inputValue);

        this.gfnComApex({
            serverAction    : updateOpportunity,
            cFuncName       : 'UpdateOpportunity',
            sFuncName       : 'updateOpportunity',
            params          : {
                record : this.opportunity
            },
            resultHandler   : result => {
                this.gfnComShowToastDefaultSuccess();
                this.gfnComFireDispatch('updaterecord');
                this.gfnComCloseModal();
            }
        })
    }

    /**
     * Save
     */
    save(event){
        this.doUpdateOpportunityData();
    }

    /**
     * Popup Close
     */
    close(event) {
        this.gfnComCloseModal();
    }
}