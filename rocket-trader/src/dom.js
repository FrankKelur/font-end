'use strict'

const helper = require('./helper.js');



const toolsDOM = `
    <div id='trader-tools-bar' class=' clear-float'>
        <div class="symbol-choose">
            <span class="nowSymbol tool-item" @click="toggleSymbol()">
                {{nowSymbol}}
                <i v-bind:class="['triangledown',{rotate:symbolListShow}]" ></i>
            </span>

            <ul class="symbol-list" v-show="symbolListShow">
                <li v-for="(item,index) in symbolList" @click="changeSymbol(index)">
                    <span class="symbol-text">{{item}}</span>
                    <span class="symbol-price" v-bind:style=" 'color:' + (nowPrice[item][0] > prePrice[item][0]?raiseColor:fallColor)"> {{nowPrice[item][0]}} </span>
                    <span class="symbol-price" v-bind:style=" 'color:' + (nowPrice[item][1] > prePrice[item][1]?raiseColor:fallColor)">{{nowPrice[item][1]}}</span>
                </li>
            </ul>
        </div>
        <div class="period-choose">
            <span class="nowPeriod tool-item" @click="togglePeriod()">
                {{nowPeriod}}
                <i v-bind:class="['triangledown',{rotate:periodListShow}]" ></i>
            </span>

            <ul class="period-list" v-show="periodListShow">
                <li v-for="(item,index) in periodList" @click="changePeriod(index)">
                    <span>{{item}}<span>
                </li>
            </ul>
        </div>
        <div class="chart-choose">
            <span class="nowChart tool-item" @click="toggleChart()">
                {{nowChart}}
                <i v-bind:class="['triangledown',{rotate:chartListShow}]" ></i>
            </span>

            <ul class="chart-list" v-show="chartListShow">
                <li v-for="(item,index) in chartList" @click="changeChart(index)">
                    <span>{{item}}<span>
                </li>
            </ul>
        </div>
        <button v-on:click='Zoom(1)' class="icon-btn">
            <i class="iconfont icon-Fangda"></i>
        </button>
        <button v-on:click='Zoom(0)'  class="icon-btn">
            <i class="iconfont icon-suoxiao1"></i>
        </button>
        <button v-on:click='Cross()'  class="icon-btn ">
            <i class="iconfont icon-Shizi"></i>
        </button>
        <!--
        <button v-on:click='Move()'  class="icon-btn">move</button>
        -->
        <!--
        <label>用户</label>
        <input style="100px" v-model="user"></input>
        <label>密码</label>
        <input style="100px" v-model="password"></input>
        <button v-on:click='login()'>登陆</button>
        <button v-on:click='logout()'>logout</button>
        -->
    </div>
`;
const  tradeInfoDom = `
    <div id="trade-tab">
        <div class='tab-head'>
            <div :class="['tab-item', {'active': tabIndex == 1}]" v-on:click='changeTab(1)'>{{langType == 'cn'? langs.cn.trading:langs.en.trading}}</div>
            <div :class="['tab-item', {'active': tabIndex == 2}]" v-on:click='changeTab(2)'>{{langType == 'cn'? langs.cn.tradeHis:langs.en.tradeHis}}</div>
            <div class="line"></div>
        </div>
        <div class="tab-body">
            <div class="tab-block" v-show="tabIndex == 1">
                <table>
                    <theader>
                        <th>{{langType == 'cn'? langs.cn.tradeId:langs.en.tradeId}}</th>
                        <th>{{langType == 'cn'? langs.cn.openT:langs.en.openT}}</th>
                        <th>{{langType == 'cn'? langs.cn.type:langs.en.type}}</th>
                        <th>{{langType == 'cn'? langs.cn.symbol:langs.en.symbol}}</th>
                        <th>{{langType == 'cn'? langs.cn.volume:langs.en.volume}}</th>
                        <th>{{langType == 'cn'? langs.cn.openPrice:langs.en.openPrice}}</th>
                        <th>{{langType == 'cn'? langs.cn.currPrice:langs.en.currPrice}}</th>
                        <th>{{langType == 'cn'? langs.cn.commision:langs.en.commision}}</th>
                        <th>{{langType == 'cn'? langs.cn.swap:langs.en.swap}}</th>
                        <th>{{langType == 'cn'? langs.cn.profit:langs.en.profit}}</th>
                        <th>{{langType == 'cn'? langs.cn.operat:langs.en.operat}}</th>
                    </theader>
                    <tbody>
                        <tr v-if="waitData1">
                            <td colspan='15' class="table-loading">
                                <div class="loading">
                                    <div class="loading-box"></div>
                                    <div class="loading-text">Loading</div>
                                </div>
                            </td>
                        </tr>
                        <template v-else>
                        <tr v-for="(item,index) in tradingList">
                            <td>{{item[11]}}</td>
                            <td>{{item[522]}}</td>
                            <td :style="{color: item[54] == 1?colors.buy:colors.sell}">{{item[54] == 1?'buy':'sell'}}</td>
                            <td>{{item[55]}}</td>
                            <td>{{item[38]}}</td>
                            <td>{{item[272]}}</td>
                            <td>
                                <span v-if="item[54] == 1">{{nowPrice[item[55]][0]}}</span>
                                <span v-else>{{nowPrice[item[55]][1]}}</span>
                            </td>
                            <td>{{item[4]}}</td>
                            <td>{{item[3]}}</td>
                            <td>
                                <span  v-bind:style=" 'color:' + (profitList[((nowTradingPage-1)*10+index)]>0?colors.buy:colors.sell)">{{profitList[((nowTradingPage-1)*10+index)]}}<span>
                            </td>
                            <td>
                                <button class="opreaBtn" v-on:click="closeOrder(item[11],item[54],item[38])">{{langType == 'cn'? langs.cn.close:langs.en.close}}</button>
                            </td>
                        </tr>
                        <tr v-if="tradingList.length <= 0">
                            <td colspan='15' style="text-align:center;">
                            {{langType == 'cn'? langs.cn.nodata:langs.en.nodata}}
                            </td>
                        </tr>
                        </template>
                    </tbody>
                </table>
                <ul class="page-selector">

                    <div id="page" v-if="tradingPageSize > 0">
                        <div class="item">
                            <button @click="handlePrev('trading')">&lt;</button>
                            <button class="disable" v-if="tradingShowPrev">...</button>
                            <template v-for="(v, k) in tradingArr">
                                <button :class="{active: nowTradingPage == v}" @click="changePage('trading', v)">{{v}}</button>
                            </template>
                            <button class="disable" v-if="tradingShowNext">...</button>
                            <button @click="handleNext('trading')">&gt;</button>
                        </div>
                    </div>

                    <div class="summary">
                    {{langType == 'cn'? langs.cn.balance:langs.en.balance}}:<span>{{balance}}</span>
                    {{langType == 'cn'? langs.cn.equity:langs.en.equity}}:<span>{{Number(allProfit).toFixed(2)}}</span>
                    {{langType == 'cn'? langs.cn.margin:langs.en.margin}}:<span>{{margin}}</span>
                    </div>

                </ul>
            </div>
            <div class="tab-block" v-show="tabIndex == 2">
            <table>
                <theader>
                    <th>{{langType == 'cn'? langs.cn.tradeId:langs.en.tradeId}}</th>
                    <th>{{langType == 'cn'? langs.cn.openT:langs.en.openT}}</th>
                    <th>{{langType == 'cn'? langs.cn.type:langs.en.type}}</th>
                    <th>{{langType == 'cn'? langs.cn.symbol:langs.en.symbol}}</th>
                    <th>{{langType == 'cn'? langs.cn.volume:langs.en.volume}}</th>
                    <th>{{langType == 'cn'? langs.cn.openPrice:langs.en.openPrice}}</th>
                    <th>{{langType == 'cn'? langs.cn.closeT:langs.en.closeT}}</th>
                    <th>{{langType == 'cn'? langs.cn.closePrice:langs.en.closePrice}}</th>
                    <th>{{langType == 'cn'? langs.cn.commision:langs.en.commision}}</th>
                    <th>{{langType == 'cn'? langs.cn.swap:langs.en.swap}}</th>
                    <th>{{langType == 'cn'? langs.cn.profit:langs.en.profit}}</th>
                </theader>
                <tbody>
                    <tr v-if="waitData2">
                        <td colspan='15' class="table-loading">
                            <div class="loading">
                                <div class="loading-box"></div>
                                <div class="loading-text">Loading</div>
                            </div>
                        </td>
                    </tr>
                    <template v-else>
                    <tr v-for="item in tradedList">
                        <td>{{item[11]}}</td>
                        <td>{{item[522]}}</td>
                        <td :style="{color: item[54] == 1?colors.buy:colors.sell}">{{item[54] == 1?'buy':'sell'}}</td>
                        <td>{{item[55]}}</td>
                        <td>{{item[38]}}</td>
                        <td>{{item[272]}}</td>
                        <td>{{item[521]}}</td>
                        <td>{{item[271]}}</td>
                        <td>{{item[4]}}</td>
                        <td>{{item[3]}}</td>
                        <td>{{item[2]}}</td>
                    </tr>
                    <tr v-if="tradedList.length <= 0">
                        <td colspan='15' style="text-align:center;">
                        {{langType == 'cn'? langs.cn.nodata:langs.en.nodata}}
                        </td>
                    </tr>
                    </template>
                </tbody>
            </table>
            <ul class="page-selector">

                <div id="page" v-if="tradedPageSize > 0">
                    <div class="item">
                        <button @click="handlePrev('traded')">&lt;</button>
                        <button class="disable" v-if="tradedShowPrev">...</button>
                        <template v-for="(v, k) in tradedArr">
                            <button :class="{active: nowTradedPage == v}" @click="changePage('traded', v)">{{v}}</button>
                        </template>
                        <button class="disable" v-if="tradedShowNext">...</button>
                        <button @click="handleNext('traded')">&gt;</button>
                    </div>
                </div>

                <div class="summary">

                    {{langType == 'cn'? langs.cn.balance:langs.en.balance}}:<span>{{balance}}</span>
                    {{langType == 'cn'? langs.cn.equity:langs.en.equity}}:<span>{{Number(allProfit).toFixed(2)}}</span>
                    {{langType == 'cn'? langs.cn.margin:langs.en.margin}}:<span>{{margin}}</span>
                </div>

            </ul>
            </div>
        </div>
    </div>
`;
const operationDom = `
    <div id="operation">
        <div class="hand-choose">
            <div id="counter">
                <span class="decrease" @click="decrease($event)"><i class="iconfont icon-minus"></i></span>
                <span class="increase" @click="increase($event)"><i class="iconfont icon-shizi"></i></span>
                <input type="text" autocomplete="off" :min="min" :max="max" value="0.01" @blur="handleBlur($event)" class="inputValue" />
            </div>
        </div>
        <div class="trader-btn-box">
            <div class="trader-btn"  v-bind:style="'background:' + fallColor" @click="buy()">
                <span class="type-text">Buy</span>
                <span class="now-price">
                    <i>{{(nowPrice[2]+ '')[0]}}</i>
                    <i >{{(nowPrice[2]+ '')[1]}}</i>
                    <i v-bind:class="[priceLength<=5?'big':'']">{{(nowPrice[2]+ '')[2]}}</i>
                    <i v-bind:class="[priceLength<=6?'big':'']">{{(nowPrice[2]+ '')[3]}}</i>
                    <i v-bind:class="[priceLength==5?'small':'big']">{{(nowPrice[2]+ '')[4]}}</i>
                    <i v-bind:class="[priceLength==6?'small':'big']">{{(nowPrice[2]+ '')[5]}}</i>
                    <i class="small">{{(nowPrice[2]+ '')[6]}}</i>
                </span>
            </div>
            <div  class="trader-btn" v-bind:style="'background:' + raiseColor"  @click="sell()">
                <span class="type-text">Sell</span>
                <span class="now-price">
                    <i>{{(nowPrice[1]+ '')[0]}}</i>
                    <i >{{(nowPrice[1]+ '')[1]}}</i>
                    <i v-bind:class="[priceLength<=5?'big':'']">{{(nowPrice[1]+ '')[2]}}</i>
                    <i v-bind:class="[priceLength<=6?'big':'']">{{(nowPrice[1]+ '')[3]}}</i>
                    <i v-bind:class="[priceLength==5?'small':'big']">{{(nowPrice[1]+ '')[4]}}</i>
                    <i v-bind:class="[priceLength==6?'small':'big']">{{(nowPrice[1]+ '')[5]}}</i>
                    <i class="small">{{(nowPrice[1]+ '')[6]}}</i>
                </span>
            </div>
        </div>
        <div id="tick-chart">
            <div class="loading-box-c" v-if="showLoading"></div>
        </div>
    </div>
`

const dialogueDom = `
        <div class="overlay" v-if="show"></div>
        <transition appear enter-active-class="fadeIn" leave-active-class="fadeOut">
        <div class="dialog-box" v-if="show">
            <div class="loading" v-if="showLoading">
                <div class="loading-box"></div>
                <div class="loading-text">Loading</div>
            </div>
            <template v-else>
                <div class="close" @click="close">+</div>
                <div :style="{background:typeBg}" class="type-img"><i :class="typeImg"></i></div>
                <div class="rightSection">
                    <div class="title">{{title}}</div>
                    <div class="msg">
                        <div>{{msg}}</div>
                        <div v-show="!msg">
                            <span>{{msgTrade.no}}</span>
                            <span class="bold" :style="sellOrBuy">{{msgTrade.type}} {{msgTrade.hand}}</span>
                            <span>{{msgTrade.currency}}</span>
                            <span>at</span>
                            <span class="bold">{{msgTrade.price}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        </transition>
`
exports.initDom = function initToolsDom(containerId) {
    let containerEle = document.getElementById(containerId);
    let randomId = helper.random();

    containerEle.innerHTML = toolsDOM;

    return randomId;
}
exports.initTradeInfoDom = function initTradeInfoDom(containerId) {
    let containerEle = document.getElementById(containerId);
    let randomId = helper.random();

    containerEle.innerHTML = tradeInfoDom;

    return randomId;
}
exports.initOperationDom = function initOperationDom(containerId) {
    let containerEle = document.getElementById(containerId);
    let randomId = helper.random();
    containerEle.innerHTML = operationDom;
    return randomId;
}

exports.initDialogue = function initDialogue() {
    let dialogueEle = document.createElement('div')
    dialogueEle.id = 'trader-dialog';
    dialogueEle.innerHTML = dialogueDom;
    document.body.appendChild(dialogueEle);
}
