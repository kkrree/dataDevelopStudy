/****************************************************************************************
  * @filename      : I2ComMailService
  * @projectname   : 
  * @author        : i2max
  * @date          : 2021-04-13
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : I2ComMailService_ts.cls
  * @reference     : 
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date            author         description
  * ===============================================================
    0.1     2021-04-13         i2max          Create
****************************************************************************************/
public with sharing class I2ComMailService {

    /**
     * Single Email Send
     * @param singleEmails singleEmails
     * @param allOrNothing 일괄성공실패 여부
     *
     * @return List<Messaging.SendEmailResult>
     */
    public static List<Messaging.SendEmailResult> sendSingleEmail(final List<I2ComMailService.SingleEmail> singleEmails, final Boolean allOrNothing) {
        List<Messaging.Email> singleEmailMessages = new List<Messaging.Email>();

        for(I2ComMailService.SingleEmail singleEmail : singleEmails) {
            singleEmailMessages.add(singleEmail.getSingleEmailMessage());
        }

        return Messaging.sendEmail(singleEmailMessages, allOrNothing);
    }

    public static List<Messaging.SendEmailResult> sendSingleEmail(final List<I2ComMailService.SingleEmail> singleEmails) {
        return I2ComMailService.sendSingleEmail(singleEmails, false);
    }

    /**
     * Single Email Wrapper Class
     */
    public class SingleEmail {
        private Messaging.SingleEmailMessage singleEmailMessage {get;set;}

        public SingleEmail() {
            this.singleEmailMessage = new Messaging.SingleEmailMessage();
        }

        public I2ComMailService.SingleEmail getSingleEmail() {
            return this;
        }

        public Messaging.SingleEmailMessage getSingleEmailMessage() {
            return this.getSingleEmail().singleEmailMessage;
        }

        /**
         * Template이 아닌 직접 subject 세팅 처리
         * @param subject 메일 주제
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setSubject(final String subject) {
            this.singleEmailMessage.setSubject(subject);
            return this;
        }

        /**
         * Template이 아닌 직접 내용
         * @param plainTextBody 메일 내용
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setPlainTextBody(final String plainTextBody) {
            this.singleEmailMessage.setPlainTextBody(plainTextBody);
            return this;
        }

        /**
         * Template이 아닌 직접 html 내용
         * @param htmlBody 메일 html 내용
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setHtmlBody(final String htmlBody) {
            this.singleEmailMessage.setHtmlBody(htmlBody);
            return this;
        }

        /**
         * 사용할 이메일 템플릿 Id 지정
         * @param templateId 이메일 템플릿 Id
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setTemplateId(final Id templateId) {
            this.singleEmailMessage.setTemplateId(templateId);
            return this;
        }

        /**
         * user, Lead and Contact Only 세팅
         * Internal user, lead, contact의 Id를 이용하여 내부 전송은 limit count 안됨
         * There’s no limit on sending single emails to
         * contacts, leads, person accounts, and users in your org directly
         * from account, contact, lead, opportunity, case, campaign, or custom object pages.
         * external email address 인 경우에는 to, cc, bcc 모두 count됨.
         * @param targetObjectId user, Lead and Contact Id
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setTargetObjectId(final Id targetObjectId) {
            this.singleEmailMessage.setTargetObjectId(targetObjectId);
            return this;
        }

        /**
         * 활동으로 지정 여부 (User, Contact 인 경우)
         * User인 경우에는 false를 지정할 것
         * @param isActivity SaveAsActivity 여부
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setSaveAsActivity(final Boolean isActivity) {
            this.singleEmailMessage.setSaveAsActivity(isActivity);
            return this;
        }

        /**
         * 활동으로 지정시 whatId 지정(User, Contact 인 경우)
         * @param whatId whatId
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setWhatId(final Id whatId) {
            this.singleEmailMessage.setWhatId(whatId);
            return this;
        }

        /**
         * organization widw addresses를 세팅(org 대표 displayName을 지정하여 메일 발송)
         * for(OrgWideEmailAddress owd : [select id, address, displayname from OrgWideEmailAddress limit 1]) {
               email.setOrgWideEmailAddressId(owd.address);
           }
         *
         * @param emailAddressid org wide address
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setOrgWideEmailAddressId(final Id emailAddressid) {
            this.singleEmailMessage.setOrgWideEmailAddressId(emailAddressid);
            return this;
        }

        /**
         * String 의 메일주소를 직접 사용
         * external email address 인 경우에 사용
         * internal user인 경우에도 이 메소드 세팅인 경우에는 limit count 됨.[유의]
         * @param toAddresses 메일주소 String
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setToAddresses(final List<String> toAddresses) {
            this.singleEmailMessage.setToAddresses(toAddresses);
            return this;
        }

        /**
         * 숨은 참조 주소 사용
         * @param bccAddresses 숨은 참조 주소
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setBccAddresses(final List<String> bccAddresses) {
            this.singleEmailMessage.setBccAddresses(bccAddresses);
            return this;
        }

        /**
         * 참조 주소 사용
         * @param ccAddresses 참조 주소
         *
         * @return this
         */
        public I2ComMailService.SingleEmail setCcAddresses(final List<String> ccAddresses) {
            this.singleEmailMessage.setCcAddresses(ccAddresses);
            return this;
        }

        public I2ComMailService.SingleEmail setCharset(final String characterSet) {
            this.singleEmailMessage.setCharset(characterSet);
            return this;
        }

        public I2ComMailService.SingleEmail setEntityAttachments(final List<String> ids) {
            this.singleEmailMessage.setEntityAttachments(ids);
            return this;
        }

        public I2ComMailService.SingleEmail setFileAttachments(final List<Messaging.EmailFileAttachment> fileNames) {
            this.singleEmailMessage.setFileAttachments(fileNames);
            return this;
        }

        public I2ComMailService.SingleEmail setInReplyTo(final String parentMessageIds) {
            this.singleEmailMessage.setInReplyTo(parentMessageIds);
            return this;
        }

        public I2ComMailService.SingleEmail setSenderDisplayName(final String senderDisplayName) {
            this.singleEmailMessage.setReplyTo(senderDisplayName);
            return this;
        }

        public I2ComMailService.SingleEmail setReplyTo(final String replyAddress) {
            this.singleEmailMessage.setReplyTo(replyAddress);
            return this;
        }

    }

}