/****************************************************************************************
 * @filename      : lwcComService
 * @author        : I2MAX
 * @date          : 2020-04-01
 * @group         :
 * @group-content :
 * @description   :
 * @tester        : lwcComService_Test.cls
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date            author         description
 * ===============================================================
   0.1     2020-04-01      I2MAX           Create
 ****************************************************************************************/
//import { loadScript } from 'lightning/platformResourceLoader';
//import lodash from '@salesforce/resourceUrl/lodash';

import {LwcComUtil} from 'c/lwcComUtil';

const LwcComService = {

    /**
     * Single Table csv export
     * checkbox 혹은 component 등의 그려지지 않는 data를 임의로 세팅해서 그려내는 기능
     * @param fileName
     * @param targetTheadList
     * @param customTheadList
     * @param recordList
     * @param callbackFn
     */
    exportCsvWithData : ({
                             fileName='csvfile',
                             targetTheadList=[],
                             customTheadList=null,
                             recordList=[],
                             callbackFn
                         }) => {

        // tbody 매핑 callback 함수
        const callback = callbackFn;

        let thead = document.createElement("THEAD");

        //--------------------------------------------------------
        // thead 구성
        //--------------------------------------------------------
        if(customTheadList) {
            let theadList = customTheadList;
            theadList = !LwcComUtil.ArrayUtil.isEmpty(theadList) ? theadList : [theadList];

            theadList.forEach((item) => {
                let th = document.createElement("TH");
                th.innerText = item;
                thead.appendChild(th);
            });
        }
        else {
            targetTheadList.forEach((item) => {
                let th = document.createElement("TH");
                th.innerText = item.innerHTML;
                thead.appendChild(th);
            });
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
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

export { LwcComService }