/****************************************************************************************
 * @filename      : lwcUfwObjectQuickAction
 * @author        : I2MAX
 * @date          : 2021-03-05
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
 1.0     2021-03-05            I2MAX            Create
 ****************************************************************************************/

import { api, track } from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

const CSS_CLASS = 'quickaction-hidden';

export default class LwcUfwObjectQuickAction extends LwcUfwBase {
//==================================================================
    // spinner 여부
    //==================================================================
    @api isSpinner = false;
    @api contents;
    @api footers;

    //==================================================================
    // showQuickAction 여부
    //==================================================================
    @track showQuickAction = false;
    @api
    set header(value) {
        this.hasHeaderString = value !== '';
        this._headerPrivate = value;
    }
    get header() {
        return this._headerPrivate;
    }

    @track hasHeaderString = false;
    _headerPrivate;

    connectedCallback() {
        this.gfnComConnectedCallback(() => {
            this.showQuickAction = true;
        });
    }

    @api show() {
        this.showQuickAction = true;
    }

    @api hide() {
        this.showQuickAction = false;
    }

    handleDialogShow() {
        //Let parent know that dialog is closed (mainly by that cross button) so it can set proper variables if needed
        this.gfnComFireDispatch('showdialog');
        this.show();
    }

    handleDialogClose() {
        //Let parent know that dialog is closed (mainly by that cross button) so it can set proper variables if needed
        this.gfnComFireDispatch('closedialog');
        this.hide();
    }

    handleSlotTaglineChange() {
        const taglineEl = this.template.querySelector('p');
        taglineEl.classList.remove(CSS_CLASS);
    }

    handleSlotFooterChange() {
        const footerEl = this.template.querySelector('footer');
        footerEl.classList.remove(CSS_CLASS);
    }
}