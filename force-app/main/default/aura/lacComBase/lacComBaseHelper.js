/****************************************************************************************
 * @filename      : lacComBaseHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2020-12-29 오전 7:37
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
 0.1     2020-12-29 오전 7:37       I2MAX          Create
 ****************************************************************************************/
({
    /* =============================================================================
    === 기본 Global 변수
    ============================================================================= */

    /**
     * 공통 페이지의 기본 사이즈
     */
    default_page_size : 20,     // 페이지의 기본 사이즈

    /**
     * 공통 페이지의 기본 번호
     */
    default_page_number : 1,    // 페이지의 기본 번호

    /**
     * 공통 파일다운로드 Servlet Url : contentVersion
     */
    contentVersion_servlet_downlaod : '/sfc/servlet.shepherd/version/download/',

    /**
     * 공통 파일다운로드 Servlet Url : contentDocument
     */
    contentDocument_servlet_downlaod : '/sfc/servlet.shepherd/document/download/',

    /* =============================================================================
    === Component and Biz
    ============================================================================= */

    /**
     * Server Apex Call
     * @param component
     * @param actionName
     * @param method
     * @param params
     * @param localSpinner
     * @param isNotWorkSpinner
     * @returns {Promise}
     */
    apex: function(component, actionName, method, params, isNotWorkSpinner=false) {
        const self = this;

        //-------------------------------------------------------------
        // $A.getCallback 처리를 하여 속도 개선 : 중요
        //-------------------------------------------------------------

        return new Promise($A.getCallback((resolve, reject) => {

            this.gfn_log(component, actionName + ' -> ' + method +'(server)' , {'params': params}, component.get('v.isLogging'));

            const action = component.get("c." + method);

            if($A.util.isEmpty(params) === false) {
                action.setParams(params);
            }

            //-------------------------------------------------------------
            // Apex Server Call
            //-------------------------------------------------------------
            action.setCallback(this, (response) => {

                if(!isNotWorkSpinner) {
                    this.gfn_hideSpinner(component, isNotWorkSpinner);
                }

                const state = response.getState();

                if (state === "SUCCESS") {
                    let resData = response.getReturnValue();
                    this.gfn_log(component, method + '(server) -> ' + actionName , {'resData': JSON.parse(JSON.stringify(resData))}, component.get('v.isLogging'));

                    resolve({resData, response});
                }
                else if (state === "INCOMPLETE") {
                    // do something
                }
                else if (state === "ERROR") {
                    const errors = response.getError();

                    console.error(errors);

                    if (    ($A.util.isEmpty(errors) === false)
                        &&  ($A.util.isEmpty(errors[0]) === false)  ) {

                        let errorMessage;

                        //-------------------------------------------------------------
                        // 에러처리는 기본적으로 errors의 0 index만 노출
                        //-------------------------------------------------------------

                        //----------------------------------------------------
                        // basic error
                        //----------------------------------------------------
                        if ($A.util.isEmpty(errors[0].message) === false){
                            errorMessage = errors[0].message;
                        }
                        //----------------------------------------------------
                        // page error
                        //----------------------------------------------------
                        else if ($A.util.isEmpty(errors[0].pageErrors[0]) === false){
                            errorMessage = errors[0].pageErrors[0].message;
                        }
                        //----------------------------------------------------
                        // field error
                        //----------------------------------------------------
                        else if ($A.util.isEmpty(errors[0].fieldErrors) === false){
                            for(let fieldError in errors[0].fieldErrors) {
                                let thisFieldError = errors[0].fieldErrors[fieldError];
                                errorMessage = thisFieldError[0].message;
                            }
                        }
                        //----------------------------------------------------
                        // duplication error
                        //----------------------------------------------------

                        //----------------------------------------------------
                        // 공통 처리
                        //----------------------------------------------------
                        this.gfn_log(component, method + '(server) -> '+actionName , {'error' : errorMessage}, component.get('v.isLogging'));
                        reject({'error':errorMessage, 'response':response});
                    }
                    else{
                        console.error("Unknown error");
                        reject({'error':"Unknown error", 'response':response});
                    }
                }
            });

            if(!isNotWorkSpinner) {
                this.gfn_showSpinner(component, isNotWorkSpinner);
            }

            $A.enqueueAction(action);
        }));
    },

    /**
     * spinner 보임
     * @param component
     * @param localSpinner
     */
    gfn_showSpinner : function(component, isNotWorkSpinner){
        !isNotWorkSpinner && component.set('v.isSpinner', true);
    },

    /**
     * spinner 숨김
     * @param component
     * @param localSpinner
     */
    gfn_hideSpinner : function(component, isNotWorkSpinner){
        !isNotWorkSpinner && component.set('v.isSpinner', false);
    },

    /**
     * 공통 동적 다중 컴포너트 생성
     * @param component : component
     * @param componentNameList : String or Array(String)
     * @param paramList : Object or Array(Object)
     * @param cssClass : String
     * @param isTargetComponent : Boolean
     */
    gfn_createComponents : function(component, componentNameList, paramList, cssClass=null, isTargetComponent=false) {
        let targetList = [];
        let modalHeader, modalContent, modalFooter;

        componentNameList = $A.util.isArray(componentNameList) ? componentNameList : [componentNameList];
        paramList = $A.util.isArray(paramList) ? paramList : [paramList];

        componentNameList.forEach((componentName, index) => {
            targetList.push([
                "c:"+componentName,
                paramList[index]
            ])
        });

        return new Promise((resolve, reject) => {
            $A.createComponents(
                targetList,
                $A.getCallback((components, status, errorMessage) => {
                        if (status === "SUCCESS") {
                            // Modal layer pop up
                            if(!isTargetComponent) {
                                modalContent = components[0];
                                //============================================================================
                                // showCustomModal, showCustomPopover 은 promise 객체를 리턴한다.
                                //============================================================================
                                const modalPromise = component.find('overlayLib').showCustomModal({
                                    body: modalContent,
                                    showCloseButton: true,
                                    cssClass: cssClass,
                                    closeCallback: function () {

                                    }
                                }).then(function (overlay) {

                                });
                            }
                            else {
                                resolve({components});
                            }
                        }
                        else {
                            if (status === "INCOMPLETE") {
                                console.error("No response from server or client is offline.");
                            }
                            else if (status === "ERROR") {
                                console.log(JSON.stringify(errorMessage));
                                console.error("Error: " + errorMessage);
                            }
                        }
                    }
                )
            );
        });
    },

    /**
     * QuickAction 닫음 : Detail 의 버튼에서 생성되는 QuickAction을 닫음
     * 일반화면에서 생성되는 QuickAction 과는 분리되어야 함
     * (Com_QuickAction 컴포넌트에 닫기 Controller 별도 구현되어 있음)
     *
     */
    gfn_closeQuickAction: function(){
        this.g_closeQuickAction.fire();
    },

    g_closeQuickAction: null,

    /**
     * 공통 modal layer popup 닫음
     * @param component
     */
    gfn_closeQuickActionModal : function (component) {
        component.find("overlayLib").notifyClose();
    },

    /**
     * 공통 에러처리
     * apex 호출외 callback 처리시 및 기본 js 에러 처리
     * @param error
     */
    gfn_ApexErrorHandle : function(error) {
        let errors = $A.util.isArray(error) || [error];
        let errorMessages = errors.filter(error => !!error).map(function(error) {
            // UI API read errors
            if ($A.util.isArray(error.body)) {
                return error.body.map(function(e) { return e.message; });
            }
            // UI API DML, Apex and network errors
            else if (error.body && typeof error.body.message === 'string') {
                return error.body.message;
            }
            // JS errors
            else if (typeof error.message === 'string') { return error.message; }
            // Unknown error shape so try HTTP status text
            return error.statusText || error;
        }).filter(function(message) { return  !!message; });

        let toastErrorMessage = errorMessages.join(', ');

        //============================================================================
        // log 처리와 toast 처리
        //============================================================================
        console.error(toastErrorMessage);
        this.gfn_toast(toastErrorMessage, 'e');
    },

    /**
     * 공통 base 컴포넌트 init 처리
     * @param component
     */
    gfn_init : function (component) {
        component.set('v.isCommunity', this.gfn_isCommunitySite());
    },

    /**
     * 공통 table list 거래 처리
     * @param component
     * @param event
     */
    gfn_movePage : function (component, event) {
        const message = event.getParam("message");

        //-------------------------------------------------------------
        // 이벤트 메시지 로깅
        //-------------------------------------------------------------
        this.gfn_log(component, 'gfn_movePage: message : ', message);

        //-------------------------------------------------------------
        // Server Apex의 Method를 search 로 고정
        //-------------------------------------------------------------
        this.apex(component, 'gfn_movePage', message.apexCallMethodName, {
            // message의 searchTerm 을 reqData key로 사용
            'reqData' : JSON.stringify(message.searchTerm),
            'pageSize' : message.pageSize,
            'pageNumber' : message.pageNumber
        }).then(({resData}) => {
            // resData 전체 세팅
            component.set("v.resData", resData);
            // resData의 recordList만 세팅
            if($A.util.isEmpty(resData.recordList)){
                component.set("v.recordList", resData);
                this.gfn_callPageFrame(component, resData);
            }
            else {
                component.set("v.recordList", resData.recordList);
                this.gfn_callPageFrame(component, resData.recordList, resData.totalSize);
            }
        }).catch(({error}) => {
            this.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * 공통 파라미터 설정
     * @param component
     * @param pageSize
     * @param pageNumber
     * @param tableId
     * @returns {{reqData: string, pageNumber: (gfn_param.default_page_number), pageSize: (gfn_param.default_page_size)}}
     */
    gfn_param : function(component, pageSize, pageNumber, tableId){

        // table의 auraId 구함
        const tableAuraId = $A.util.isEmpty(tableId) ? 'table' : tableId;

        if(pageSize !== this.default_page_size){
            component.find(tableAuraId).set('v.pageSize', pageSize);
        }

        component.find(tableAuraId).set('v.pageSize', pageSize);

        // 공통은 reqData로 요청데이터 작성
        const reqData = Object.assign({}, component.get('v.reqData'));

        // table은 searchTerm 을 그대로 변수로 사용
        component.find(tableAuraId).set('v.searchTerm', reqData);

        return {
            'reqData' : JSON.stringify(reqData),
            'pageSize' : $A.util.isEmpty(pageSize) ? this.default_page_size : pageSize,
            'pageNumber' : $A.util.isEmpty(pageNumber) ? this.default_page_number : pageNumber
        };
    },

    /**
     * 기본 table aura:id
     */
    defaultTableId : 'table',

    /**
     * 공통 검색 거래
     * @param component
     * @param pageSize
     * @param pageNumber
     * @param tableId
     * @param apexCallMethodName
     */
    gfn_search : function(component, pageSize, pageNumber, tableId, apexCallMethodName){
        const self = this;
        const _tableId = $A.util.isEmpty(tableId) ? this.defaultTableId : tableId;
        const _apexCallMethodName = $A.util.isEmpty(apexCallMethodName) ? component.find(_tableId).get('v.apexCallMethodName') : apexCallMethodName;

        this.apex(
            component, 'gfn_search', _apexCallMethodName, this.gfn_param(component, pageSize, pageNumber, _tableId)
        ).then(({resData}) => {
            // const resObject = resObj;
            // 전체 데이터 resData 세팅
            component.set("v.resData", resData);
            // lacComBase에 선언되어있는 recordList 활용
            component.set("v.recordList", resData.recordList);
            $A.util.isEmpty(resData.recordList) && this.gfn_toast('No Data Found.', 'w');
            // ===============================================
            // 페이징 처리를 위해서 이벤트를 호출한다
            // ===============================================
            this.gfn_callPageFrame(component, resData.recordList, resData.totalSize, _tableId);
        }).catch(function ({error}) {
            this.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * Table 관련 리스트 데이터 및 페이징 처리
     * @param component
     * @param result
     * @param size
     */
    gfn_callPageFrame : function(component, result, size, tableId) {
        this.gfn_log(component, 'lacComBase.callPageFrame' , {'설명' : 'table의 doSortData 메소드 호출'}, component.get('v.isLogging'));
        const tableAuraId = $A.util.isEmpty(tableId) ? this.defaultTableId : tableId;
        const table = component.find(tableAuraId);
        table.set('v.totalSize', $A.util.isEmpty(result) ? 0 : size);
        table.doSortData(result);
    },

    /**
     * tableFrame의 pageNumber 등을 초기화한후 처리를 위한 promise
     * @param component
     * @param tableId
     * @returns {Promise}
     */
    gfn_pageFrameReset : function (component, tableId, apexCallMethodName) {
        const _tableId = $A.util.isEmpty(tableId) ? 'table' : tableId;
        const tableFrame = component.find(_tableId);

        tableFrame.reSet();

        if(!$A.util.isEmpty(apexCallMethodName)) {
            tableFrame.set('v.apexCallMethodName', apexCallMethodName);
        }

        return new Promise($A.getCallback((resolve, reject) => {
            if(resolve) {
                //resolve(_tableId, tableFrame.get('v.apexCallMethodName'));
                resolve({tableId: _tableId, apexCallMethodName: tableFrame.get('v.apexCallMethodName')});
            }
            if(reject) {
                reject();
            }
        }));
    },

    /* =============================================================================
    === Message and toast
    ============================================================================= */

    /**
     * 공통 toast 호출
     * @param msg   : message
     * @param type  : dismissible, pester, sticky
     * @param mode  : s, w, e
     */
    gfn_toast : function(msg, type, mode){
        const toastEvent = $A.get("e.force:showToast");
        $A.get("e.force:showToast").setParams({
            "mode" : $A.util.isEmpty(mode) ? 'dismissible' : mode,
            "message": msg,
            "type": type === 's' ? 'success' : (type === 'w' ? 'warning' : 'error')
        }).fire();
    },

    /* =============================================================================
    // 각각의 localSpinner를 사용할 경우 show / hide
    // aura:id 를 localSpinner 로 설정할 것
    ============================================================================= */

    /**
     * 공통 localSpinner 숨김
     * @param component
     */
    gfn_localSpinnerHide : function (component) {
        $A.util.addClass(component.find("localSpinner"), "slds-hide");
    },

    /**
     * 공통 localSpinner 보임
     * @param component
     */
    gfn_localSpinnerShow : function (component) {
        $A.util.removeClass(component.find("localSpinner"), "slds-hide");
    },

    /* =============================================================================
    === URL
    ============================================================================= */

    /**
     * /s/를 제외한 이전 full url 구함
     * @returns {string}
     */
    gfn_getSiteUrlFromWindowLocation : function() {
        const tlocation = window.location.toString();
        const url = tlocation.substr(0,tlocation.indexOf('/s/'));
        return url;
    },

    /**
     * 커뮤니티 사이트 여부
     * @returns {boolean}
     */
    gfn_isCommunitySite : function() {
        return new RegExp("/s/").test(window.location.toString());
    },

    /**
     * QuickAction에서 메인 페이지의 url을 재호출할 경우 사용
     */
    gfn_refresh : function(){
        $A.get('e.force:refreshView').fire();
    },

    /* =============================================================================
    === Util
    ============================================================================= */

    /**
     * 공통 로그 유틸 : 내부(공통 컴포넌트 helper)에서만 사용할 것임.
     * [유의]일반 업무 로그는 아래의 log를 사용할 것
     * @param component
     * @param functionName
     * @param log
     * @param display
     */
    gfn_log : function(component, functionName, log, display){
        const isShow = $A.util.isEmpty(display) ? true : display;

        if(isShow){
            console.group('%c======================= ' + component.getName(), 'color:green');
            console.group('%cfunction : ' + functionName, 'color:blue');

            console.info('%ctype', 'color:red', component.getType());

            for (let key in log) {
                console.info('%c'+key, 'color:red', log[key]);
            }

            console.groupEnd();
            console.groupEnd();
        }
    },

    /**
     * 공통 console.log 대용
     * 전체적으로 운영에서 console log를 제어하기 위한 wrapper function
     * 간단히 사용하기 위해 log 라는 함수를 바로 사용함.
     * using : helper.log(component, ...args);
     *       : helper.log(component, 'hello', object);
     * @param component
     */
    log: function (component) {
        if(component.get('v.isLogging')) {
            const realArgs = Array.from(arguments).slice(1);
            console.log(...realArgs);
        }
    }
});