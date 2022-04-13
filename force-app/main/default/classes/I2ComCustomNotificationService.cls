/****************************************************************************************
  * @filename      : I2ComCustomNotificationService
  * @projectname   : 
  * @author        : i2max
  * @date          : 2021-04-02
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : I2ComCustomNotificationService_ts.cls
  * @reference     : 
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date            author         description
  * ===============================================================
    0.1     2021-04-02         i2max          Create
****************************************************************************************/
public with sharing class I2ComCustomNotificationService {

    /*

    // developerName 지정 예제
    new I2ComCustomNotificationService.Notifier()
    .setNotifyTypeInfo('testCustomNotification')
    .setNotifyDataInfo(new I2ComCustomNotificationService.NotifyDataInfo(
        UserInfo.getUserId(),
        '테스트',
        '테스트로 보냅니다.',
        UserInfo.getUserId(),
        ''
    ))
    .setRecipientsIds(new Set<String>{UserInfo.getUserId()})
    .notify();


    // typeId를 지정 예제
    new I2ComCustomNotificationService.Notifier().setNotifyTypeId('0ML5g0000008OtnGAE').setNotifyDataInfo(new I2ComCustomNotificationService.NotifyDataInfo(
        UserInfo.getUserId(),
        '테스트',
        '테스트로 보냅니다.',
        UserInfo.getUserId(),
        ''
    )).setRecipientsIds(new Set<String>{UserInfo.getUserId()}).notify();

    */

    /**
     * Custom Notification 데이터 정보 Class
     */
    public class NotifyDataInfo {
        public String sender {get;set;}
        public String title {get;set;}
        public String body {get;set;}
        public String targetId {get;set;}
        public String targetPageRef {get;set;}

        public NotifyDataInfo(
            final String sender,
            final String title,
            final String body,
            final String targetId,
            final String targetPageRef
        ) {
            this.sender = sender;
            this.title = title;
            this.body = body;
            this.targetId = targetId;
            this.targetPageRef = targetPageRef;
        }
    }

    /**
     * Class for Real Custom Notification Sender
     * Custom Notification Notify Instance
     */
    public class Notifier {
        public String typeId {get; private set;}
        public Set<String> recipientsIds {get;set;}
        public NotifyDataInfo notifyDataInfo {get;set;}
        public Boolean isPassError {get;set;}

        /**
         * developerName을 이용하여 Custom Notification Type Id를 구함
         * 하나의 타입을 적용할 경우 사용
         * @param developerName Custom Notification developerName
         * @return this
         */
        public Notifier setNotifyTypeInfo(final String developerName) {
            try {
                CustomNotificationType notificationType = [
                    SELECT Id, DeveloperName
                    FROM CustomNotificationType
                    WHERE DeveloperName = :developerName
                ];

                this.typeId = notificationType.Id;
            }
            catch(Exception e) {
                if(this.isPassError == true) {
                    System.debug(System.LoggingLevel.ERROR, 'Problem getting notification type: ' + e.getMessage());
                }
                else {
                    throw e;
                }
            }

            return this;
        }

        /**
         * Custom Notification Type Id 세팅
         * 여러개의 타입이 적용될 경우에는 직접 TypeId를 세팅하여 처리
         * 여러 타입을 적용할 경우 select를 여러번 하지 않기 위함.
         * String 타입으로 설정하여 invalid Id 인 경우에도 일단 세팅은 되게 처리함.
         * @param typeId Custom Notification Type Id
         * @return this
         */
        public Notifier setNotifyTypeId(final String typeId) {
            this.typeId = typeId;
            return this;
        }

        /**
         * Notification 정보 데이터 세팅
         * @param notifyDataInfo : Notification 데이터 정보
         * @return this
         */
        public Notifier setNotifyDataInfo(final NotifyDataInfo notifyDataInfo) {
            this.notifyDataInfo = notifyDataInfo;
            return this;
        }

        /**
         * Notification 대상자의 Ids 세팅
         * @param recipientsIds : 대상자 Ids
         * @return this
         */
        public Notifier setRecipientsIds(final Set<String> recipientsIds) {
            this.recipientsIds = recipientsIds;
            return this;
        }

        /**
         * Custom Notification Send
         */
        public void notify() {

            try {
                //----------------------------------------------------------------------------
                // Create a new custom notification
                //----------------------------------------------------------------------------
                Messaging.CustomNotification notification = new Messaging.CustomNotification(
                    this.typeId,
                    this.notifyDataInfo.sender,
                    this.notifyDataInfo.title,
                    this.notifyDataInfo.body,
                    this.notifyDataInfo.targetId,
                    this.notifyDataInfo.targetPageRef
                );

                //------------------------------------------------------------
                // send
                //------------------------------------------------------------
                notification.send(this.recipientsIds);
            }
            catch (Exception e) {
                if(this.isPassError == true) {
                    System.debug(System.LoggingLevel.ERROR, 'Problem sending notification: ' + e.getMessage());
                    System.debug(System.LoggingLevel.ERROR, 'Notifier: ' + this);
                }
                else {
                    throw e;
                }
            }

        }

        public Notifier() {
            this(true);
        }

        public Notifier(final Boolean isPassError) {
            this.isPassError = isPassError;
        }
    }

}