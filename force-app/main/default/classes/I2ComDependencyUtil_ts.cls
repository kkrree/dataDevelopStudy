@IsTest
private class I2ComDependencyUtil_ts {
    @IsTest
    static void testBehavior() {
        I2ComDependencyUtil.getDependentOptions('Idea__c', 'Category1__c', 'Category2__c');
        I2ComDependencyUtil.getDependentPickListOptions('Idea__c', 'Category1__c', 'Category2__c', null, true, true);
        I2ComDependencyUtil.getDependentOptionsByOptionKey('Idea__c', 'Category1__c', 'Category2__c');

        I2ComDependencyUtil.TPicklistEntry tPicklistEntry = new I2ComDependencyUtil.TPicklistEntry();
        System.assertEquals(tPicklistEntry.active, null);
        System.assertEquals(tPicklistEntry.defaultValue, null);
    }
}