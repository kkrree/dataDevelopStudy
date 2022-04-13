({
    /**
     * 이벤트 리스너 등록(lwc에서 발생하는 이벤트 리스너)
     * 기본적으로 QA의 close 로직으로 구현되어 있음.
     * [유의] 업무별로 필용한 부분을 구현할 것
     * @param component
     */
    handlePubsubReady: function(component) {
        const pubsubReadyEventName = component.get('v.pubsubReadyEventName');
        const pubsubReadyAction = component.get('v.pubsubReadyAction');

        if($A.util.isEmpty(pubsubReadyEventName) === false) {
            component.find('pubsub').gfnPubSubAuraRegisterListener(pubsubReadyEventName, $A.getCallback(function(params) {
                if($A.util.isEmpty(pubsubReadyAction) === false) {
                    //==================================================================
                    // callback으로 넘어온 params를 세팅
                    // client action에서 파라미터를 세팅할 수 없음.
                    //==================================================================
                    component.set('v.pubsubReadyActionParams', params);
                    $A.enqueueAction(pubsubReadyAction);
                }
            }));
        }
    },

    /**
     * 이벤트 리스트 해제
     * @param component
     */
    handleDestroy: function(component) {
        component.find('pubsub').gfnPubSubAuraUnregisterAllListeners();
    },

});