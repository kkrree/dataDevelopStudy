/****************************************************************************************
  * @filename      : TestDataBaseFactory
  * @author        : I2MAX
  * @date          : 2021-01-15 오후 1:18
  * @group         :
  * @group-content :
  * @description   : 
  * @reference     :
  * @release       : v1.0.0
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date                     author            description
  * ===============================================================
    0.1     2021-01-15 오후 1:18      I2MAX               Create
****************************************************************************************/
@IsTest
public class TestDataBaseFactory {

    public static void init() {}

    /**
     * Account Test Data
     *
     * @param isInsert : Boolean
     *
     * @return Account
     */
    public static Account createAccount(final Boolean isInsert) {
        Account account = new Account();

        account.Name = 'businessOfficeAccount';

        if(isInsert)    insert account;

        return account;
    }

    public static Account baseAccount {get;set;}

    static {
        baseAccount = createAccount(true);
    }

    /**
     * Contact Test Data
     *
     * @param isInsert : Boolean
     *
     * @return Contact
     */
    public static Contact createContact(final Boolean isInsert) {
        Contact contact = new Contact();

        contact.LastName = 'testContact';

        if(isInsert)    insert contact;

        return contact;
    }

    public static Contact baseContact {get;set;}

    static {
        baseContact = createContact(true);
    }
}