({
    /**
     * lac 에서 lwc 로 이벤트 fire
     * @param component
     * @param pubsubFireEventName : 이벤트명
     * @param pubsubParams : 이벤트파라미터
     */
    fireEvent: function(component, pubsubFireEventName, pubsubParams) {
        component.getSuper().find('pubsub').gfnPubSubAuraFireEvent(pubsubFireEventName, pubsubParams);
    },

    /**
     * pubsubReady에서 넘어온 callback params를 구함
     * @param component
     * @returns {*}
     */
    getReadyActionParams: function (component) {
        return component.get('v.pubsubReadyActionParams');
    }
});