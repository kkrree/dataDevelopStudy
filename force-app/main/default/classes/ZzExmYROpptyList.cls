/**
 * Created by MS on 2021-03-24.
 */

public with sharing class ZzExmYROpptyList {
    /**
     * 초기 세팅 및 기본 데이터 클래스
     * 기본적으로 I2ComClass.InitData를 extends 하여 동일한 InitData 명칭으로 내부클래스를 생성
     * 업무상 필요한 properties를 구성
     */
    public class InitData extends I2ComClass.InitData {
//        @AuraEnabled public List<I2ComClass.Option> stageList {
//            get{
//                if(this.stageList == null) {
//                    this.stageList = I2ComUttil.makePickListOptions('Opportunity', 'StageName', false, true);
//                }
//                return this.stageList;
//            }
//            set;
//        }
    }

    /**
     * 기본 initialize 함수
     * @return I2ComClass.InitData
     */
    @AuraEnabled
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
    public static I2ComClass.ResData search(String reqData, Integer pageSize, Integer pageNumber){

        System.debug(System.LoggingLevel.INFO, reqData);

        String whereClause = '';
        Map<String, String> paramMap = I2ComHelper.gfnCheckCondition(reqData);

        if(I2ComHelper.gfnHasCondition(paramMap, 'name')) {
            final String name = String.escapeSingleQuotes(paramMap.get('name'));

            whereClause += ' AND Name LIKE \'%' + name + '%\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'stage')) {
            whereClause += ' AND StageName = \'' + paramMap.get('stage') + '\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'accountId')) {
            whereClause += ' AND AccountId = \'' + paramMap.get('accountId') + '\'' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'isWon')) {
            whereClause += ' AND IsWon = ' + paramMap.get('isWon') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt') && I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
            whereClause += ' AND (CloseDate >= ' + paramMap.get('fromDt') + ' AND CloseDate <= ' + paramMap.get('toDt') + ')' + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'fromDt')) {
            whereClause += ' AND CloseDate >= ' + paramMap.get('fromDt') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'toDt')) {
            whereClause += ' AND CloseDate <= ' + paramMap.get('toDt') + '\n';
        }
        if(I2ComHelper.gfnHasCondition(paramMap, 'ownerId')) {
            whereClause += ' AND OwnerId <= ' + paramMap.get('ownerId') + '\n';
        }

        // where 조건절 추가
        whereClause = I2ComHelper.gfnRefineCondition(whereClause);

        I2ComClass.ResData resData = I2ComHelper.gfnQuery(
                'Id,  Amount, Account.Name, CloseDate, Name, Probability, StageName, IsWon, Owner.Name ',
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
    public static I2ComClass.ResData getSearch(String reqData, Integer pageSize, Integer pageNumber){
        return search(reqData, pageSize, pageNumber);
    }
}