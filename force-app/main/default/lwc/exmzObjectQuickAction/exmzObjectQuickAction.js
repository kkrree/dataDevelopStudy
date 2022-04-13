/****************************************************************************************
 * @filename      : exmzObjectQuickAction
 * @author        : I2MAX
 * @date          : 2021-04-04
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
 1.0     2021-04-04            I2MAX            Create
 ****************************************************************************************/

import {api,wire} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

export default class ExmzObjectQuickAction extends LwcExmzBase {

    //============================================================================
    //============================================================================
    // Property / getter, setter
    //============================================================================
    //============================================================================

    /**
     * Record ID
     * Aura Component 를 통해 주입
     */
    @api recordId;


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

    /**
     * Close 이벤트 발생
     */
    fireCloseEvent(){
        this.gfnComFireDispatch('close');
    }

    /**
     * Save 수행
     */
    callSave(){
        const self          = this;
        const detailCard    = this.template.querySelector('c-exmz-card-type-default');

        const savePromise = detailCard.doSave()
            .then(()=> {
                console.log('before dispatch');
                self.gfnComFireDispatch('close_refresh');
                console.log('after dispatch');
            })
            .catch( error => {
                console.log('before error');
                self.gfnComHandleError(error);
                console.log('after error');
            })
    }

    //============================================================================
    //============================================================================
    // lifecycle hooks
    // constructor, connectedCallback, render, renderedCallback, disConnectedCallback
    //============================================================================
    //============================================================================
}