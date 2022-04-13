/****************************************************************************************
 * @filename      : lwcUfwSectionFrame
 * @author        : I2MAX
 * @date          : 2021-03-04
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
 1.0     2021-03-04            I2MAX            Create
 ****************************************************************************************/

import {LightningElement, api} from 'lwc';
import {LwcUfwBase} from "c/lwcUfwBase";

export default class LwcUfwSectionFrame extends LwcUfwBase {

    @api title;
    @api hasHeader = false;

    get sectionFrameTitle(){
        return this.title;
    }
    get hasSectionFrameHeader(){
        return !!this.hasHeader;
    }

}