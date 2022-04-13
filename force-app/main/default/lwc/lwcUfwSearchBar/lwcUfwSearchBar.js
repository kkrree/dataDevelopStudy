/****************************************************************************************
 * @filename      : lwcUfwSearchBar
 * @author        : I2MAX
 * @date          : 2021-02-09
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date            author       description
 * ===============================================================
 0.1     2021-02-09         I2MAX          Create
 ****************************************************************************************/
import { api, track, wire } from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwSearchBar extends LwcUfwBase {
    @api customClassName;

    get customClass() {
        return (this.customClassName) ? 'slds-list_horizontal ' + this.customClassName : 'slds-list_horizontal';
    }
}