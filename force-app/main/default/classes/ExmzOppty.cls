/****************************************************************************************
  * @filename      : ExmzOppty
  * @projectname   : 
  * @author        : i2max
  * @date          : 2021-03-08
  * @group         : 
  * @group-content : 
  * @description   : 
  * @tester        : ExmzOppty_ts.cls
  * @reference     : 
  * @copyright     : Copyright © I2max. All Rights Reserved.
  * @modification Log
  * ===============================================================
  * ver     date            author         description
  * ===============================================================
    0.1     2021-03-08         i2max          Create
****************************************************************************************/
public without sharing class ExmzOppty {

    /**
     * 초기 세팅 및 기본 데이터 클래스
     * 기본적으로 I2ComClass.InitData를 extends 하여 동일한 InitData 명칭으로 내부클래스를 생성
     * 업무상 필요한 properties를 구성
     */
    public class InitData extends I2ComClass.InitData {
        @AuraEnabled public List<I2ComClass.Option> stageList {
            get{
                if(this.stageList == null) {
                    this.stageList = I2ComUtil.makePickListOptions('Opportunity', 'StageName', false, true);
                }
                return this.stageList;
            }
            set;
        }
    }

    /**
     * 기본 initialize 함수
     * @return I2ComClass.InitData
     */
    @AuraEnabled(Cacheable=true)
    public static I2ComClass.InitData init() {
        InitData initData = new InitData();
        return initData;
    }

    /**
     * 검색
     * case 1 : 기본적으로 search 메소드명을 사용한다.
     *
     * @param reqData request Data String
     * @param pageSize request page size
     * @param pageNumber request page number
     *
     * @return I2ComClass.ResData
     */
    @AuraEnabled
    public static I2ComClass.ResData search(Map<String,Object> reqData, Integer pageSize, Integer pageNumber){

        System.debug(System.LoggingLevel.INFO, reqData);

        String whereClause = '';
//        Map<String, String> reqData = I2ComHelper.gfnCheckCondition(reqData);

        if( reqData != null ){
            if(I2ComHelper.gfnHasCondition(reqData, 'name')) {
                final String name = String.escapeSingleQuotes((String)reqData.get('name'));

                whereClause += ' AND Name LIKE \'%' + name + '%\'' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'stage')) {
                whereClause += ' AND StageName = \'' + (String)reqData.get('stage') + '\'' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'accountId')) {
                whereClause += ' AND AccountId = \'' + (String)reqData.get('accountId') + '\'' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'isWon')) {
                whereClause += ' AND IsWon = ' + (String)reqData.get('isWon') + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'fromDt') && I2ComHelper.gfnHasCondition(reqData, 'toDt')) {
                whereClause += ' AND (CloseDate >= ' + (String)reqData.get('fromDt') + ' AND CloseDate <= ' + (String)reqData.get('toDt') + ')' + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'fromDt')) {
                whereClause += ' AND CloseDate >= ' + (String)reqData.get('fromDt') + '\n';
            }
            if(I2ComHelper.gfnHasCondition(reqData, 'toDt')) {
                whereClause += ' AND CloseDate <= ' + (String)reqData.get('toDt') + '\n';
            }
        }

        // where 조건절 추가
        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
            'Id,  Amount, Account.Name, CloseDate, Name, Probability, StageName, IsWon, Description ',
            'Opportunity',
            whereClause,
            'ORDER BY CloseDate DESC',
            pageSize,
            pageNumber
        );

        return resData;
    }

    /**
     * 검색
     * case 2 : 기본 search 메소드명이 아닌 다른 메소드명 호출 테스트
     * client controller 와 Name이 동일하면 안됨
     *
     * @param reqData request Data String
     * @param pageSize request page size
     * @param pageNumber request page number
     *
     * @return I2ComClass.ResData
     */
    @AuraEnabled
    public static I2ComClass.ResData getSearch(Map<String, Object> reqData, Integer pageSize, Integer pageNumber){
        return search(reqData, pageSize, pageNumber);
    }

    /**
     * 검색
     * @param pageSize request page size
     * @param pageNumber request page number
     *
     * @return I2ComClass.ResData
     */
    @AuraEnabled
    public static I2ComClass.ResData searchWithLineItems(Integer pageSize,Integer pageNumber){
        I2ComClass.ResData resData = I2Comhelper.gfnQuery(
            'Id,Name,(SELECT Id FROM OpportunityLineItems) ',
            'Opportunity',
            null,
            'ORDER BY CloseDate DESC',
            pageSize,
            pageNumber
        );

        return resData;
    }
    /**
     * LineItem 조회
     *
     * @param opportunityId opportunity Id
     *
     * @return List<OpportunityLineItem>
     */
    @AuraEnabled
    public static List<OpportunityLineItem> searchLineItems(String opportunityId){
        return [SELECT Id, Name, OpportunityId, Product2Id,Quantity,UnitPrice,TotalPrice
                    FROM OpportunityLineItem
                    WHERE OpportunityId =:opportunityId
                    ORDER BY SortOrder ASC];
    }
    /**
     * LineItem 수정
     *
     * @param lineItems List<OpportunityLineItem>
     */
    @AuraEnabled
    public static void upsertLineItems(List<OpportunityLineItem> lineItems){

        // Opportunity Price Book 설정 & PriceBook Entry 설정
        Id standardPriceBookId = [SELECT Id FROM Pricebook2 WHERE IsStandard = TRUE]?.Id;

        Map<Id,Opportunity> opportunities = new Map<Id,Opportunity>();
        for( OpportunityLineItem lineItem : lineItems ){
            if( !opportunities.containsKey(lineItem.OpportunityId) ){
                opportunities.put(lineItem.OpportunityId , new Opportunity(Id=lineItem.OpportunityId , Pricebook2Id=standardPriceBookId));
            }
        }
        update opportunities.values();

        upsert lineItems;
    }

    /**
     * Line Item 삭제
     *
     * @param lineItemId lineItem Id
     */
    @AuraEnabled
    public static void deleteLineItem(Id lineItemId){
        delete new OpportunityLineItem(Id=lineItemId);
    }


    /**
     * Opportunity 상세 조회
     *
     * @param opportunityId
     * @return opportunity
     */
    @AuraEnabled
    public static Opportunity getOpportunity(String opportunityId){
        return [SELECT Id,Name,StageName,AccountId,Amount,CloseDate,Probability
                    FROM Opportunity
                WHERE Id =: opportunityId] ?.get(0);
    }

    /**
     * ID 를 통한 목록조회
     *
     * @param recordIds Opportunity Id List
     * @return List<Opportunity>
     */
    @AuraEnabled
    public static List<Opportunity> searchByIds(List<String> recordIds){
        return [SELECT Id,Name,Description FROM Opportunity WHERE Id IN:recordIds];
    }

    @AuraEnabled
    public static void updateOpportunity(Opportunity record){
        ExmzOppty.updateOpportunities( new List<Opportunity>{record} );
    }

    /**
     * Opportunity 목록 업데이트
     * @param records Opportunity List
     */
    @AuraEnabled
    public static void updateOpportunities(List<Opportunity> records){
        update records;
    }

    /**
     * 설명
     *
     * @param recordId
     *
     * @return
     */
    @AuraEnabled(Cacheable=true)
    public static Opportunity getRecord(Id recordId){

        if(false) throw new AuraHandledException('에러가 발생..');

        Opportunity opportunity = [
            SELECT  Id,  Amount, Account.Name, CloseDate, Name, Probability, StageName, IsWon
            FROM Opportunity
            WHERE Id = :recordId
        ];
        return opportunity;
    }

}