/****************************************************************************************
 * @filename      : lwcUfwContainerDetailCard
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

export default class LwcUfwContainerDetailCard extends LwcUfwBase {

    _hasContainerBorder;

    @api
    get hasContainerBorder() {
        return this._hasContainerBorder
    }
    set hasContainerBorder(value) {
        this._hasContainerBorder = this.PropertyUtil.isTrue(value);
    }

    get containerClass(){
        return !!this.hasContainerBorder ? 'slds-card slds-card_boundary headerBottomBorder forceRelatedListCardDesktop' : 'slds-card';
    }

}