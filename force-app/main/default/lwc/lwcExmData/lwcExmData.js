/****************************************************************************************
 * @filename      : lwcExmData
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
import {LwcComData} from "c/lwcComData";

// 각각의 base에서 필요한 custom label을 사용하여 동적으로 처리하기
// import COM_APEX_SUCCESS from '@salesforce/label/c.COM_APEX_SUCCESS';
// import COM_APEX_ERROR from '@salesforce/label/c.COM_APEX_ERROR';

const LwcExmData = {
    /**
     * EXM 업무 기본 데이터
     */
    ExmData: {
        /**
         * Exm 업무에서 사용되는 메시지 정의
         * @type {{s: string, e: string}}
         */
        gExmMessage: {
            's': LwcComData.ToastData.gComShowToastMessages.s, 'e': '실패'
        },

    },

};

//============================================================================
// Read Only and No delete Property
//============================================================================
Object.defineProperty(LwcExmData.ExmData, 'gExmMessage', {writable: false, configurable: false});

export { LwcExmData };