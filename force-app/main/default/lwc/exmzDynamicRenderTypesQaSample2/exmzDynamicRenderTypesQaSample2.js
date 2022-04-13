/****************************************************************************************
 * @filename      : ExmzDynamicRenderTypesQaSample2
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
import {LwcComBase} from 'c/lwcComBase';

export default class ExmzDynamicRenderTypesQaSample2 extends LwcComBase {
//============================================================================
//============================================================================
// Property / getter, setter
//============================================================================
//============================================================================
    /**
     * description
     */
    @api tempRecordId;
    /**
     * description
     */
    @api opportunity;

    renderData;

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
     * description
     */
    closeModal() {
        this.gfnComCloseModal();
        //============================================================================
        // paramThis 의 function 호출 : renderQaSample1 호출
        // 업무적으로 다른 QA를 호출할 경우 paramThis를 이용하여 해당 함수를 호출
        //============================================================================
        this.renderData.paramThis.renderQaSample1();
    }

    /**
     * description
     */
    save() {
        this.gfnComShowToast(this.ToastData.gComShowToastMessages.s, this.ToastData.gComShowToastVariant.w);
    }

//============================================================================
//============================================================================
// Function
//    override super function
//============================================================================
//============================================================================
    /**
     * Dynamic Render 에서 해당 컴포넌트 초기 수행 override
     * @param renderData
     */
    gfnComInitDynamicComponent(renderData) {
        this.gfnLog('qa sample2 gfnComDynamicRenderInit called...', renderData?.paramData);
        this.gfnLog('qa sample2 renderData.paramData', renderData?.paramData?.value, renderData?.isInit);
        renderData?.paramThis?.testCallThisFn(renderData.paramData);

        //============================================================================
        // 초기값을 세팅
        //============================================================================
        this.renderData = renderData;

    }

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
            this.gfnLog('000000000000000000------------');
        });
    }

    renderedCallback() {
        this.gfnComRenderedCallback(() => {
            this.gfnLog('000000000000000000============');
        });
    }

}