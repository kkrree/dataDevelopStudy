/****************************************************************************************
 * @filename      : lwcUfwHeader
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
   1.0     2020-04-01         I2MAX            Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwHeader extends LwcUfwBase {
    @api iconName;
    @api type;
    @api title;
    @api condition1 = false;
    @api condition2 = false;
    @api condition3 = false;

    // Community 여부
    isCommunity = this.gComIsCommunity;
}