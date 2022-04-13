/****************************************************************************************
 * @filename      : lwcUfwContainer
 * @author        : I2MAX
 * @date          : 2020-04-01 오전 9:41
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
   1.0     2020-04-01         I2MAX            Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwContainer extends LwcUfwBase {
    //==================================================================
    // spinner 여부
    //==================================================================
    @api isSpinner = false;
}