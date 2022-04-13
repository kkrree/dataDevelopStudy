/****************************************************************************************
 * @filename      : lwcComPubSub
 * @author        : I2max
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
   0.1     2020-04-01         I2MAX            Create
 ****************************************************************************************/
/**
 * 공통 Publish / Subscribe 이벤트 처리 Service
 * 세잍즈포스의 receipe 소스를 참조한 소스임.
 * 기본적으로 LMS(Lighnting Message Channel)를 이용하여 appication event를 처리하는 것을 추천하며,
 * LMS를 사용하지 못할 경우 사용할 것.
 * A basic pub-sub mechanism for sibling component communication
 * TODO - adopt standard flexipage sibling communication mechanism when it's available.
 * @class
 * @hideconstructor
 */
const LwcComPubSub = {

    /**
     * 등록 이벤트 객체
     * @type {object}
     * @member
     */
    events : {},

    /**
     * Confirm that two page references have the same attributes
     * @function
     * @param {object} pageRef1 - The first page reference
     * @param {object} pageRef2 - The second page reference
     * @since 1.0.0
     */
    gfnPubSubSamePageRef : (pageRef1, pageRef2) => {
        const obj1 = pageRef1.attributes;
        const obj2 = pageRef2.attributes;
        return Object.keys(obj1)
            .concat(Object.keys(obj2))
            .every(key => {
                return obj1[key] === obj2[key];
            });
    },

    /**
     * Registers a callback for an event
     * @function
     * @param {string} eventName - Name of the event to listen for.
     * @param {function} callback - Function to invoke when said event is fired.
     * @param {object} thisArg - The value to be passed as the this parameter to the callback function is bound.
     * @since 1.0.0
     */
    gfnPubSubRegisterListener : (eventName, callback, thisArg) => {
        // Checking that the listener has a pageRef property. We rely on that property for filtering purpose in gfnPubSubFireEvent()
        if (!thisArg.gComPageRef) {
            throw new Error(
                'pubsub listeners need a "@wire(CurrentPageReference) gComPageRef" property'
            );
        }

        if (!LwcComPubSub.events[eventName]) {
            LwcComPubSub.events[eventName] = [];
        }

        const duplicate = LwcComPubSub.events[eventName].find(listener => {
            return listener.callback === callback && listener.thisArg === thisArg;
        });

        if (!duplicate) {
            LwcComPubSub.events[eventName].push({ callback, thisArg });
        }
    },

    /**
     * Unregisters a callback for an event
     * @function
     * @param {string} eventName - Name of the event to unregister from.
     * @param {function} callback - Function to unregister.
     * @param {object} thisArg - The value to be passed as the this parameter to the callback function is bound.
     * @since 1.0.0
     */
    gfnPubSubUnRegisterListener : (eventName, callback, thisArg) => {
        if (LwcComPubSub.events[eventName]) {
            LwcComPubSub.events[eventName] = LwcComPubSub.events[eventName].filter(
                listener =>
                    listener.callback !== callback || listener.thisArg !== thisArg
            );
        }
    },

    /**
     * Unregisters all event listeners bound to an object.
     * @function
     * @param {object} thisArg - All the callbacks bound to this object will be removed.
     * @since 1.0.0
     */
    gfnPubSubUnregisterAllListeners : (thisArg) => {
        Object.keys(LwcComPubSub.events).forEach(eventName => {
            LwcComPubSub.events[eventName] = LwcComPubSub.events[eventName].filter(
                listener => listener.thisArg !== thisArg
            );
        });
    },

    /**
     * Fires an event to listeners.
     * @function
     * @param {object} pageRef - Reference of the page that represents the event scope.
     * @param {string} eventName - Name of the event to fire.
     * @param {*} payload - Payload of the event to fire.
     * @since 1.0.0
     */
    gfnPubSubFireEvent : (pageRef, eventName, payload) => {
        if (LwcComPubSub.events[eventName]) {
            const listeners = LwcComPubSub.events[eventName];
            listeners.forEach(listener => {
                if (LwcComPubSub.gfnPubSubSamePageRef(pageRef, listener.thisArg.gComPageRef)) {
                    try {
                        listener.callback.call(listener.thisArg, payload);
                    } catch (error) {
                        // fail silently
                        console.error(error);
                    }
                }
            });
        }
    }
}

export { LwcComPubSub };