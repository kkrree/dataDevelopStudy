/****************************************************************************************
 * @filename      : lwcExmBase
 * @author        : I2MAX
 * @date          : 2020-04-01
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
   0.1     2020-04-01         I2MAX            Create
 ****************************************************************************************/
import {LwcComBase} from 'c/lwcComBase';
import {LwcExmUtil} from 'c/lwcExmUtil';
import {LwcExmData} from 'c/lwcExmData';
import {api, track} from "lwc";

/**
 * Exm 공통 Base Class
 */
export class LwcExmBase extends LwcComBase {

    /**
     * data setting 및 render 호출.
     * 기본은 callbackFn 없이 사용하나, 필요시 callbackFn 에서 전부 다 handling(this 유의).
     *
     * @param detail
     * @param callbackFn
     * @param selector
     */
/*    gfnRenderCall(detail, callbackFn, selector='c-lwc-ufw-dynamic-render') {
        if(!detail.callbackFn) {
            // render 될 component init시, data setting.
            const targetObj = detail.targetObj;
            targetObj?.isInit && targetObj.paramThis.gfnComModalInit(detail.showComponentName, targetObj);
        } else {
            detail.callbackFn()
        }

        // renderer에게 target component 정보 전달
        this.template.querySelector(selector).handleRender({
            showComponentName: detail.showComponentName
        });
    }*/
}

Object.assign(LwcExmBase.prototype, LwcExmUtil, LwcExmData);