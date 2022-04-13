/****************************************************************************************
 * @filename      : lwcUfwDynamicRender
 * @author        : I2MAX
 * @date          : 2021-02-22
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
   0.1     2021-02-22      I2MAX          Create
 ****************************************************************************************/
import {api, track, wire} from 'lwc';
import {LwcUfwBase} from 'c/lwcUfwBase';

export default class LwcUfwDynamicRender extends LwcUfwBase {

    @api
    handleRender({showComponentName, isQuickAction}) {

        console.log(showComponentName, isQuickAction);

        this.querySelectorAll('*').forEach((element, index) => {
            isQuickAction ? (()=>{
                element.tagName.toUpperCase() === showComponentName.toUpperCase() ? element.gfnComShowModal() : element.gfnComCloseModal();
            })() : (()=>{
                element.tagName.toUpperCase() === showComponentName.toUpperCase() ? element.hidden = false : element.hidden = true;
            })();
        });
    }

}