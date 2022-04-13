/**
 * Created by MS on 2021-03-24.
 */

({
    fn_init : function (component, event, helper) {
            // 다국어 처리.
            this.lacComService.doGetMultiSObjectLabel(['Opportunity', 'Account'], (resData) => {
                component.set('v.labelMap', resData);
            });

            // 기본 서버 통신.
            this.apex(
                component, 'doInit', 'init', null
            ).then(({resData}) => {
                component.set('v.initData', resData);

                this.fn_initSearch(component);

                this.fn_search(component, event, helper);
            }).catch(({error}) => {
                this.gfn_ApexErrorHandle(error);
            });
        },

        /**
         * reqData 초기화
         *
         * @param component
         */
        fn_initSearch : function(component) {
            component.set('v.reqData.pageSize', '10');

            // 검색조건 초기화
            component.set('v.reqData.stage', '');
            component.set('v.reqData.accountId', '');
            component.set('v.reqData.isWon', false);
            component.set('v.reqData.fromDt', '');
            component.set('v.reqData.toDt', '');
            component.set('v.reqData.name', '');
        },

        /**
         * search
         *
         * @param component
         * @param event
         * @param helper
         */
        fn_search : function (component, event, helper) {
            const self = this;

//            if (component.find('fromDt').get('v.value') > component.find('toDt').get('v.value')) {
//                this.gfn_toast('시작 날짜가 종료 날짜보다 클 수 없습니다.', 'w');
//                return;
//            }


            // component.get('v.reqData').accountId = component.find('accountId').get('v.value');

            //------------------------------------------------------------------------------
            //------------------------------------------------------------------------------
            // 기본 : table + search 인 경우
            // 그외 : 다른 aura:id와 apex 호출명을 가질 경우
            // 위 2개의 경우처리
            //------------------------------------------------------------------------------
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            // aura:id = table 과 apexCallMethodName = search 명을 가진 apex 메소드를 호출(기본)
            //------------------------------------------------------------------------------
            /*
                    helper.gfn_pageFrameReset(component)
                    .then(function (params) {
                        return helper.gfn_search(component, 15, 1);
                    }).catch(function (error) {
                        helper.gfn_ApexErrorHandle(error);
                    });
            */

            //------------------------------------------------------------------------------
            // aura:id 가 table 외 다른명과 apexCallMethodName 가 search 외 다른 apex 메소드를 호출 하는 경우
            // 예제는 그냥 'table'을 사용
            //------------------------------------------------------------------------------
            this.gfn_pageFrameReset(component, 'table', 'getSearch')
                .then(function (params) {
                    return self.gfn_search(
                        component,
                        10,
//                        component.find('select').get('v.value'),
                        1,
                        params.tableId,
                        params.apexCallMethodName);
                }).catch(function (error) {
                    this.gfn_ApexErrorHandle(error);
                });``
        },

        /**
         * 해당 record로 이동
         *
         * @param component
         * @param event
         */
        fn_naviService : function (component, event) {
            const dataset = event.currentTarget.dataset;

            this.lacComNaviService.doNaviStdRecordPage(dataset.recordid, 'view', 'Opportunity');
        },

        fn_opptyReg : function (component) {
            this.gfn_createComponents(component, 'exmOpptyRegQa', null, 'slds-modal_medium');
        },

        /**
         * multi save QA
         *
         * @param component
         */
        fn_multiSave : function (component) {
            this.gfn_createComponents(component, 'exmOpptyMultiEditQa', null, 'slds-modal_medium');
        },

        /**
         * html to Csv file
         *
         * @param component
         */
        fn_excel : function (component) {

            /*
             * ===================================================================
             * 화면상의 html table을 그대로 생성인 경우(데이터만 존재시)
             * ===================================================================
             */
            // this.lacComService.doCsvExport(component, 'dataTable', 'opptyTable');

            /*
             * ===================================================================
             * 동적으로 element를 생성하여 동적 매핑 생성인 경우
             * ===================================================================
             */

            //------------------------------------------------------------------------
            // 기본
            //------------------------------------------------------------------------
            const theadList = null;
            const recordList = null;
            const theadAuraId = null

            //------------------------------------------------------------------------
            // 데이터를 넘김
            //------------------------------------------------------------------------
    /*
            const theadList = ['Name', 'Stage', 'Account Name', 'Amount', 'Probability (%)', 'Close Date', 'Won'];
            const recordList = component.get('v.recordList');
            const theadAuraId = 'dataThead'
    */

            this.lacComService.doCsvExportWithData(
                component, 'mytest', theadList, 'dataThead', recordList, this.fn_callback
            );

        },

        /**
         * CSV 매핑 로직 콜백
         *
         * @param record
         * @returns {HTMLElement}
         */
        fn_callback: function(record) {
            let tr = document.createElement("TR");

            let td = document.createElement("TD");
            td.innerText = record['Name'] || '' ;
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['StageName'] || '' ;
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['Account'] ? record['Account']['Name'] : '';
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['Amount'] || '';
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['Probability'] || '';
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['CloseDate'] || '';
            tr.appendChild(td);

            td = document.createElement("TD");
            td.innerText = record['IsWon'] ? 'Y' : 'N';
            tr.appendChild(td);

            return tr;
        },

        /**
         * toast
         */
        fn_click : function () {
            this.gfn_toast('업무별 Action', 's');
        }
});