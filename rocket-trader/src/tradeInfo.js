const Dom = require('./dom.js');
class tardeInfo{
    constructor(config,engine){
        let _this = this ;
        _this._engine = engine;

        _this._id = Dom.initTradeInfoDom(config.tardeInfoElement);
        _this._createVm(config.tardeInfoElement);
    }
    _createVm(id) {
        let _this = this ;
        _this.vm = new Vue({
            el:'#'+id,
            data:{
                waitData1: true,
                waitData2: true,
                profitList:[],
                profitsType:{
                    divide:['AUDCAD','AUDCHF','AUDJPY','CADCHF','CADJPY','CHFJPY','EURCAD','EURCHF','EURJPY','GBPCAD','GBPCHF','GBPJPY','NZDCAD','NZDCHF','NZDJPY','USDCAD','USDCHF','USDJPY'],
                    multiply:['AUDNZD','EURAUD','EURGBP','EURNZD','GBPAUD','GBPNZD'],
                    unchanged:['AUDUSD','EURUSD','GBPUSD','NZDUSD']
                },
                tabIndex:1,
                balance:'',
                margin:'',
                tradingAllList:[],
                tradingAllList:[],
                tradingArr:[],
                tradedList:[],
                tradedArr:[],
                tradingOrderLen:0,
                tradedOrderLen:0,
                nowTradingPage:1,
                nowTradedPage:1,
                tradingPageSize:0,
                tradedPageSize:0,
                nowPrice:{
                    'AUDCAD':['0.00000','0.00000'],
                    'AUDCHF':['0.00000','0.00000'],
                    'AUDJPY':['0.00000','0.00000'],
                    'AUDUSD':['0.00000','0.00000'],
                    'CADCHF':['0.00000','0.00000'],
                    'CADJPY':['0.00000','0.00000'],
                    'EURAUD':['0.00000','0.00000'],
                    'EURCAD':['0.00000','0.00000'],
                    'EURCHF':['0.00000','0.00000'],
                    'EURGBP':['0.00000','0.00000'],
                    'EURJPY':['0.00000','0.00000'],
                    'EURNZD':['0.00000','0.00000'],
                    'EURUSD':['0.00000','0.00000'],
                    'GBPAUD':['0.00000','0.00000'],
                    'GBPCAD':['0.00000','0.00000'],
                    'GBPCHF':['0.00000','0.00000'],
                    'GBPJPY':['0.00000','0.00000'],
                    'GBPNZD':['0.00000','0.00000'],
                    'GBPUSD':['0.00000','0.00000'],
                    'NZDCAD':['0.00000','0.00000'],
                    'NZDCHF':['0.00000','0.00000'],
                    'NZDJPY':['0.00000','0.00000'],
                    'NZDUSD':['0.00000','0.00000'],
                    'USDCAD':['0.00000','0.00000'],
                    'USDCHF':['0.00000','0.00000'],
                    'USDJPY':['0.00000','0.00000'],
                    // 'XAGUSD':['0.00000','0.00000'],
                    // 'XAUUSD':['0.00000','0.00000'],
                },
                tradedShowPrev: false,
                tradedShowNext: false,
                tradingShowPrev: false,
                tradingShowNext: false,
                colors: {
                    'sell': '#D0011B',
                    'buy': '#1A74DD',
                },
                langType: 'en', //en,cn
                langs: {
                    en:{
                        'tradeId': 'Transaction ID',
                        'trading': 'Trading',
                        'tradeHis': 'Trading History',
                        'openT': 'Open Time',
                        'closeT': 'Close Time',
                        'type': 'Type',
                        'symbol': 'Symbol',
                        'volume': 'Volume',
                        'openPrice': 'Open Price',
                        'closePrice': 'Close Price',
                        'currPrice': 'Current Price',
                        'commission': 'Commision',
                        'swap': 'Swap',
                        'profit': 'Profit',
                        'close': 'Close',
                        'operat': 'operation',
                        'balance': 'Balance',
                        'equity': 'Equity',
                        'margin': 'Margin',
                        'nodata': 'No current transaction record',
                        'swap':'Swap',
                        'commision':'Commision'
                    },
                    cn:{
                        'tradeId': '交易编号',
                        'trading': '正在进行',
                        'tradeHis': '交易历史',
                        'openT': '开仓时间',
                        'closeT': '平仓时间',
                        'type': '类型',
                        'symbol': '交易品种',
                        'volume': '交易量',
                        'openPrice': '开仓价格',
                        'closePrice': '平仓价格',
                        'currPrice': '当前价格',
                        'commission': '手续费',
                        'swap': '库存量',
                        'profit': '盈利',
                        'close': '平仓',
                        'operat': '操作',
                        'balance': '账户余额',
                        'equity': '净值',
                        'margin': '保证金',
                        'nodata': '当前暂无交易记录',
                        'swap':'库存费',
                        'commision':'手续费'
                    },

                }
            },
            watch: {
                nowTradingPage: function(){
                    this.tradingArr = this.getPageArr('trading');
                },
                tradingOrderLen: function(){
                    this.tradingArr = [];
                    this.tradingPageSize = this.tradingPageNum;
                    this.tradingArr = this.getPageArr('trading');
                },
                nowTradedPage: function(){
                    this.tradedArr = this.getPageArr('traded');
                },
                tradedOrderLen: function(){
                    this.tradedArr = [];
                    this.tradedPageSize = this.tradedPageNum;
                    this.tradedArr = this.getPageArr('traded');
                },
                'nowPrice':{
                    handler:function(val,oldVal){
                        let profitListArr = [];
                        for(var i=0;i<this.tradingAllList.length;i++){
                            let thisTrade = this.tradingAllList[i];
                            let thisProfit ;
                            let profitBase ;
                            let profitRatio ;
                            let ratioName
                            if(this.profitsType.divide.indexOf(thisTrade[55]) !== -1){
                                ratioName = 'USD'+ thisTrade[55].slice(0,6).slice(-3)
                            }
                            else if (this.profitsType.multiply.indexOf(thisTrade[55]) !== -1) {
                                ratioName =  thisTrade[55].slice(0,6).slice(-3) + 'USD' ;
                            }
                            else{
                                ratioName = null;
                            }
                            if(thisTrade[54]== 1){
                                if(val[thisTrade[55]][0] != 0 ){
                                        profitBase = ((val[thisTrade[55]][0] - thisTrade[272])*thisTrade[38]*100000)
                                }
                                else{
                                    profitBase = 'ERR'
                                }
                                if(this.profitsType.unchanged.indexOf(thisTrade[55]) == -1){
                                    profitRatio = val[ratioName][0]
                                }
                            }
                            else{
                                if(val[thisTrade[55]][1] != 0 ){
                                    profitBase = (( thisTrade[272] - val[thisTrade[55]][1])*thisTrade[38]*100000)
                                }
                                else{
                                    profitBase = 'ERR'
                                }
                                if(this.profitsType.unchanged.indexOf(thisTrade[55]) == -1){
                                    profitRatio = val[ratioName][1]
                                }
                            }
                            if(this.profitsType.divide.indexOf(thisTrade[55]) !== -1){
                                if(profitBase!== 'ERR' && profitRatio !==0){
                                    thisProfit = profitBase/ profitRatio
                                }
                                else{
                                    thisProfit = '-'
                                }

                            }
                            else if (this.profitsType.multiply.indexOf(thisTrade[55]) !== -1) {
                                    if(profitBase!=='ERR' && profitRatio !==0){
                                            thisProfit = profitBase*profitRatio
                                    }
                                    else{
                                        thisProfit = '-'
                                    }
                            }
                            else{
                                    if(profitBase!=='ERR' ){
                                        thisProfit  = profitBase
                                    }
                                    else{
                                        thisProfit = '-'
                                    }
                            }
                            if(thisProfit != '-'){
                                thisProfit = thisProfit.toFixed(2)
                            }
                            profitListArr.push(thisProfit)

                        }
                        this.profitList = profitListArr;
                    },
                    deep:true
                }
            },
            methods:{
                changeTab:(index)=>{
                    _this.vm.tabIndex = index;
                },
                closeOrder:(ordernum,type,vol)=>{
                    _this._engine.close(ordernum,type,vol);
                },
                changePage:function(type,page){
                    if(type == 'trading'){
                        this.nowTradingPage = page;
                    }
                    else{
                        this.nowTradedPage = page;
                    }
                    _this._engine.changeTradeInfoPage(type,page);
                },

                handlePrev: function(type){
                    if(type == 'trading'){
                        if(this.nowTradingPage - 1 >= 1){
                            this.nowTradingPage -= 1;
                            this.changePage('trading', this.nowTradingPage);
                        }
                    }else{
                        if(this.nowTradedPage - 1 >= 1){
                            this.nowTradedPage -= 1;
                            this.changePage('traded', this.nowTradedPage);
                        }
                    }
                },
                handleNext: function(type){
                    if(type == 'trading'){
                        if(this.nowTradingPage + 1 <= this.tradingPageSize){
                            this.nowTradingPage += 1;
                            this.changePage('trading', this.nowTradingPage);
                        }
                    }else{
                        if(this.nowTradedPage + 1 <= this.tradedPageSize){
                            this.nowTradedPage += 1;
                            this.changePage('traded', this.nowTradedPage);
                        }
                    }
                },
                getPageArr: function(type) {
                    var pagerCount = 6;
                    if(type == 'trading'){
                        var currPage = +this.nowTradingPage;
                        var pageSize = +this.tradingPageSize;
                    }else{
                        var currPage = +this.nowTradedPage;
                        var pageSize = +this.tradedPageSize;
                    }
                    var showPrev = false;
                    var showNext = false;
                    var arr = [];
                    if(pageSize > pagerCount){
                        if(currPage > pagerCount - 1){
                            showPrev = true;
                        }

                        if(currPage < pageSize - 1){
                            showNext = true;
                        }
                    }

                    if(showPrev && !showNext){
                        var startPage = pageSize - (pagerCount - 1 );
                        for (var i = startPage + 1; i <= pageSize; i ++) {
                            arr.push(i);
                        }
                    }else if(!showPrev && showNext){
                        for(var i = 1; i <= pagerCount-1; i ++){
                            arr.push(i);
                        }
                    }else if(showPrev && showNext){
                        var offset = Math.floor(pagerCount / 2) - 1;
                        for(var i = currPage - offset + 1; i <= currPage + offset; i ++){
                            arr.push(i);
                        }
                    }else{
                        for(var i = 1; i <= pageSize; i ++){
                            arr.push(i);
                        }
                    }

                    if(type == 'trading'){
                        this.tradingShowNext = showNext;
                        this.tradingShowPrev = showPrev;
                    }else{
                        this.tradedShowNext = showNext;
                        this.tradedShowPrev = showPrev;
                    }

                    return arr;
                },
                changeNowPrice:function(data){
                    var _this = this ,
                        symbol = data[3],
                        nowPriceArr = _this.nowPrice[symbol];
                        if(nowPriceArr){
                            nowPriceArr.pop()
                            nowPriceArr.pop()
                            nowPriceArr.push(data[1])
                            nowPriceArr.push(data[2])
                        }
                }
            },
            computed:{
                'tradingPageNum':function(){
                    return Math.ceil(this.tradingOrderLen/10);
                },
                'tradedPageNum':function(){
                    return Math.ceil(this.tradedOrderLen/10);
                },
                'allProfit':function(){
                    if(this.profitList.length !=0){
                        let profitSum = 0
                        let balance = Number(this.balance)
                        for(var i = 0;i<this.profitList.length;i++){
                            if(this.profitList[i]!='-'){
                                profitSum += Number(this.profitList[i])
                            }

                        }
                        return (balance+profitSum).toFixed(2)
                    }
                    else{
                        return  Number(this.balance)
                    }
                }
            },
        })

    }
}
module.exports = tardeInfo;
