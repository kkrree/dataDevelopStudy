/****************************************************************************************
 * @filename      : lacComServiceHelper.js
 * @projectname   :
 * @author        : I2MAX
 * @date          : 2021-01-04 오전 9:20
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
   0.1     2021-01-04 오전 9:20     I2MAX          Create
 ****************************************************************************************/
({
    /**
     * Object list를 넘기면 해당하는 object의 label정보를 가져옴 (다국어 지원)
     *
     * @param component
     * @param event
     */
    fn_getMultiSObjectLabel : function (component, event) {
        const params = event.getParam('arguments');
        let callback;
        if (params) {
            callback = params.callback;
        }

        this.apex(
            component, 'fn_getMultiSObjectLabel', 'getMultiSObjectLabel', {'targetObjectList': params.targetObjectList}, true
        ).then(({resData}) => {
            callback(resData);
        }).catch(({error}) => {
            this.gfn_ApexErrorHandle(error);
        });
    },

    /**
     * Single Table excel export
     * row data 기반으로 excel export하는 기능
     * checkbox 혹은 button 등은 내려가지 않음
     * 그 외 복잡한 작업은 별도 개발 필요
     *
     * @param component
     * @param event
     */
    fn_csvExport : function (component, event) {
        const params = event.getParam('arguments');

        let table = params.cmp.find(params.tableName).getElement();
        let tableContent = table.innerHTML.replace(/<(\/a|a)([^>]*)>/gi,"");

        let utf8Heading = "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">";
        let uri = 'data:application/vnd.ms-excel;base64;chartset=UTF-8,';
        let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' + utf8Heading + '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

        let base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        let format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        };

        let ctx =  {
            worksheet: name || 'Worksheet',
            table: tableContent,
        };

        let a = document.createElement("a");
        a.href = uri + base64(format(template, ctx));
        a.download = params.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    /**
     *
     * @param component
     * @param event
     */
    fn_csvExportWithData : function (component, event) {
        // method 파라미터
        const params = event.getParam('arguments');
        // tbody 매핑 callback 함수
        const callback = params.callback;
        // 데이터 레코드
        const recordList = params.recordList || params.cmp.get('v.recordList');
        // table의 thead에서 바로 가지고 옴.
        let thead = document.createElement("THEAD");

        //--------------------------------------------------------
        // thead 구성
        //--------------------------------------------------------
        if(params.theadList) {
            let theadList = params.theadList;
            theadList = $A.util.isArray(theadList) ? theadList : [theadList];

            theadList.forEach(function(item){
                let th = document.createElement("TH");
                th.innerText = item;
                thead.appendChild(th);
            });
        }
        else {
            let theadAuraId = params.theadAuraId || 'dataThead'
            thead = params.cmp.find(theadAuraId).getElement();
        }

        //--------------------------------------------------------
        // tbody 구성
        //--------------------------------------------------------

        let tbody = document.createElement("TBODY");

        recordList.forEach((item) => {
            tbody.appendChild(callback(item));
        });

        let table = document.createElement("TABLE");
        table.appendChild(thead);
        table.appendChild(tbody);

        //--------------------------------------------------------
        // 파일 다운로드
        //--------------------------------------------------------

        let utf8Heading = "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">";
        let uri = 'data:application/vnd.ms-excel;base64;chartset=UTF-8,';
        let template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' + utf8Heading + '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

        let base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        let format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        };

        let ctx =  {
            worksheet: name || 'Worksheet',
            table: table.innerHTML,
        };

        let a = document.createElement("a");
        a.href = uri + base64(format(template, ctx));
        a.download = params.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    /**
     * Multi Table excel export
     * row data 기반으로 excel export하는 기능
     * checkbox 혹은 button 등은 내려가지 않음
     * 그 외 복잡한 작업은 별도 개발 필요
     *
     * @param component
     * @param event
     */
    fn_csvMultiExport : function (component, event) {
        const params = event.getParam('arguments');

        let tableContent = '';
        params.tableNames.forEach(function(tableName){
            tableContent += '<table>'+params.cmp.find(tableName).getElement().innerHTML+'</table><br/>';
        });

        let utf8Heading = "<meta http-equiv=\"content-type\" content=\"application/vnd.ms-excel; charset=UTF-8\">";
        let uri = 'data:application/vnd.ms-excel;base64;chartset=UTF-8,';
        let template =  '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' + utf8Heading +
            '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>' +
            '<body>{tables}</body></html>';

        let base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        let format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        };

        let ctx =  {
            worksheet: name || 'Worksheet',
            tables: tableContent,
        };

        let a = document.createElement("a");
        a.href = uri + base64(format(template, ctx));
        a.download = params.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});