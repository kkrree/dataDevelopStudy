@IsTest
private class I2ComCustomNotificationService_ts {
    @IsTest
    static void testBehavior() {
        Id userId = UserInfo.getUserId();

        System.runAs(new User(Id = userId)) {

            new I2ComCustomNotificationService.Notifier(true).setNotifyTypeInfo('test').setNotifyDataInfo(new I2ComCustomNotificationService.NotifyDataInfo(
                'sender',
                'title',
                'body',
                userId,
                ''
            )).setRecipientsIds(new Set<String>{userId}).notify();

            new I2ComCustomNotificationService.Notifier().setNotifyTypeId(userId).setNotifyDataInfo(new I2ComCustomNotificationService.NotifyDataInfo(
                'sender',
                'title',
                'body',
                userId,
                ''
            )).setRecipientsIds(new Set<String>{userId}).notify();

        }

    }

}