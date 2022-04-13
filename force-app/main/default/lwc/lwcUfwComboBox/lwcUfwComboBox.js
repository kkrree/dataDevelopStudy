/****************************************************************************************
 * @filename      : lwcUfwComboBox
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

export default class LwcUfwComboBox extends LwcUfwBase {
    @api name;
    @api label;
    @api value;
    @api options        = [];
    @api disabled;
    @api changeHandler;
    @api isLarge        = false;
    @api isMedium       = false;
    @api isSmall        = false;
    @api labelHidden    = false;
    @api placeholder    = '-- None --';

    get comboBoxName(){
        return this.name;
    }
    get comboBoxLabel(){
        return this.label;
    }
    get comboBoxOption(){
        return this.options;
    }
    get comboBoxDisabled(){
        return this.disabled;
    }
    get comboBoxValue(){
        return this.value;
    }
    get comboBoxClass(){
        return this.isLarge ? ' custom-input__large' : (this.isMedium ? ' custom-input__medium' : ' custom-input__small');
    }
    get comboBoxPlaceHolder(){
        return this.placeholder;
    }
    get comboBoxVariant(){
        return this.labelHidden ? 'label-hidden' : 'standard';
    }
    comboBoxChange(event){
        this.changeHandler?.(event);
    }
}