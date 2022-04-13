/****************************************************************************************
 * @filename      : lwcUfwSearchLookupItem
 * @author        : I2MAX
 * @date          : 2021-02-10
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
 0.1     2021-02-10      I2MAX          Create
 ****************************************************************************************/
import { api, track, wire } from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwSearchLookupItem extends LwcUfwBase {
    @api label;
    @api sobjectName;
    @api recordId;

    // 자체 판단
    get hasLabel() {
        return !!this.label;
    }

    // label getter
    get labelName() {
        return (this.label) ? this.label : '';
    }
}