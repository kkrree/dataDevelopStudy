/****************************************************************************************
 * @filename      : ExmzDynamicRenderTypesMain
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

export default class ExmzDynamicRenderTypesMain extends LwcExmzBase {
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
        this.gfnLog('main override gfnComDynamicRenderInit called...', renderData?.paramData);
        this.gfnLog('main renderData.paramData', renderData?.paramData?.value, renderData?.isInit);
        renderData?.paramThis?.testCallThisFn(renderData?.paramData);
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