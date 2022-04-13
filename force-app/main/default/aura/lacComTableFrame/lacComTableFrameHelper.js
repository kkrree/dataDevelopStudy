/****************************************************************************************
 * @filename      : lacComTableFrameHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:57
 * @group         :
 * @group-content :
 * @description   :
 * @tester        :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date                    author        description
 * ===============================================================
   0.1     2021-01-04 오전 9:57     I2MAX          Create
 ****************************************************************************************/
({
    /**
     * 초기
     *
     * @param component
     */
    fn_init : function (component) {
        // 처음에 search가 호출되지 않는 경우를 대비
        component.set("v.isLastPage", true);
    },

    /**
     * 강제적 Reset
     *
     * @param component
     */
    fn_reset : function (component) {
        component.set("v.pageNumber", 1);
        component.set("v.pageSize", 20);
        component.set("v.resultSize", 0);
        component.set("v.totalSize", 0);
    },

    /**
     * 이전 페이지
     *
     * @param component
     * @param event
     */
    fn_prev : function (component, event) {
        this.fn_prevOrNext(component, component.get("v.pageNumber")-1)
    },

    /**
     * 다음 페이지
     *
     * @param component
     */
    fn_next : function (component) {
        this.fn_prevOrNext(component, component.get("v.pageNumber")+1)
    },

    /**
     * 이전/다음 페이지 처리
     *
     * @param comment
     * @param changedPageNumber
     */
    fn_prevOrNext : function(component, changedPageNumber) {
        // 검색조건
        const searchTerm = component.get("v.searchTerm");
        // 변경된 페이지번호 세팅
        component.set("v.pageNumber", changedPageNumber);
        // 로그 출력
        this.gfn_log(component, 'lacComTableFrame.onNext', null, component.get('v.isLogging'));
        // 이벤트 호출
        this.fn_fire(component, changedPageNumber, searchTerm);
    },

    /**
     * 페이지 번호 선택
     *
     * @param component
     * @param event
     */
    fn_move : function (component, event) {
        // 선택 된 페이지
        let selected = event.getSource().get('v.value');
        // 페이지 번호 설정
        component.set("v.pageNumber", selected);

        // 마지막 페이지 체크
        let totalSize = component.get('v.totalSize');
        let pageSize = component.get("v.pageSize");
        let pageLength = component.get('v.pageLength');

        if(Math.ceil(totalSize / pageLength) === selected){
            component.set("v.isLastPage", true);
        }else{
            component.set("v.isLastPage", false);
        }

        // 검색 조건
        let searchTerm = component.get("v.searchTerm");
        // 로그 출력
        this.gfn_log(component, 'lacComTableFrame.onMove', null, component.get('v.isLogging'));
        // 이벤트 호출
        this.fn_fire(component, selected, searchTerm);
    },

    /**
     * 넘어온 데이터를 정제하고 화면에 표시하는 역할
     *
     * @param component
     * @param event
     */
    fn_sortData : function (component, event) {
        let params = event.getParam('arguments');

        this.gfn_log(component, 'lacComTableFrame.doSortData' , {
            'params' : params,
        }, component.get('v.isLogging'));
        // 레코드 출력
        this.fn_getRecords(component, params);
    },

    /**
     * 레코드를 출력
     *
     * @param component
     * @param params
     */
    fn_getRecords : function(component, params) {
        if(params){

            let message = params.message;
            let pageSize = component.get("v.pageSize");
            let pageNumber = component.get("v.pageNumber");
            let resultSize = component.get("v.resultSize");
            let totalSize = component.get('v.totalSize');

            let isLastData = ((pageNumber-1)*pageSize+resultSize) === totalSize;

            // 레코드 수가 페이지 수보다 작거나 같으면 마지막 페이지
            if(message.length < pageSize || isLastData){
                component.set("v.isLastPage", true);
            } else{
                if(pageNumber === 1 && message.length === totalSize) {
                    component.set("v.isLastPage", true);
                }else {
                    component.set("v.isLastPage", false);
                }
            }

            // 숫자 페이징
            let isNumPaging = component.get('v.number');
            if(isNumPaging){
                let totalSize = component.get('v.totalSize');
                let pageLength = component.get('v.pageLength');
                let pageNumber = component.get("v.pageNumber");

                // =====================================
                // 출력되어야 하는 페이지 수를 계산한다
                // =====================================
                let pages = Math.ceil(totalSize / pageSize);

                // 보이는 페이지
                // 데이터가 출력되어야하는 페이지 수보다 많은 경우, 출력되어야 하는 페이지만 출력
                let temp = pages > pageLength ? pageLength : pages;
                let pageView = [];

                // 초반 페이지
                let interval = Math.floor(temp / 2);        // 3

                let first = pageNumber - interval;
                let last = pageNumber + interval;

                let i;
                if(first > 0){
                    // 페이지 변경이 필요한 경우
                    if(last <= pages){
                        for(i=0; i < temp; i++){
                            pageView.push(first+i);
                        }
                    }else{
                        first = pages - temp + 1;
                        for(i=0; i < temp; i++){
                            pageView.push(first+i);
                        }
                    }
                }else if(first <= 0){
                    // 페이지 변경이 필요없는 경우
                    for(i=0; i < temp; i++){
                        pageView.push(i+1);
                    }
                }

                component.set("v.pageView", pageView);

                // 로그 출력
                this.gfn_log(component, 'lacComTableFrame.fn_getRecords' , {
                    '메시지' : message,
                    '총 건' : totalSize,
                    '페이지 번호' : pageNumber,
                    '페이지 길이' : pageLength,
                    '페이지 사이즈' : pageSize,
                }, component.get('v.isLogging'));

            }else{
                // 로그 출력
                this.gfn_log(component, 'lacComTableFrame.fn_getRecords' , {
                    '메시지' : message,
                    '페이지 사이즈' : pageSize,
                }, component.get('v.isLogging'));
            }
            // 일반 페이징
            //var pageNumber = component.get("v.pageNumber").toString();
            // 결과 사이즈를 저장
            component.set("v.resultSize", message.length);

            /*
	        message.forEach(function(row) {
	           row.Id = row.Id+'-'+pageNumber;
	        });
            */

        }else{
            console.error('Not found params');
        }
    },

    /**
     * 이벤트를 호출
     *
     * @param component
     * @param pageNumber
     * @param searchTerm
     */
    fn_fire :  function(component, pageNumber, searchTerm) {
        let cmpEvent = component.getEvent("tableEvent");
        let apexCallMethodName = component.get('v.apexCallMethodName');
        let params = {
            'message' : {
                'pageSize' : component.get("v.pageSize"),
                'pageNumber' : pageNumber,
                'searchTerm' : searchTerm,
                'apexCallMethodName': apexCallMethodName
            }
        };

        cmpEvent.setParams(params);

        this.gfn_log(component, 'lacComTableFrame.fn_fire -> Com.util_Move', params, component.get('v.isLogging'));

        cmpEvent.fire();
    }
});