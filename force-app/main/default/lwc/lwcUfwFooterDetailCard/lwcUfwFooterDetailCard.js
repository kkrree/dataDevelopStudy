/****************************************************************************************
 * @filename      : lwcUfwFooterDetailCard
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

import {api,track,wire} from 'lwc';
import {LwcUfwBase} from "c/lwcUfwBase";

export default class LwcUfwFooterDetailCard extends LwcUfwBase {

    @api isDetailFooterLeft     = false;
    @api isDetailFooterRight    = false;

    get footerClass(){
        return this.isDetailFooterLeft ? 'slds-text-align_left' : 'slds-text-align_right';
    }
}