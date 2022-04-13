/****************************************************************************************
 * @filename      : exmzDCardTypesDesign
 * @author        : I2MAX
 * @date          : 2021-04-07
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
 1.0     2021-04-07            I2MAX            Create
 ****************************************************************************************/

import {api} from 'lwc';
import {LwcExmzBase} from "c/lwcExmzBase";

export default class ExmzDCardTypesDesign extends LwcExmzBase {

    //============================================================================
    //============================================================================
    // Property / getter, setter
    //============================================================================
    //============================================================================

    /**
     * Record ID
     * Lightning Record Page - Record ID 바인딩
     * Community Record Page - Metadata 파일 <targetConfig> 정의
     */
    @api recordId;

    /**
     * Design Attribute
     * Metadata 파일 <targetConfig> 정의
     */
    @api designFieldNames;


    get fieldNames(){
        return this.designFieldNames?.split(',');
    }
}