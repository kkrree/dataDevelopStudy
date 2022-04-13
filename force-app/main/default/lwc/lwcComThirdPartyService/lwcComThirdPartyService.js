/****************************************************************************************
 * @filename      : LwcComThirdPartyService
 * @author        : I2MAX
 * @date          : 2021-01-25
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date             author       description
 * ===============================================================
   0.1     2021-01-25       I2MAX          Create
 ****************************************************************************************/

import { loadScript } from 'lightning/platformResourceLoader';
import I2_COM_LIB from '@salesforce/resourceUrl/i2comlib';

const lodash = I2_COM_LIB + '/I2ComLib/JS/lodash_full_4.17.15.js';

/**
 * thirdParty library 사용 처리 Service
 * @class
 * @hideconstructor
 */
const LwcComThirdPartyService = {
    /**
     * lodash 로딩
     * @method
     * @param {object} thisArg - 전달되는 this
     * @returns {Promise<void>}
     */
    gfnSvcGetLodash : (thisArg) => {

        // 기존에 global lodash가 존재할 경우
        if(thisArg._) {
            return new Promise(() => {});
        }

        thisArg.gfnComShowSpinner();

        return loadScript(thisArg, lodash)
            .then(() => {
                thisArg.gfnComHideSpinner();
                console.info('%c=====> lodash javascript library loaded.', 'color:blue' );
                // 자신의 lodash(_) 에 세팅
                thisArg._ = _;
            })
            .catch(error => {
                thisArg.gfnComHideSpinner();
                thisArg.gfnComHandleError(error);
            });
    }

}

export {LwcComThirdPartyService}