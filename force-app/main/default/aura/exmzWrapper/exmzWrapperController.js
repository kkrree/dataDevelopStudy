/****************************************************************************************
 * @filename      : exmzWrapperController.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-03-16
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date             author        description
 * ===============================================================
 0.1     2021-03-16             I2MAX          Create
 ****************************************************************************************/
({

    /**
     * lwc에서 dispatch 된 이벤트를 handle
     * @param component
     * @param event
     * @param helper
     */
    handleEventFromLWC: function(component, event, helper) {
        const detail = event.getParams();
        console.log('dispatch detail', JSON.parse(JSON.stringify(detail)));
        component.set('v.detail1', JSON.parse(JSON.stringify(detail)));
        component.find('handleTabset').set('v.selectedTabId', '2');
    },

    /**
     * lwc에서 pubsub 이벤트를 handle 
     * @param component
     * @param event
     * @param helper
     */
    handlePubSubEventFromLWC: function(component, event, helper) {
        const pubsubReadyActionParams = helper.getReadyActionParams(component);
        console.log('pubsub detail', JSON.parse(JSON.stringify(pubsubReadyActionParams)));
        component.set('v.detail2', JSON.parse(JSON.stringify(pubsubReadyActionParams)));
        component.find('handleTabset').set('v.selectedTabId', '3');
    },

    /**
     * lac에서 직접 lwc 함수 호출
     * @param component
     * @param event
     * @param helper
     */
    callDirectLWC: function(component, event, helper) {
        component.find('lwcComponent').callTest({
            value: 'Aura에서 LWC Component를 직접 호출합니다.'
        });
    },

    /**
     * lac에서 pubsub 으로 이벤트 발생
     * @param component
     * @param event
     * @param helper
     */
    firePubSubEventToLWC: function(component, event, helper) {
        helper.fireEvent(component, 'lactolwc_pubsub',{
            value: 'Aura에서 LWC Component에 PubSub 이벤트를 발생합니다.'
        });
    }

});