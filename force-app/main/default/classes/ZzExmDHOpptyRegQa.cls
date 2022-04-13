/**
 * Created by MS on 2021-03-23.
 */

public with sharing class ZzExmDHOpptyRegQa {

    //AccountList를 반환하는 메소드
    //param으로 name을 받아서 name에 해당하는 Account들만 반환


    public static List<Account> getAccount(String accName) {
        List<Account> accountsList = [
                SELECT
                        AccountNumber,
                        AccountSource,
                        Active__c,
                        AnnualRevenue,
                        BillingAddress,
                        BillingCity,
                        BillingCountry,
                        BillingGeocodeAccuracy,
                        BillingLatitude,
                        BillingLongitude,
                        BillingPostalCode,
                        BillingState,
                        BillingStreet,
                        CleanStatus,
                        CreatedById,
                        CreatedDate,
                        CustomerPriority__c,
                        DandbCompanyId,
                        Description,
                        DunsNumber,
                        Fax,
                        Id,
                        Industry,
                        IsDeleted,
                        Jigsaw,
                        JigsawCompanyId,
                        LastActivityDate,
                        LastModifiedById,
                        LastModifiedDate,
                        LastReferencedDate,
                        LastViewedDate,
                        MasterRecordId,
                        NaicsCode,
                        NaicsDesc,
                        Name,
                        NumberOfEmployees,
                        NumberofLocations__c,
                        OperatingHoursId,
                        OwnerId,
                        Ownership,
                        ParentId,
                        Phone,
                        PhotoUrl,
                        Rating,
                        ShippingAddress,
                        ShippingCity,
                        ShippingCountry,
                        ShippingGeocodeAccuracy,
                        ShippingLatitude,
                        ShippingLongitude,
                        ShippingPostalCode,
                        ShippingState,
                        ShippingStreet,
                        Sic,
                        SicDesc,
                        Site,
                        SLA__c,
                        SLAExpirationDate__c,
                        SLASerialNumber__c,
                        SystemModstamp,
                        TickerSymbol,
                        Tradestyle,
                        Type,
                        UpsellOpportunity__c,
                        Website,
                        YearStarted
                FROM Account
                WHERE Name = :accName
        ];
        return accountsList;
    }


}