/****************************************************************************************
 * @filename      : lwcUfwBody
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
import { api, track, wire } from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwBody extends LwcUfwBase {
    // @api hasSearchSection = false;

    _hasSearchSection = false;

    @api
    get hasSearchSection() {
        return this._hasSearchSection;
    };
    set hasSearchSection(value) {
        this._hasSearchSection = this.PropertyUtil.isTrue(value);
    };
}