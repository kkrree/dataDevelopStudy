/****************************************************************************************
 * @filename      : lwcUfwTableFrame
 * @author        : I2MAX
 * @date          : 2020-04-01
 * @group         :
 * @group-content :
 * @description   :
 * @reference     :
 * @release       : v1.0.0
 * @copyright     : Copyright © I2max. All Rights Reserved.
 * @modification Log
 * ===============================================================
 * ver     date               author         description
 * ===============================================================
   1.0     2020-04-01         I2MAX            Create
 ****************************************************************************************/
import { api, track, wire } from 'lwc';
import { LwcUfwBase } from 'c/lwcUfwBase';

export default class LwcUfwTableFrame extends LwcUfwBase {

    //==================================================================
    // 바로 사용하지 말고 항상 객체를 생성하여 사용할 것
    //==================================================================
    _reqData = this.ApexUtil.createSearchReqParams();

    @api pageNumber = this._reqData.pageNumber;
    @api pageSize   = this._reqData.pageSize;
    @api totalSize  = 0;
    @api recordSize = 0;
    @api scrollHeight;

    get height() {
        return (this.PropertyUtil.isEmpty(this.scrollHeight)) ? '' : 'height:' + this.scrollHeight + 'px';
    }

    get fromOffSize() {
        return ((this.pageNumber-1)*this.pageSize) + (this.recordSize === 0 ? 0 : 1);
    }

    get toOffSize() {
        const offLen = (((this.pageNumber-1)*this.pageSize) + this.recordSize);
        return offLen >= this.totalSize ? this.totalSize : offLen;
    }

    /**
     * 페이지 길이(조회된 레코드 수)
     * @returns {number}
     */
    get pageLength() {
        return this.pageSize * this.pageNumber;
    }

    /**
     * 첫번째 페이지 여부
     * @returns {boolean}
     */
    get isFirstPage() {
        return this.pageNumber === 1;
    }

    /**
     * 마지막 페이지 여부
     * @returns {boolean}
     */
    get isLastPage() {
        return Math.ceil(this.totalSize / this.pageSize) <= this.pageNumber;
    }

    /**
     * 이전 페이지 호출
     */
    handlePrevious() {
        this.pageNumber = this.pageNumber - 1;
        this.gfnComFireDispatch(this.PagingData.gComPagingEvent.prev, {
            [this.PagingData.gComReqDataParam.pageNumber]: this.pageNumber,
            [this.PagingData.gComReqDataParam.pageSize]: this.pageSize,
        });
    }

    /**
     * 다음 페이지 호출
     */
    handleNext() {
        this.pageNumber = this.pageNumber + 1;
        this.gfnComFireDispatch(this.PagingData.gComPagingEvent.next, {
            [this.PagingData.gComReqDataParam.pageNumber]: this.pageNumber,
            [this.PagingData.gComReqDataParam.pageSize]: this.pageSize,
        });
    }

    /**
     * X Scroll
     *
     * @param event
     */
    doScrollX(event) {
        // TODO : 2021-02-16    기능 개발 필요.
        const sl = event.currentTarget.scrollLeft;
        const colArr = [];

        // th, td 추출.
        const ths = this.querySelectorAll('th');
        const tds = this.querySelectorAll('td');

        let left = 1;

        for(let i = 0; i < left; i++) {
            colArr.push(ths[i]);
            colArr.push(tds[i]);
        }

        if(colArr.length !== 0) {

        }
    }

    /**
     * Y Scroll
     *
     * @param event
     */
    doScrollY(event) {
        // TODO : 2021-02-16    x축 구현 후, 같이 작동 시 수정 필요.
        let el = event.currentTarget, st = el.scrollTop;

        this.querySelectorAll('th').forEach((th) => {
            th.style.background = this.PropertyUtil.isEmpty(th.style.background) || 'rgb(250, 250, 249)';

            th.style.top = st + 'px';
            th.style.zIndex = 20;
        });
    }
}