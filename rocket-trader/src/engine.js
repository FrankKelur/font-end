'use strict'

const Chart = require('./chart.js'),
    Tools = require('./tools.js'),
    TardeInfo = require('./tradeInfo.js'),
    Operation = require('./Operation.js'),
    Dialogue = require('./dialouge.js'),
    Cache = require('./cache.js');
const SpaceStateSocket = require('../satellite/satellite.socket.js');

window.Engine = class Engine {
    constructor(config) {
        let _this = this;

        if (!config) {
            throw new Error();
        }

        _this.config = config;

        _this._initTools(config);
        _this._initOperation(config);
        _this._initChart(config);
        _this._initTradeInfo(config);
        _this._initDialouge();
        _this._createWebsocket();
        _this._cache = new Cache()
        _this._cache.initDB(config.userName)
        //增加更多历史数据标志位 发个只反复加载
        _this.addMoreFlag = false;
    }

    _createWebsocket() {
        let _this = this;
        //
        _this._socket =  new SpaceStateSocket({
            serverLists:
                [
                    // 'http://localhost:3600/',
                    'https://nodese.chatecdn.com'
                    // 'http://rsongbo.charterprime.com'


                ]
        },function(data){
            console.log(data.connect_status);

        });


        _this._socket.ready_realtimePrice({
            group:'forexr',
        });
        _this._socket.connectedStatus(function(){
            _this._socket.ready_historyPrice({
                server : 'charterprime-demo',
                currency : _this.config.currency,
                period : 1,
                start : Date.now()-10*60*60*1000,
                end : Date.now(),
                timesign : 0,
                mode : 0,
                uniqueid:'new',
                // type:'new',
                group:'forexr'
            });
        });

        //获取用户信息
        _this._socket.accountinfo(function(data){
            _this._tradeInfo.vm.balance = data[600];
            _this._tradeInfo.vm.margin = data[602]
        });
        //获取到的数据
        _this._socket.realtimePrice(function(data){
             _this.Tools.vm.changeNowPrice(data)
             _this._tradeInfo.vm.changeNowPrice(data)
             _this._cache.updatePrice(data)
            if(data[3] ==_this.config.currency){
                _this._gotPrice(data);
                _this._operation.vm.nowPrice = data;
            }
        });
        _this._socket.historyPrice(function(data){
            if(data.uniqueid =='new'){
                _this._cache.AddHistoryPirce(data.data,data.symbol,data.period)
                _this._gotHistoryPrice(data.data);
                _this._chart._resizeCanvas()
            }
            else{
                _this.addMoreHistoryPirce(data.data);
                console.log('增加更多数据');
            }
            _this._chart.LoadingShow(false);
        });
        _this._socket.tradingHistory(function(data){
            if(data && data.all == false){
                _this._tradeInfo.vm.waitData1 = false;
                _this._tradeInfo.vm.tradingList = data.data;
                _this._tradeInfo.vm.tradingOrderLen= data.totalnum;
            }
            if(data && data.all == true){
                _this._tradeInfo.vm.tradingAllList = data.data;
            }
        });
        _this._socket.tradedHistory(function(data){
            if(data){
                _this._tradeInfo.vm.waitData2 = false;
                _this._tradeInfo.vm.tradedList = data.data;
                _this._tradeInfo.vm.tradedOrderLen = data.totalnum;
            }


        });
        _this._socket.serverStatus(function(data){

        });
        _this._socket.openOrder(function(data){
            console.log('前端收到开单请求：'+ Date.now())
            if(data[11]){
                // _this._dialogue.vm.showDialogue(data[11],data[54],data[38],data[55],data[272],'success1');
                if(_this._tradeInfo.vm.tradingList.length==10){
                    _this._tradeInfo.vm.tradingList.pop();
                }
                _this._tradeInfo.vm.tradingList.unshift(data);
                _this._tradeInfo.vm.tradingOrderLen = parseInt(_this._tradeInfo.vm.tradingOrderLen) +1;
                //全部列表增加

                _this._tradeInfo.vm.tradingAllList.unshift(data);
                _this._socket.ready_accountinfo({
                    login: _this.config.userName,
                    token:_this.config.userToken ,
                });
            }
            else{
                // _this._dialogue.vm.showErrDia()
            }
        });




        // _this._socket.login(function(data){
        //     console.log(data);
        //     _this.config.userToken = data[101];
        //     _this.config.userName= data[50];
        //     _this._socket.ready_tradingHistory({
        //         login:_this.config.userName,
        //         token:_this.config.userToken ,
        //         start: 0,
        //         limit: 10
        //     });
        //
        //     _this._socket.ready_tradedHistory({
        //         login: _this.config.userName,
        //         token:_this.config.userToken ,
        //         start: 0,
        //         limit: 10
        //     });
        //     _this._socket.ready_accountinfo({
        //         login: _this.config.userName,
        //         token:_this.config.userToken ,
        //     });
        // });
        _this._socket.logout(function(data){
            console.log('等出成果')
        });
        _this._socket.closeOrder(function(data){
            if(data[11]){
                // _this._dialogue.vm.showDialogue(data[11],data[54],data[38],data[55],data[271],'success2');
                _this._socket.ready_tradingHistory({
                    login:_this.config.userName,
                    token:_this.config.userToken ,
                    start: (_this._tradeInfo.vm.nowTradingPage-1)*10,
                    limit: 10,
                    all:false
                });
                _this._socket.ready_tradedHistory({
                    login: _this.config.userName,
                    token:_this.config.userToken ,
                    start: (_this._tradeInfo.vm.nowTradedPage-1)*10,
                    limit: 10
                });
                _this._socket.ready_tradingHistory({
                    login:_this.config.userName,
                    token:_this.config.userToken ,
                    all:true
                });
                _this._socket.ready_accountinfo({
                    login: _this.config.userName,
                    token:_this.config.userToken ,
                });
            }
            else{
                // _this._dialogue.vm.showErrDia()
            }
        });

        //初次需要数据
        _this._socket.ready_tradingHistory({
            login:_this.config.userName,
            token:_this.config.userToken ,
            start: 0,
            limit: 10,
            all:false
        });
        //初次需要数据
        _this._socket.ready_tradingHistory({
            login:_this.config.userName,
            token:_this.config.userToken ,
            all:true
        });

        _this._socket.ready_tradedHistory({
            login: _this.config.userName,
            token:_this.config.userToken ,
            start: 0,
            limit: 10
        });
        _this._socket.ready_accountinfo({
            login: _this.config.userName,
            token:_this.config.userToken ,
        });
        _this._socket.tokenError(function(){
            _this.config.tokenErrorCb()
        })
    }





    _initChart(config) {
        let _this = this;


        _this._chart = new Chart(config);
        _this._chart.parent = _this
    }
    _initTradeInfo(config){
        let _this = this;
        _this._tradeInfo = new TardeInfo(config,_this);
        _this._tradeInfo.vm.langType = _this.config.lang
    }
    _initDialouge(){
        let _this = this;
        _this._dialogue = new Dialogue()
        _this._dialogue.vm.langType = _this.config.lang
    }
    _initOperation(config){
        let _this = this;


        _this._operation = new Operation(config,_this);
    }
    _initTools(config) {
        let _this = this;

        _this.Tools = new Tools(config, _this);
    }

    _gotHistoryPrice(msg) {
        let _this = this;
        /* 对蜡烛图历史数据的处理 */
        let historyPrice = [];
        if (msg && msg.length > 0 && msg[0].length > 2) {
            /* 获得蜡烛图历史 */
            for (let i = 0; i < msg.length; i++) {
                historyPrice.push([msg[i][0], msg[i][4]]);
            }
        } else {
            historyPrice = msg;
        }

        _this._chart.SetCandleHistory(msg).SetHistoryPrice(historyPrice);

        _this._startDraw();
    }
    _gotPrice(data) {
        var _this = this;

        /* 增加历史数据 */
        _this._chart.AddCandleHistoryPrice(data);

        /* gen scale_left and scale_right */
        _this._chart.GenHorizentalScale(false, data);

        /*增加即使图价格数组*/
        _this._chart.UpdateNowChart(data);
        /* 更新时间 */
        //this.realTime = data[0].toString();
    }
    _getAllAssetsResponse(msg) {
        console.log(msg);
    }
    _errorHandler(err) {
        console.log(err);
    }

    _startDraw() {
        let _this = this;
        _this._chart.StartDraw();
    }

    /* 改变资产 */
    ChangeSymbol(symbol) {
        let _this = this;

        _this._chart.nowChartPrice = [];
        _this.config.currency = symbol;
        _this._chart.config.currency = symbol;
        _this._chart.StopDraw();
        let  getPricePromise  =_this._cache.getHistoryPrice(_this.config.currency+'-'+ _this.config.candlePeriod.slice(1))
        getPricePromise.then((priceArray)=>{
            if(priceArray){
                _this._gotHistoryPrice(priceArray.data);
            }
            else{
                _this._chart.LoadingShow(true);
                _this._socket.ready_historyPrice({
                    server : 'charterprime-demo',
                    currency : _this.config.currency,
                    period : _this.config.candlePeriod.slice(1),
                    start : Date.now()-1000*60*1000*_this.config.candlePeriod.slice(1),
                    end : Date.now(),
                    timesign : 0,
                    mode : 0,
                    uniqueid:'new',
                    // type:'new'
                    group:'forexr'
                });
            }
        })
    }

    ChangeChartType(type) {
        let _this = this;
        type = type.toLowerCase()
        if(type == 'line'){
            type = 'tick'
        }
        _this._chart.ChangeChartType(type);
    }

    SwitchTimeInterval(m) {
        let _this = this;
        _this.config.candlePeriod = m;



        _this._chart.StopDraw();
        _this._chart.SwitchTimeInterval(m);
        let  getPricePromise  =_this._cache.getHistoryPrice(_this.config.currency+'-'+ _this.config.candlePeriod.slice(1))
        getPricePromise.then((priceArray)=>{
            if(priceArray){
                _this._gotHistoryPrice(priceArray.data);
            }
            else{
                _this._chart.LoadingShow(true);
                _this._socket.ready_historyPrice({
                    server : 'charterprime-demo',
                    currency : _this.config.currency,
                    period : m.slice(1),
                    start : Date.now()-1000*60*1000*m.slice(1),
                    end : Date.now(),
                    timesign : 0,
                    mode : 0,
                    uniqueid:'new',
                    // type:'new'
                    group:'forexr'
                });
            }
        })

    }

    ToggleCross() {
        let _this = this;

        _this._chart.ToggleCross();

    }

    ToggleHangMove(on) {
        let _this = this;
        if (on) {
            _this._chart.ListenMoveChart();
        } else {
            _this._chart.StopListenMoveChart();
        }
    }

    Zoom(plus, val) {
        let _this = this;
        _this._chart.Zoom(plus, val);
    }
    buy(value){
        console.log('前端发送开单请求：'+ Date.now())

        let _this = this;
        // _this._dialogue.vm.showLoadingDia();
        _this._socket.ready_openOrder({
            login:_this.config.userName,
            token:_this.config.userToken,
            currency:_this.config.currency,
            type:1,
            vol:value
        });
    }
    sell(value){
        let _this = this;
        // _this._dialogue.vm.showLoadingDia();
        _this._socket.ready_openOrder({
            login:_this.config.userName,
            token:_this.config.userToken,
            currency:_this.config.currency,
            type:2,
            vol:value
        });
    }
    login(user,password){
        let _this = this;
        _this._socket.ready_login({
            login:user,
            pwd:password
        });
    }
    logout(){
        let _this = this;
        _this._socket.ready_logout({
            login:_this.config.userName,
            token:_this.config.userToken
        });
    }
    close(ordernum,type,vol){

        let _this = this;
        // _this._dialogue.vm.showLoadingDia();
        _this._socket.ready_closeOrder({
            login:_this.config.userName,
            ordernum:ordernum,
            token:_this.config.userToken,
            type:type,
            vol:vol,
        });
    }
    changeTradeInfoPage(type,page){
        var _this = this ;

        if(type =='trading'){
            _this._tradeInfo.vm.waitData1 = true;
            _this._socket.ready_tradingHistory({
                login:_this.config.userName,
                token:_this.config.userToken ,
                start: (page-1)*10,
                limit: 10,
                all:false
            });
        }
        else{
            _this._tradeInfo.vm.waitData2 = true;
            _this._socket.ready_tradedHistory({
                login: _this.config.userName,
                token:_this.config.userToken ,
                start: (page-1)*10,
                limit: 10
            });
        }
    }
    askAddMoreHistoryPirce(startTime){
        var _this = this ;
        _this._chart.LoadingShow(true);
        if(!_this.addMoreFlag ){
            _this._socket.ready_historyPrice({
                server : 'charterprime-demo',
                currency :_this.config.currency ,
                period : _this.config.candlePeriod.slice(1),
                start : startTime-60*60*1000*_this.config.candlePeriod.slice(1),
                end : startTime,
                timesign : 0,
                mode : 0,
                uniqueid:'more',
                // type:'new'
                group:'forexr'
            });
            _this.addMoreFlag  = true;
        }
    }
    addMoreHistoryPirce(data){
        let _this = this;
        let historyPrice = [];
        if (data && data.length > 0 && data[0].length > 2) {
            /* 获得蜡烛图历史 */
            for (let i = 0; i < data.length; i++) {
                historyPrice.push([data[i][0], data[i][4]]);
            }
        } else {
            historyPrice = data;
        }
        _this._chart.AddCandleHistoryPirce(data);
        _this._chart.AddHistoryPirce(historyPrice);
        _this.addMoreFlag  = false;
    }

};
