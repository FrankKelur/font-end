/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Chart = __webpack_require__(1),
	    Tools = __webpack_require__(2),
	    TardeInfo = __webpack_require__(5),
	    Operation = __webpack_require__(6),
	    Dialogue = __webpack_require__(7),
	    Cache = __webpack_require__(8);
	var SpaceStateSocket = __webpack_require__(9);
	
	window.Engine = function () {
	    function Engine(config) {
	        _classCallCheck(this, Engine);
	
	        var _this = this;
	
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
	        _this._cache = new Cache();
	        _this._cache.initDB(config.userName);
	        //增加更多历史数据标志位 发个只反复加载
	        _this.addMoreFlag = false;
	    }
	
	    _createClass(Engine, [{
	        key: '_createWebsocket',
	        value: function _createWebsocket() {
	            var _this = this;
	            //
	            _this._socket = new SpaceStateSocket({
	                serverLists: [
	                // 'http://localhost:3600/',
	                'https://nodese.chatecdn.com'
	                // 'http://rsongbo.charterprime.com'
	
	
	                ]
	            }, function (data) {
	                console.log(data.connect_status);
	            });
	
	            _this._socket.ready_realtimePrice({
	                group: 'forexr'
	            });
	            _this._socket.connectedStatus(function () {
	                _this._socket.ready_historyPrice({
	                    server: 'charterprime-demo',
	                    currency: _this.config.currency,
	                    period: 1,
	                    start: Date.now() - 10 * 60 * 60 * 1000,
	                    end: Date.now(),
	                    timesign: 0,
	                    mode: 0,
	                    uniqueid: 'new',
	                    // type:'new',
	                    group: 'forexr'
	                });
	            });
	
	            //获取用户信息
	            _this._socket.accountinfo(function (data) {
	                _this._tradeInfo.vm.balance = data[600];
	                _this._tradeInfo.vm.margin = data[602];
	            });
	            //获取到的数据
	            _this._socket.realtimePrice(function (data) {
	                _this.Tools.vm.changeNowPrice(data);
	                _this._tradeInfo.vm.changeNowPrice(data);
	                _this._cache.updatePrice(data);
	                if (data[3] == _this.config.currency) {
	                    _this._gotPrice(data);
	                    _this._operation.vm.nowPrice = data;
	                }
	            });
	            _this._socket.historyPrice(function (data) {
	                if (data.uniqueid == 'new') {
	                    _this._cache.AddHistoryPirce(data.data, data.symbol, data.period);
	                    _this._gotHistoryPrice(data.data);
	                    _this._chart._resizeCanvas();
	                } else {
	                    _this.addMoreHistoryPirce(data.data);
	                    console.log('增加更多数据');
	                }
	                _this._chart.LoadingShow(false);
	            });
	            _this._socket.tradingHistory(function (data) {
	                if (data && data.all == false) {
	                    _this._tradeInfo.vm.waitData1 = false;
	                    _this._tradeInfo.vm.tradingList = data.data;
	                    _this._tradeInfo.vm.tradingOrderLen = data.totalnum;
	                }
	                if (data && data.all == true) {
	                    _this._tradeInfo.vm.tradingAllList = data.data;
	                }
	            });
	            _this._socket.tradedHistory(function (data) {
	                if (data) {
	                    _this._tradeInfo.vm.waitData2 = false;
	                    _this._tradeInfo.vm.tradedList = data.data;
	                    _this._tradeInfo.vm.tradedOrderLen = data.totalnum;
	                }
	            });
	            _this._socket.serverStatus(function (data) {});
	            _this._socket.openOrder(function (data) {
	                console.log('前端收到开单请求：' + Date.now());
	                if (data[11]) {
	                    // _this._dialogue.vm.showDialogue(data[11],data[54],data[38],data[55],data[272],'success1');
	                    if (_this._tradeInfo.vm.tradingList.length == 10) {
	                        _this._tradeInfo.vm.tradingList.pop();
	                    }
	                    _this._tradeInfo.vm.tradingList.unshift(data);
	                    _this._tradeInfo.vm.tradingOrderLen = parseInt(_this._tradeInfo.vm.tradingOrderLen) + 1;
	                    //全部列表增加
	
	                    _this._tradeInfo.vm.tradingAllList.unshift(data);
	                    _this._socket.ready_accountinfo({
	                        login: _this.config.userName,
	                        token: _this.config.userToken
	                    });
	                } else {
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
	            _this._socket.logout(function (data) {
	                console.log('等出成果');
	            });
	            _this._socket.closeOrder(function (data) {
	                if (data[11]) {
	                    // _this._dialogue.vm.showDialogue(data[11],data[54],data[38],data[55],data[271],'success2');
	                    _this._socket.ready_tradingHistory({
	                        login: _this.config.userName,
	                        token: _this.config.userToken,
	                        start: (_this._tradeInfo.vm.nowTradingPage - 1) * 10,
	                        limit: 10,
	                        all: false
	                    });
	                    _this._socket.ready_tradedHistory({
	                        login: _this.config.userName,
	                        token: _this.config.userToken,
	                        start: (_this._tradeInfo.vm.nowTradedPage - 1) * 10,
	                        limit: 10
	                    });
	                    _this._socket.ready_tradingHistory({
	                        login: _this.config.userName,
	                        token: _this.config.userToken,
	                        all: true
	                    });
	                    _this._socket.ready_accountinfo({
	                        login: _this.config.userName,
	                        token: _this.config.userToken
	                    });
	                } else {
	                    // _this._dialogue.vm.showErrDia()
	                }
	            });
	
	            //初次需要数据
	            _this._socket.ready_tradingHistory({
	                login: _this.config.userName,
	                token: _this.config.userToken,
	                start: 0,
	                limit: 10,
	                all: false
	            });
	            //初次需要数据
	            _this._socket.ready_tradingHistory({
	                login: _this.config.userName,
	                token: _this.config.userToken,
	                all: true
	            });
	
	            _this._socket.ready_tradedHistory({
	                login: _this.config.userName,
	                token: _this.config.userToken,
	                start: 0,
	                limit: 10
	            });
	            _this._socket.ready_accountinfo({
	                login: _this.config.userName,
	                token: _this.config.userToken
	            });
	            _this._socket.tokenError(function () {
	                _this.config.tokenErrorCb();
	            });
	        }
	    }, {
	        key: '_initChart',
	        value: function _initChart(config) {
	            var _this = this;
	
	            _this._chart = new Chart(config);
	            _this._chart.parent = _this;
	        }
	    }, {
	        key: '_initTradeInfo',
	        value: function _initTradeInfo(config) {
	            var _this = this;
	            _this._tradeInfo = new TardeInfo(config, _this);
	            _this._tradeInfo.vm.langType = _this.config.lang;
	        }
	    }, {
	        key: '_initDialouge',
	        value: function _initDialouge() {
	            var _this = this;
	            _this._dialogue = new Dialogue();
	            _this._dialogue.vm.langType = _this.config.lang;
	        }
	    }, {
	        key: '_initOperation',
	        value: function _initOperation(config) {
	            var _this = this;
	
	            _this._operation = new Operation(config, _this);
	        }
	    }, {
	        key: '_initTools',
	        value: function _initTools(config) {
	            var _this = this;
	
	            _this.Tools = new Tools(config, _this);
	        }
	    }, {
	        key: '_gotHistoryPrice',
	        value: function _gotHistoryPrice(msg) {
	            var _this = this;
	            /* 对蜡烛图历史数据的处理 */
	            var historyPrice = [];
	            if (msg && msg.length > 0 && msg[0].length > 2) {
	                /* 获得蜡烛图历史 */
	                for (var i = 0; i < msg.length; i++) {
	                    historyPrice.push([msg[i][0], msg[i][4]]);
	                }
	            } else {
	                historyPrice = msg;
	            }
	
	            _this._chart.SetCandleHistory(msg).SetHistoryPrice(historyPrice);
	
	            _this._startDraw();
	        }
	    }, {
	        key: '_gotPrice',
	        value: function _gotPrice(data) {
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
	    }, {
	        key: '_getAllAssetsResponse',
	        value: function _getAllAssetsResponse(msg) {
	            console.log(msg);
	        }
	    }, {
	        key: '_errorHandler',
	        value: function _errorHandler(err) {
	            console.log(err);
	        }
	    }, {
	        key: '_startDraw',
	        value: function _startDraw() {
	            var _this = this;
	            _this._chart.StartDraw();
	        }
	
	        /* 改变资产 */
	
	    }, {
	        key: 'ChangeSymbol',
	        value: function ChangeSymbol(symbol) {
	            var _this = this;
	
	            _this._chart.nowChartPrice = [];
	            _this.config.currency = symbol;
	            _this._chart.config.currency = symbol;
	            _this._chart.StopDraw();
	            var getPricePromise = _this._cache.getHistoryPrice(_this.config.currency + '-' + _this.config.candlePeriod.slice(1));
	            getPricePromise.then(function (priceArray) {
	                if (priceArray) {
	                    _this._gotHistoryPrice(priceArray.data);
	                } else {
	                    _this._chart.LoadingShow(true);
	                    _this._socket.ready_historyPrice({
	                        server: 'charterprime-demo',
	                        currency: _this.config.currency,
	                        period: _this.config.candlePeriod.slice(1),
	                        start: Date.now() - 1000 * 60 * 1000 * _this.config.candlePeriod.slice(1),
	                        end: Date.now(),
	                        timesign: 0,
	                        mode: 0,
	                        uniqueid: 'new',
	                        // type:'new'
	                        group: 'forexr'
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'ChangeChartType',
	        value: function ChangeChartType(type) {
	            var _this = this;
	            type = type.toLowerCase();
	            if (type == 'line') {
	                type = 'tick';
	            }
	            _this._chart.ChangeChartType(type);
	        }
	    }, {
	        key: 'SwitchTimeInterval',
	        value: function SwitchTimeInterval(m) {
	            var _this = this;
	            _this.config.candlePeriod = m;
	
	            _this._chart.StopDraw();
	            _this._chart.SwitchTimeInterval(m);
	            var getPricePromise = _this._cache.getHistoryPrice(_this.config.currency + '-' + _this.config.candlePeriod.slice(1));
	            getPricePromise.then(function (priceArray) {
	                if (priceArray) {
	                    _this._gotHistoryPrice(priceArray.data);
	                } else {
	                    _this._chart.LoadingShow(true);
	                    _this._socket.ready_historyPrice({
	                        server: 'charterprime-demo',
	                        currency: _this.config.currency,
	                        period: m.slice(1),
	                        start: Date.now() - 1000 * 60 * 1000 * m.slice(1),
	                        end: Date.now(),
	                        timesign: 0,
	                        mode: 0,
	                        uniqueid: 'new',
	                        // type:'new'
	                        group: 'forexr'
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'ToggleCross',
	        value: function ToggleCross() {
	            var _this = this;
	
	            _this._chart.ToggleCross();
	        }
	    }, {
	        key: 'ToggleHangMove',
	        value: function ToggleHangMove(on) {
	            var _this = this;
	            if (on) {
	                _this._chart.ListenMoveChart();
	            } else {
	                _this._chart.StopListenMoveChart();
	            }
	        }
	    }, {
	        key: 'Zoom',
	        value: function Zoom(plus, val) {
	            var _this = this;
	            _this._chart.Zoom(plus, val);
	        }
	    }, {
	        key: 'buy',
	        value: function buy(value) {
	            console.log('前端发送开单请求：' + Date.now());
	
	            var _this = this;
	            // _this._dialogue.vm.showLoadingDia();
	            _this._socket.ready_openOrder({
	                login: _this.config.userName,
	                token: _this.config.userToken,
	                currency: _this.config.currency,
	                type: 1,
	                vol: value
	            });
	        }
	    }, {
	        key: 'sell',
	        value: function sell(value) {
	            var _this = this;
	            // _this._dialogue.vm.showLoadingDia();
	            _this._socket.ready_openOrder({
	                login: _this.config.userName,
	                token: _this.config.userToken,
	                currency: _this.config.currency,
	                type: 2,
	                vol: value
	            });
	        }
	    }, {
	        key: 'login',
	        value: function login(user, password) {
	            var _this = this;
	            _this._socket.ready_login({
	                login: user,
	                pwd: password
	            });
	        }
	    }, {
	        key: 'logout',
	        value: function logout() {
	            var _this = this;
	            _this._socket.ready_logout({
	                login: _this.config.userName,
	                token: _this.config.userToken
	            });
	        }
	    }, {
	        key: 'close',
	        value: function close(ordernum, type, vol) {
	
	            var _this = this;
	            // _this._dialogue.vm.showLoadingDia();
	            _this._socket.ready_closeOrder({
	                login: _this.config.userName,
	                ordernum: ordernum,
	                token: _this.config.userToken,
	                type: type,
	                vol: vol
	            });
	        }
	    }, {
	        key: 'changeTradeInfoPage',
	        value: function changeTradeInfoPage(type, page) {
	            var _this = this;
	
	            if (type == 'trading') {
	                _this._tradeInfo.vm.waitData1 = true;
	                _this._socket.ready_tradingHistory({
	                    login: _this.config.userName,
	                    token: _this.config.userToken,
	                    start: (page - 1) * 10,
	                    limit: 10,
	                    all: false
	                });
	            } else {
	                _this._tradeInfo.vm.waitData2 = true;
	                _this._socket.ready_tradedHistory({
	                    login: _this.config.userName,
	                    token: _this.config.userToken,
	                    start: (page - 1) * 10,
	                    limit: 10
	                });
	            }
	        }
	    }, {
	        key: 'askAddMoreHistoryPirce',
	        value: function askAddMoreHistoryPirce(startTime) {
	            var _this = this;
	            _this._chart.LoadingShow(true);
	            if (!_this.addMoreFlag) {
	                _this._socket.ready_historyPrice({
	                    server: 'charterprime-demo',
	                    currency: _this.config.currency,
	                    period: _this.config.candlePeriod.slice(1),
	                    start: startTime - 60 * 60 * 1000 * _this.config.candlePeriod.slice(1),
	                    end: startTime,
	                    timesign: 0,
	                    mode: 0,
	                    uniqueid: 'more',
	                    // type:'new'
	                    group: 'forexr'
	                });
	                _this.addMoreFlag = true;
	            }
	        }
	    }, {
	        key: 'addMoreHistoryPirce',
	        value: function addMoreHistoryPirce(data) {
	            var _this = this;
	            var historyPrice = [];
	            if (data && data.length > 0 && data[0].length > 2) {
	                /* 获得蜡烛图历史 */
	                for (var i = 0; i < data.length; i++) {
	                    historyPrice.push([data[i][0], data[i][4]]);
	                }
	            } else {
	                historyPrice = data;
	            }
	            _this._chart.AddCandleHistoryPirce(data);
	            _this._chart.AddHistoryPirce(historyPrice);
	            _this.addMoreFlag = false;
	        }
	    }]);
	
	    return Engine;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	   版本2:
	   每次获取新价格重绘所有历史记录
	   */
	
	module.exports = Chart;
	
	function Chart(config) {
	
	    var self = this;
	
	    /* 支持的图类型 */
	    self.supportChartType = ['tick', 'candle'];
	
	    /* 网格 单元格数量 */
	    // self.numOfVertical = config.numOfVerLine || 9; //网格纵向格子数量
	    // self.numOfHorizental = config.numOfHorLine || 10; //网格横向格子数量
	
	    /* 单元格时间间隔 分钟 */
	    /* 关于蜡烛图的所有配置 */
	    self.candle = { //
	        m1: {
	            min: 1,
	            period: 60000 // 蜡烛图间隔，1分钟
	        },
	        m5: {
	            min: 5,
	            period: 300000 // 蜡烛图间隔，5分钟
	        },
	        m15: {
	            min: 15,
	            period: 900000 // 蜡烛图间隔，15分钟
	        },
	        m30: {
	            min: 30,
	            period: 1800000 // 蜡烛图间隔，30分钟
	        }
	    };
	
	    /* 配置 */
	    /*
	     *  {
	     *    canvasId: xxx,
	     *    canvasContainerId: xxx,
	     *    chartType: candle, //图类型
	     *    candlePeriod: m1,
	     *    currency: EURUSD,
	     *    _crosson: bool //十字开启或关闭
	     *    _candleTimeInterval: 5 // 单元格间隔 5分钟
	     *    _candleMargin: 3
	     *    zoom: 5 // 没个单元格的蜡烛数量
	     *  }
	     * */
	    self.config = {
	        _candleTimeInterval: 5,
	        _candleMargin: 2,
	        _boxHeight: 38,
	        zoom: 3,
	        /* config of indicates */
	        indi: {
	            verlineon: false
	        },
	        candleRiseColor: '#3d63ae',
	        candleFallColor: '#d22c39',
	        croseLableColor: '#000', //十字坐标标签价格
	        croseLableOpacity: '0.8', //狮子坐标标签透明度
	        croseLineColor: '#000', //十字坐标颜色
	        croseLineOpactiy: '0.4', //十字坐标线透明度
	        currentPriceLabelColor: '#000', //现在价格标签颜色
	        currentPriceLabelOpacity: '1', //现在价格标签透明度
	        currentPriceLineColor: '#000'
	    };
	
	    /* 储存历史价格 */
	    self.historyPrice = [];
	
	    /* 储存蜡烛图历史 */
	    self.candleHistoryPrice = [];
	
	    /*
	       这四个变量限定绘图区域
	       left和right为像素值和横座标时间对应关系
	       top和bottom对像素值和纵座标价格对应关系
	       */
	    self.scaleLeft = []; // [point, time]
	    self.scaleRight = []; // [point, time]
	    self.scaleTop = []; // [point, price]
	    self.scaleBottom = []; // [point, price]
	
	    /* 最新价格[time price] */
	    self.currentPricePair = [];
	
	    /* 即使图价格数组[[time,bid,ask],......] */
	    self.nowChartPrice = [];
	    /* 绘图对象  主图和用户交互图 */
	    self.chartContext = null;
	    self.iChartContext = null;
	
	    /* 十字可停留的横座标 */
	    self.crossLinePoint = [];
	
	    self.indicators = {
	        verLine: null, // point x
	        horLine: null // point y
	    };
	
	    self._initChart(config);
	}
	
	/* 初始化画图区域 */
	Chart.prototype._initDrawingScale = _initDrawingScale;
	/* 生成主图纵向的scale */
	Chart.prototype._genVerticalScale = _genVerticalScale;
	/* 初始化 画图背景 */
	Chart.prototype._initTickChartStyle = _initTickChartStyle;
	/* 画所有数据 */
	Chart.prototype._startDrawingEngine = _startDrawingEngine;
	/* 画历史数据（tick）*/
	Chart.prototype._drawTickHistoryPrice = _drawTickHistoryPrice;
	/* 画历史数据（candle）*/
	Chart.prototype._drawCandleHistoryPrice = _drawCandleHistoryPrice;
	Chart.prototype._drawCandle = _drawCandle;
	/* 画跟随最新价格的横线 */
	Chart.prototype._drawLatestLine = _drawLatestLine;
	/* 改变chart类型 */
	Chart.prototype.ChangeChartType = ChangeChartType;
	/* 获得一对价格的坐标 返回[x,y] */
	Chart.prototype._getPoint = _getPoint;
	/* 画坐标 */
	Chart.prototype._drawCoordinates = _drawCoordinates;
	/* 修改横座标 */
	Chart.prototype.GenHorizentalScale = GenHorizentalScale;
	/* 判断是否应该回退 */
	Chart.prototype._shouldGenHorizentalScale = _shouldGenHorizentalScale;
	/* 增加历史记录 */
	Chart.prototype.AddCandleHistoryPrice = AddCandleHistoryPrice;
	/* 停止画图 */
	Chart.prototype.StopDraw = StopDraw;
	/* 开始画图 */
	Chart.prototype.StartDraw = StartDraw;
	/* 切换图时间 */
	Chart.prototype.SwitchTimeInterval = SwitchTimeInterval;
	
	Chart.prototype.ToggleCross = ToggleCross;
	/* 十字打开，监听鼠标移动 */
	Chart.prototype._listenCross = _listenCross;
	/* 十字关闭，取消监听 */
	Chart.prototype._stopListenCross = _stopListenCross;
	/* 监听鼠标拖动 */
	Chart.prototype.ListenMoveChart = ListenMoveChart;
	/* 取消监听鼠标拖动 */
	Chart.prototype.StopListenMoveChart = StopListenMoveChart;
	/* 设置历史数据*/
	Chart.prototype.SetHistoryPrice = SetHistoryPrice;
	Chart.prototype.SetCandleHistory = SetCandleHistory;
	/* Zoom */
	Chart.prototype.Zoom = Zoom;
	
	/* 内部方法 */
	//绑定事件拖动窗口重设canvas大小
	Chart.prototype._resizeCanvas = _resizeCanvas;
	/* 初始化canvas元素大小，用于自适应 */
	Chart.prototype._setCanvasSize = _setCanvasSize;
	/* 初始化canvas */
	Chart.prototype._initChart = _initChart;
	/* 开启十字后鼠标移动的监听函数 */
	Chart.prototype._crosemousemove = _crosemousemove;
	/* 开启十字后鼠标移出的监听函数 */
	Chart.prototype._crosemouseout = _crosemouseout;
	/* 移除所有监听 */
	Chart.prototype._removeListeners = _removeListeners;
	/* 鼠标落下的监听 */
	Chart.prototype._handmovekeydown = _handmovekeydown;
	/* 鼠标抬起的监听 */
	Chart.prototype._handmovekeyup = _handmovekeyup;
	/* draw indicators */
	Chart.prototype._drawIndicators = _drawIndicators;
	Chart.prototype._drawHorLine = _drawHorLine;
	Chart.prototype._drawVerLine = _drawVerLine;
	Chart.prototype._verlineclick = _verlineclick;
	
	Chart.prototype._resetContext = _resetContext;
	
	Chart.prototype.ListenIndiVerLine = ListenIndiVerLine;
	
	/* return coordinate y of a point */
	Chart.prototype._getPointPrice = _getPointPrice;
	/* return coordinate x of a point */
	Chart.prototype._getPointTime = _getPointTime;
	
	/* draw history price */
	Chart.prototype._drawHistory = _drawHistory;
	
	/* draw background */
	Chart.prototype._drawBackground = _drawBackground;
	
	Chart.prototype._draw = _draw;
	/*draw round rect 画带圆角的矩形*/
	Chart.prototype._roundRect = _roundRect;
	
	/*更新及时图*/
	Chart.prototype.UpdateNowChart = UpdateNowChart;
	
	//画即使图坐标
	Chart.prototype._drawNowChartCoordinates = _drawNowChartCoordinates;
	//计算即时图纵坐标区间坐标区间
	Chart.prototype._resetNowChartScale = _resetNowChartScale;
	
	//计算即时图纵坐标区间坐标区间
	Chart.prototype._drawNowChart = _drawNowChart;
	//增加更多蜡烛数据
	Chart.prototype.AddCandleHistoryPirce = AddCandleHistoryPirce;
	//增加更多线图数据
	Chart.prototype.AddHistoryPirce = AddHistoryPirce;
	//loading控制 (bolean)
	Chart.prototype.LoadingShow = loadingShow;
	
	function _initChart(config) {
	    var _this = this;
	
	    Object.assign(_this.config, config);
	
	    /* 容器宽高 */
	
	    var canvasContainer = document.getElementById(_this.config.element); //配置Element中的canvas-wapper这个dom
	    // 清空容器里的所有东西
	    canvasContainer.innerHTML = '';
	    //创建包裹
	    var canvansWapper = document.createElement('div');
	    canvansWapper.id = 'canvans-wapper';
	    canvansWapper.style.position = 'relative';
	    canvansWapper.style.border = '1px solid rgb(226,226,226)';
	    canvansWapper.style.borderRadius = '5px';
	    canvansWapper.style.overflow = 'hidden';
	    canvansWapper.style.height = '100%';
	    canvansWapper.style.width = '100%';
	
	    var canvasLoading = document.createElement('div');
	    canvasLoading.className = 'loading-box-c';
	    _this.chartLoading = canvasLoading;
	    canvansWapper.appendChild(canvasLoading);
	
	    _this.canvansWapper = canvansWapper;
	    canvasContainer.appendChild(canvansWapper);
	    /* 创建绘图的canvas dom */
	    var newEle = document.createElement('canvas');
	    canvansWapper.appendChild(newEle);
	    _this.chartDom = newEle;
	    _this.chartContext = newEle.getContext('2d');
	
	    /* 创建背景canvas dom */
	    var newEle2 = document.createElement('canvas');
	    newEle2.style.position = 'absolute';
	    newEle2.style.left = '0';
	    newEle2.style.top = '0';
	    canvansWapper.appendChild(newEle2);
	    _this.iChartDom = newEle2;
	    _this.iChartContext = newEle2.getContext('2d');
	
	    //如果配置有创建即时图canvas dom
	    if (_this.config.operationtElement) {
	        var nowChartContainer = document.getElementById('tick-chart'),
	            newEle3 = document.createElement('canvas');
	        nowChartContainer.appendChild(newEle3);
	        _this.nowChartDom = newEle3;
	        _this.nowChartContext = newEle3.getContext('2d');
	        _this.nowChartDom.width = 160;
	        _this.nowChartDom.height = 160;
	    }
	    //根据配置调整canvas大小
	    _this._setCanvasSize();
	    //绑定拖动窗口时间重设canvas大小
	    _this._resizeCanvas();
	    _this.config._candleTimeInterval = _this.config.zoom * _this.candle[_this.config.candlePeriod].min;
	}
	
	/* 初始化 画图区域 */
	function _initDrawingScale() {
	    var _this = this;
	
	    /* 当前价格 */
	    var curPrice = void 0,
	        curPoint = void 0;
	    curPrice = _this.currentPricePair;
	
	    /* 绘图区域确定 */
	    var nowtime = void 0,
	        strokeLocation = void 0;
	    strokeLocation = _this.width - 120;
	    nowtime = _this.candleHistoryPrice[_this.candleHistoryPrice.length - 1][0];
	
	    var timeInterval = _this.config._candleTimeInterval;
	
	    _this.scaleLeft = [0, nowtime - (_this.width - 120) * timeInterval * 60000 / 60];
	    _this.scaleRight = [strokeLocation, nowtime];
	    _this.scaleTop = [100, 0];
	    _this.scaleBottom = [_this.height - 100, 0];
	}
	
	function _drawBackground() {
	    var _this = this;
	
	    var ctx = _this.chartContext,
	        w = _this.width,
	        h = _this.height;
	    _this._draw(['fillStyle'], function () {
	        ctx.fillStyle = _this.config.chartBackground || '#000';
	
	        ctx.beginPath();
	
	        ctx.moveTo(0, 0);
	        ctx.lineTo(w, 0);
	        ctx.lineTo(w, h);
	        ctx.lineTo(0, h);
	
	        ctx.fill();
	
	        ctx.closePath();
	    });
	}
	
	/*loading 显示 (bolean)*/
	function loadingShow(b) {
	    var _this = this;
	    if (b) {
	        _this.chartLoading.style.display = 'block';
	    } else {
	        _this.chartLoading.style.display = 'none';
	    }
	}
	
	/* 画网格，座标和横座标时间 */
	function _drawCoordinates() {
	    var _this = this;
	
	    var ctx = _this.chartContext,
	        // 绘图对象 在第蜡烛图上画
	    //timeInterval = _this.config._candleTimeInterval, // 网格间隔，1分钟
	    //nowPairs = _this.currentPricePair, // 最新的价格和时间对
	    // numOfVertical = _this.numOfVertical, //网格纵向数量
	    // numOfHorizental = _this.numOfHorizental, //网格横向数量
	    canvasWidth = _this.width,
	        canvasHeight = _this.height;
	
	    var boxWidth = 60,
	        // 单元格宽度
	    boxHeight = _this.config._boxHeight; // 单元格高度
	
	    /* 画网格 */
	    var i = void 0,
	        j = void 0;
	
	    /* 清空画布 */
	    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	
	    /* 虚线描述 */
	
	    ctx.strokeStyle = 'rgb(226,226,226)'; // 线颜色
	    //ctx.strokeStyle = '#000'; // 线颜色
	    ctx.fillStyle = 'rgb(150,150,150)'; // 字颜色
	    ctx.lineWidth = '1';
	    ctx.font = '10px Arial';
	
	    ctx.beginPath();
	
	    /* 画竖线(时间) */
	    for (i = 1; i < canvasWidth / boxWidth; i++) {
	        ctx.moveTo(_this.width - boxWidth * i, 0);
	        ctx.lineTo(_this.width - boxWidth * i, canvasHeight);
	        if (i % 2 === 0 && i > 2) {
	            /* 填充时间文本 */
	            ctx.fillText(_this._getPointTime(_this.width - boxWidth * i), _this.width - boxWidth * i + 3, canvasHeight - 7);
	        }
	    }
	
	    /* 画横线(价格) */
	
	    for (j = 1; j < canvasHeight / boxHeight; j++) {
	        ctx.moveTo(0, canvasHeight - boxHeight * j);
	        ctx.lineTo(canvasWidth, canvasHeight - boxHeight * j);
	
	        var text = _this._getPointPrice(canvasHeight - boxHeight * j);
	        var x_pos = canvasWidth - 54;
	
	        if (_this.config.currency.match('JPY') == null) {
	            ctx.fillText(text, x_pos, canvasHeight - boxHeight * j + 12);
	        } else {
	            ctx.fillText(Number(text).toFixed(3), x_pos - 3, canvasHeight - boxHeight * j + 12);
	        }
	    }
	
	    ctx.stroke();
	    ctx.closePath();
	}
	
	function _genVerticalScale() {
	    var _this = this;
	    var timePxRatio = void 0;
	    var viewPortLeft = void 0;
	    var viewPortRight = void 0;
	    timePxRatio = _this.config._candleTimeInterval * 1000 * 60 / 60;
	
	    viewPortLeft = _this.scaleLeft[1] - _this.scaleLeft[0] * timePxRatio;
	    //由于开始价格从倒数第二列开始画 因此要补充一列的时间
	    viewPortRight = _this.scaleRight[1] - _this.scaleLeft[0] * timePxRatio + _this.config._candleTimeInterval * 1000 * 60;
	    /* 当前价格 如果超出绘图scale则重新计算scale */
	    // let point = _this.currentPricePair;
	    // if (!point || !(point[1] < _this.scaleBottom[1] || point[1] > _this.scaleTop[1])) {
	    //     return;
	    // }
	
	    var max = -1,
	        min = 100000000,
	        price1 = void 0,
	        price2 = void 0,
	        startTime = _this.scaleLeft[1];
	
	    for (var i = _this.candleHistoryPrice.length - 1; i > 0; i--) {
	        price1 = _this.candleHistoryPrice[i];
	        if (price1[0] > viewPortLeft && price1[0] < viewPortRight) {
	            if (price1[2] > max) {
	                max = price1[2];
	            }
	            if (price1[3] < min) {
	                min = price1[3];
	            }
	        }
	    }
	    if (max - min < 0.00001) {
	        var tmax = -1,
	            tmin = 100000000;
	        for (var j = _this.candleHistoryPrice.length - 1; j >= 0; j--) {
	            price2 = _this.candleHistoryPrice[j];
	            if (price2[0] > viewPortLeft && price1[0] < viewPortRight) {
	                if (price2[2] > tmax) {
	                    tmax = price2[2];
	                }
	                if (price2[3] < tmin) {
	                    tmin = price2[3];
	                }
	            }
	        }
	        max = tmax;
	        min = tmin;
	    }
	    //计算单元格的高度
	    if (Math.ceil(Math.log(max - min) / Math.LN10) == -4) {
	        _this.config._boxHeight = 38;
	    } else {
	        _this.config._boxHeight = 42;
	    }
	    //_this.scaleTop[1] = parseFloat(max) + (parseFloat(max) - parseFloat(min)) / 2;
	    _this.scaleTop[1] = parseFloat(max);
	    //_this.scaleBottom[1] = parseFloat(min) - (parseFloat(max) - parseFloat(min)) / 2;
	    _this.scaleBottom[1] = parseFloat(min);
	}
	
	function _initTickChartStyle() {
	    var _this = this;
	    var context = _this.chartContext;
	
	    var gradient = _this.chartContext.createLinearGradient(0, _this.scaleBottom[0], 0, 0);
	    gradient.addColorStop(0, 'rgba(59, 196, 137, 0)');
	    gradient.addColorStop(0.15, 'rgba(59, 196, 137, 0.08)');
	    gradient.addColorStop(0.35, 'rgba(59, 196, 137, 0.4)');
	    gradient.addColorStop(0.5, 'rgba(59, 196, 137, 0.4)');
	    gradient.addColorStop(0.6, 'rgba(59, 196, 137, 0.6)');
	    gradient.addColorStop(1, 'rgba(59, 196, 137, 1)');
	
	    /* 重设为直线 */
	    context.setLineDash([0, 0]);
	
	    context.globalAlpha = 1;
	    context.lineWidth = 2; //折线图粗细
	    context.strokeStyle = "#3fbe93";
	    context.fillStyle = gradient;
	}
	
	function _drawHistory() {
	    var _this = this;
	
	    switch (_this.config.chartType) {
	        case "tick":
	            _this._drawTickHistoryPrice();
	            break;
	        case "candle":
	            _this._drawCandleHistoryPrice();
	            break;
	    }
	}
	
	function _startDrawingEngine() {
	    var _this = this;
	
	    /*
	     *
	     *  Drawing logics added below
	     *
	     * */
	    /* ============================================== */
	    var ctx = _this.chartContext;
	
	    /* 如果超出绘图scale则重新计算scale */
	    _this._genVerticalScale();
	
	    ctx.clearRect(0, 0, _this.width, _this.height);
	
	    // _this._drawBackground();
	
	    /* 画座标 */
	    _this._drawCoordinates();
	
	    /*画历史数据图*/
	    _this._drawHistory();
	
	    /* 画订单数据(for bo) */
	    // _this.drawDeals();
	
	    /* draw indicates */
	    _this._drawIndicators();
	
	    /* ============================================== */
	
	    /* 创建计时器 */
	    _this.globalDrawInterval = window.requestAnimationFrame(_this._startDrawingEngine.bind(_this));
	}
	
	function _resetContext() {
	    var _this = this;
	    var ctx = _this.chartContext;
	
	    /* 重设为直线 */
	    ctx.setLineDash([0, 0]);
	
	    ctx.globalAlpha = 1;
	}
	
	function _drawTickHistoryPrice() {
	    var _this = this;
	    var historyPrice = _this.historyPrice;
	    /* 历史数据长度 */
	    var allLength = historyPrice.length;
	    /* 最新数据 */
	    var currentPricePair = _this.currentPricePair;
	
	    if (!currentPricePair) {
	        return;
	    }
	
	    _this._draw(['globalAlpha', 'lineWidth', 'strokeStyle', 'fillStyle'], function () {
	
	        /* 最新数据对应的图上的点 */
	        var currentPoint = _this._getPoint(currentPricePair);
	        var lastLinePoint = _this._getPoint(historyPrice[allLength - 1]);
	        /* ctx */
	        var context = _this.chartContext;
	
	        _this._initTickChartStyle();
	
	        /* 画线 */
	        context.beginPath();
	
	        context.moveTo(lastLinePoint[0], currentPoint[1]);
	
	        var price = void 0,
	            point = void 0;
	
	        /* 记录循环中的横座标，如果上一个与当前相同则不画线，避免出现竖线 */
	        var tmp = [];
	        /* 清空记录十字可移动的点 */
	        _this.crossLinePoint = [];
	
	        context.moveTo.apply(context, currentPoint);
	        for (var i = allLength - 1; i > 0; i--) {
	            price = _this.historyPrice[i];
	
	            point = _this._getPoint(price);
	
	            if (point[0] === tmp[0]) {
	                continue;
	            }
	
	            /* curve */
	            //let xc = (point[0] + nextPoint[0]) / 2;
	            //let yc = (point[1] + nextPoint[1]) / 2;
	            //context.quadraticCurveTo(point[0], point[1], xc, yc);
	
	            /* not curve */
	            context.lineTo(point[0], point[1]);
	            _this.crossLinePoint.push(point[0]);
	            tmp = point;
	        }
	
	        context.stroke();
	        /* 画渐变 */
	        context.lineTo(0, _this.scaleBottom[0]);
	        context.lineTo(currentPoint[0], _this.scaleBottom[0]);
	        context.fill();
	
	        context.closePath();
	        /* 移动小绿点 */
	        _this._drawLatestLine(currentPricePair, currentPoint);
	    });
	
	    //_this._resetContext();
	}
	
	function _drawCandleHistoryPrice() {
	    var _this = this;
	
	    var context = _this.chartContext,
	        allcandleslen = _this.candleHistoryPrice.length,
	        allcandles = _this.candleHistoryPrice,
	        mintime = _this.scaleLeft[0],
	        g = void 0,
	        candles = [],
	        period = _this.candle[_this.config.candlePeriod].period;
	
	    /* 重设为直线 */
	    context.setLineDash([0, 0]);
	
	    /* 清空记录十字可移动的点 */
	    _this.crossLinePoint = [];
	    for (var i = allcandleslen; i > 0; i--) {
	        _this._drawCandle.call(_this, allcandles[i - 1], context);
	    }
	    var currentPricePair = _this.currentPricePair;
	    var currentPoint = _this._getPoint(currentPricePair);
	
	    _this._drawLatestLine(currentPricePair, currentPoint);
	}
	
	function SwitchTimeInterval(m) {
	
	    this.config.candlePeriod = m;
	
	    this.config._candleTimeInterval = this.config.zoom * this.candle[m].min;
	
	    this._initDrawingScale();
	}
	
	function _drawCandle(candle, context) {
	    var _this = this;
	    var margin = void 0;
	    var zoom = _this.config.zoom;
	    var candleMargin = _this.config._candleMargin;
	    var candleTimeStamp = candle[0];
	    var startp = _this._getPoint([candle[0], candle[1]]); //开盘
	    var endp = _this._getPoint([candle[0], candle[4]]);
	    var mx = _this._getPoint([candle[0], candle[2]]);
	    var mn = _this._getPoint([candle[0], candle[3]]);
	    //根据zoom计算蜡烛的宽度的1/2
	    switch (true) {
	        case zoom == 1:
	            margin = 17;
	            break;
	        case zoom == 3:
	            margin = 5;
	            break;
	        case zoom == 5:
	            margin = 3;
	            break;
	        case zoom == 7:
	            margin = 2;
	            break;
	        case zoom == 9:
	            margin = 1.5;
	            break;
	        case zoom == 11:
	            margin = 0.5;
	            break;
	        default:
	
	    }
	    context.save();
	    context.beginPath();
	    context.moveTo(0, 0);
	    context.lineTo(_this.width - 60, 0);
	    context.lineTo(_this.width - 60, _this.height);
	    context.lineTo(0, _this.height);
	    context.lineTo(0, 0);
	    context.closePath();
	    context.clip();
	    context.beginPath();
	    var green = _this.config.candleRiseColor;
	    var red = _this.config.candleFallColor;
	
	    if (startp[1] === endp[1]) {
	        /* 开盘价和收盘价相等 */
	        context.lineWidth = "1";
	
	        /* 画贯穿蜡烛的竖线,最高和最低 */
	        context.moveTo(mx[0], mx[1]);
	        context.lineTo(mn[0], mn[1]);
	
	        /* 画一条横线 */
	        context.moveTo(startp[0] - margin, startp[1]);
	        context.lineTo(endp[0] + margin, endp[1]);
	        context.stroke();
	    } else {
	        if (startp[1] > endp[1]) {
	            context.fillStyle = green;
	            context.strokeStyle = green;
	        } else {
	            context.fillStyle = red;
	            context.strokeStyle = red;
	        }
	
	        /* 画贯穿蜡烛的竖线 */
	        context.moveTo(mx[0], mx[1]);
	        context.lineTo(mn[0], mn[1]);
	        context.stroke();
	
	        /* 画蜡烛 */
	        if (startp[1] > endp[1]) {
	            /* 绿 */
	            context.fillStyle = green;
	            context.strokeStyle = green;
	        } else {
	            /* 红 */
	            context.fillStyle = red;
	            context.strokeStyle = red;
	        }
	
	        /*
	           startp: 左下角点
	           endp: 右上角点
	           */
	
	        context.fillRect(startp[0] - margin, startp[1], 2 * margin, endp[1] - startp[1]);
	
	        context.closePath();
	    }
	    context.restore();
	    /* 加一个蜡烛中心点，十字可停留 */
	    _this.crossLinePoint.push(startp[0]);
	}
	/* 画横线 */
	function _drawLatestLine(curPrice, coor) {
	    var _this = this,
	        ctx = _this.chartContext,
	        curPriceAll = parseFloat(curPrice[1]).toFixed(5) + '',
	        curPriceBig = curPriceAll.slice(0, 5),
	        curPriceSmall = curPriceAll.slice(5, 8);
	    ctx.strokeStyle = _this.config.currentPriceLineColor;
	    ctx.save();
	    ctx.beginPath();
	    ctx.moveTo(0, coor[1]);
	    ctx.lineTo(_this.width, coor[1]);
	    ctx.stroke();
	    ctx.closePath();
	
	    ctx.beginPath();
	    // ctx.moveTo(_this.width - 50,);
	    // ctx.lineTo(_this.width - 50, coor[1] + 10);
	    // ctx.lineTo(_this.width, coor[1] + 10);
	    // ctx.lineTo(_this.width, coor[1] - 10);
	    ctx.fillStyle = _this.config.currentPriceLabelColor;
	    _this._roundRect(_this.width - 82, coor[1] - 15, 80, 30, 3, ctx);
	    ctx.moveTo(_this.width - 82, coor[1] - 5);
	    ctx.lineTo(_this.width - 87, coor[1]);
	    ctx.lineTo(_this.width - 82, coor[1] + 5);
	    ctx.lineTo(_this.width - 82, coor[1] - 5);
	    ctx.fill();
	
	    ctx.closePath();
	
	    ctx.fillStyle = '#fff';
	    ctx.beginPath();
	    if (_this.config.currency.match('JPY') == null) {
	        ctx.font = '10px Arial';
	        ctx.fillText(curPriceBig, _this.width - 67, coor[1] + 5);
	        ctx.font = '16px Arial';
	        ctx.fillText(curPriceSmall, _this.width - 35, coor[1] + 5);
	    } else {
	        ctx.font = '10px Arial';
	        ctx.fillText(parseFloat(curPrice[1]).toFixed(3), _this.width - 60, coor[1] + 5);
	    }
	    ctx.fill();
	    ctx.restore();
	}
	
	function ChangeChartType(newtype) {
	    var self = this;
	
	    if (!self.supportChartType.includes(newtype)) {
	        throw new Error('invalid chart type');
	    }
	
	    self.config.chartType = newtype;
	}
	
	function _getPoint(point) {
	    //获取某一个价格对【time,price】 在图上的横纵坐标
	    if (!point) {
	        return;
	    }
	    var _this = this;
	    var coordinate = [];
	    /* 时间和坐标比 */
	    var pointInterval = _this.config._candleTimeInterval * 60000 / 60;
	    /* 左边距 + 时间单位 * （价格时间 - 左边时间） */
	    coordinate[0] = Math.round(_this.scaleRight[0] - (_this.scaleRight[1] - point[0]) * 10000000000000000000000000000000000000000000000000000000000 / pointInterval / 10000000000000000000000000000000000000000000000000000000000);
	
	    /* 座标和价格比 */
	    pointInterval = (_this.scaleTop[1] - _this.scaleBottom[1]) / (_this.scaleBottom[0] - _this.scaleTop[0]);
	    /*  */
	    coordinate[1] = Math.round(_this.scaleTop[0] + (_this.scaleTop[1] - point[1]) / pointInterval);
	
	    return coordinate;
	}
	
	/* 判断是否应该回退 */
	function _shouldGenHorizentalScale(price) {
	    var _this = this;
	
	    var timeInterval = _this.config._candleTimeInterval;
	
	    if (price[0] > _this.scaleRight[1] + timeInterval * 60 * 1000 / _this.config.zoom) {
	        return true;
	    } else {
	        return false;
	    }
	}
	
	/* 修改为  重设横座标scale */
	function GenHorizentalScale(reset, curPrice) {
	    var _this = this;
	
	    /* 当前价格 */
	    curPrice = curPrice || _this.currentPricePair;
	
	    if (!reset && !_this._shouldGenHorizentalScale(curPrice)) {
	        return;
	    }
	
	    /* 总计时器未设定，不回退 */
	    if (!this.globalDrawInterval) {
	        return;
	    }
	
	    /* 最后一个 */
	    var nowtime = void 0,
	        strokeLocation = void 0;
	    strokeLocation = _this.width - 120;
	
	    nowtime = _this.candleHistoryPrice[_this.candleHistoryPrice.length - 1][0];
	    var timeInterval = _this.config._candleTimeInterval;
	    // _this.scaleLeft = [0, nowtime - (_this.width-120) * timeInterval * 60000/60];
	    // _this.scaleRight = [strokeLocation, nowtime];
	    _this.scaleLeft[1] = nowtime - (_this.width - 120) * timeInterval * 60000 / 60;
	    _this.scaleRight[1] = nowtime;
	}
	
	function AddCandleHistoryPrice(data) {
	    var _this = this;
	
	    /* 判断最后一个的时间 */
	    if (!_this.currentPricePair) {
	        return;
	    }
	    /* 过滤重复数据 */
	    if (_this.currentPricePair[0] === data[0]) {
	        return;
	    }
	
	    var last = _this.candleHistoryPrice[_this.candleHistoryPrice.length - 1];
	    if (!last) {
	        return;
	    }
	    var time = void 0,
	        open = void 0,
	        close = void 0,
	        high = void 0,
	        low = void 0;
	    var period = _this.candle[_this.config.candlePeriod].period;
	
	    if (parseInt(data[0]) > parseInt(last[0]) + period) {
	        /* new candle */
	        _this.candleHistoryPrice.push([parseInt(last[0]) + period, data[1], data[1], data[1], data[1]]);
	        _this.historyPrice.push([parseInt(data[0], data[1])]);
	        _this.candleHistoryPrice.shift();
	        _this.historyPrice.shift();
	    } else {
	        /* update last */
	        time = last[0];
	        open = last[1];
	        close = data[1];
	        high = parseFloat(data[1]) > parseFloat(last[2]) ? data[1] : last[2];
	        low = parseFloat(data[1]) > parseFloat(last[3]) ? last[3] : data[1];
	
	        _this.candleHistoryPrice.pop();
	        _this.candleHistoryPrice.push([time, open, high, low, close]);
	
	        _this.historyPrice.pop();
	        _this.historyPrice.push([time, close]);
	    }
	
	    _this.currentPricePair = data;
	}
	
	function StopDraw() {
	    window.cancelAnimationFrame(this.globalDrawInterval);
	    delete this.globalDrawInterval;
	}
	
	function StartDraw() {
	    if (!this.globalDrawInterval) {
	        this._startDrawingEngine();
	    }
	}
	
	function _removeListeners() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    dom.onmouseup = null;
	    dom.onmousedown = null;
	    dom.onmouseout = null;
	    dom.onmousemove = null;
	    dom.onclick = null;
	}
	
	function ListenMoveChart() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    _this.config.handmove = true;
	
	    _this._removeListeners();
	
	    dom.onmousedown = _this._handmovekeydown.bind(_this);
	    dom.onmouseup = _this._handmovekeyup.bind(_this);
	}
	
	function _handmovekeydown() {
	    var _this = this;
	    var dom = _this.iChartDom;
	    var minMoveDistance = 60 / this.config.zoom;
	    var tmpx = void 0;
	    var timePxRatio = this.config._candleTimeInterval * 60 * 1000 / 60;
	    dom.onmousemove = function (e) {
	        var x = void 0,
	            dis = void 0;
	        x = e.offsetX;
	        if (tmpx) {
	            dis = Math.round((x - tmpx) / minMoveDistance * 2) * minMoveDistance;
	            _this.scaleLeft[0] += dis;
	            _this.scaleRight[0] += dis;
	        }
	        tmpx = x;
	        var viewPortLeft = _this.scaleLeft[1] - _this.scaleLeft[0] * timePxRatio;
	        if (viewPortLeft < _this.candleHistoryPrice[0][0]) {
	            _this.parent.askAddMoreHistoryPirce(_this.candleHistoryPrice[0][0]);
	        }
	    };
	}
	
	function _handmovekeyup() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    dom.onmousemove = null;
	}
	
	function ListenIndiVerLine() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    _this.config.indi.verlineon = true;
	
	    _this._removeListeners();
	
	    dom.onclick = _this._verlineclick.bind(_this);
	}
	
	function _verlineclick(e) {
	    var _this = this;
	
	    var y = e.offsetY;
	
	    _this.indicators.horLine = y;
	}
	
	function _listenCross() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    _this.config._crosson = true;
	
	    _this._removeListeners();
	
	    dom.onmouseout = _this._crosemouseout.bind(_this);
	    dom.onmousemove = _this._crosemousemove.bind(_this);
	}
	
	function _crosemouseout() {
	    var _this = this;
	    var ctx = _this.iChartContext;
	    var width = _this.width;
	    var height = _this.height;
	    ctx.clearRect(0, 0, width, height);
	}
	
	function _crosemousemove(e) {
	    var _this = this;
	    var ctx = _this.iChartContext,
	        points = _this.crossLinePoint;
	    var x = e.offsetX;
	    var y = e.offsetY;
	    var width = _this.width;
	    var height = _this.height;
	    ctx.save();
	
	    /* 找到最近的可停靠点 */
	    var len = points.length;
	    var i = void 0,
	        t = void 0,
	        hint = void 0,
	        tmp = void 0;
	
	    if (x >= points[0]) {
	        x = points[0];
	    } else if (x <= points[len - 1]) {
	        x = points[len - 1];
	    } else {
	        tmp = Number.MAX_VALUE;
	        for (i = 0; i < len; i++) {
	            t = Math.abs(points[i] - x);
	            if (t > tmp) {
	                break;
	            } else {
	                hint = points[i];
	                tmp = t;
	            }
	        }
	        x = hint;
	    }
	
	    ctx.clearRect(0, 0, width, height);
	
	    ctx.beginPath();
	
	    ctx.moveTo(x, 0);
	    ctx.lineTo(x, y - 12);
	    ctx.moveTo(x, y - 10);
	    ctx.lineTo(x, y + 10);
	    ctx.moveTo(x, y + 12);
	    ctx.lineTo(x, height);
	    ctx.moveTo(0, y);
	    ctx.lineTo(x - 12, y);
	    ctx.moveTo(x - 10, y);
	    ctx.lineTo(x + 10, y);
	    ctx.moveTo(x + 12, y);
	    ctx.lineTo(width, y);
	    ctx.strokeStyle = _this.config.croseLineColor;
	    ctx.lineWidth = 1;
	    ctx.globalAlpha = _this.config.croseLineOpactiy;
	    ctx.stroke();
	
	    /* 画纵座标小框 */
	    ctx.fillStyle = _this.config.currentPriceLabelColor;
	    ctx.globalAlpha = _this.config.croseLableOpacity;
	    _this._roundRect(x - 50, height - 26, 100, 24, 3, ctx);
	    ctx.fill();
	    /* 画横座标小框 */
	    _this._roundRect(width - 62, y - 12, 60, 24, 3, ctx);
	
	    ctx.fill();
	
	    /* 填充文本 */
	    ctx.font = '10px Arial';
	    ctx.globalAlpha = 1;
	    ctx.fillStyle = '#fff';
	
	    if (_this.config.currency.match('JPY') == null) {
	        ctx.fillText(_this._getPointPrice(y), width - 54, y + 5);
	    } else {
	        ctx.fillText(Number(_this._getPointPrice(y)).toFixed(3), width - 54, y + 5);
	    }
	
	    ctx.fillText(_this._getPointTime(x), x - 32, height - 9);
	    ctx.restore();
	}
	
	function _stopListenCross() {
	    var _this = this;
	    var dom = _this.iChartDom;
	
	    _this.config._crosson = false;
	
	    dom.onmouseout = null;
	    dom.onmousemove = null;
	}
	
	function StopListenMoveChart() {
	    var _this = this;
	
	    var dom = _this.iChartDom;
	
	    _this.config.handmove = false;
	
	    _this._initDrawingScale();
	
	    dom.onmousedown = null;
	    dom.onmouseup = null;
	}
	
	function SetHistoryPrice(msg) {
	    var _this = this;
	
	    _this.currentPricePair = msg[msg.length - 1];
	
	    _this.historyPrice = msg;
	    _this._initDrawingScale();
	
	    return _this;
	}
	
	function SetCandleHistory(msg) {
	    var _this = this;
	
	    _this.candleHistoryPrice = msg;
	
	    return _this;
	}
	
	function Zoom(plus) {
	    var _this = this;
	
	    var m = _this.config.candlePeriod;
	
	    if (plus && _this.config.zoom > 1) {
	        /* zoom out */
	        _this.config.zoom -= 2;
	        _this.config._candleTimeInterval = _this.config.zoom * _this.candle[m].min;
	    } else if (!plus && _this.config.zoom < 13) {
	        _this.config.zoom += 2;
	        _this.config._candleTimeInterval = _this.config.zoom * _this.candle[m].min;
	    }
	
	    _this._initDrawingScale();
	}
	
	function _drawIndicators() {
	    var _this = this;
	
	    _this._drawHorLine();
	    _this._drawVerLine();
	}
	
	function _drawVerLine() {
	    var _this = this;
	    var point = _this.indicators.verLine;
	
	    if (!point) {
	        return;
	    }
	
	    var ctx = _this.chartContext;
	
	    ctx.strokeStyle = '#f00';
	    ctx.fillStyle = '#f00';
	    ctx.lineWidth = 2;
	
	    ctx.beginPath();
	
	    ctx.moveTo(point, 0);
	    ctx.lineTo(point, _this.height);
	    ctx.closePath();
	
	    /* */
	    ctx.moveTo(point - 42, _this.height - 18);
	    ctx.lineTo(point + 42, _this.height - 18);
	    ctx.lineTo(point + 42, _this.height);
	    ctx.lineTo(point - 42, _this.height);
	
	    ctx.fill();
	
	    ctx.fillStyle = '#fff';
	    /* 填充文本 */
	    ctx.fillText(_this._getPointTime(point), point - 40, _this.height - 18);
	
	    ctx.stroke();
	}
	
	function _drawHorLine() {
	    var _this = this;
	    var point = _this.indicators.horLine;
	
	    if (!point) {
	        return;
	    }
	
	    var ctx = _this.chartContext;
	
	    ctx.strokeStyle = '#f00';
	    ctx.fillStyle = '#f00';
	    ctx.lineWidth = 2;
	
	    ctx.beginPath();
	
	    ctx.moveTo(0, point);
	    ctx.lineTo(_this.width, point);
	    ctx.closePath();
	
	    /* 画横座标小框 */
	    ctx.moveTo(_this.width - 50, point - 10);
	    ctx.lineTo(_this.width, point - 10);
	    ctx.lineTo(_this.width, point + 10);
	    ctx.lineTo(_this.width - 50, point + 10);
	
	    ctx.fill();
	
	    ctx.fillStyle = '#fff';
	    /* 填充文本 */
	    ctx.fillText(_this.getPointPrice(point), _this.width - 48, point + 5);
	
	    ctx.stroke();
	}
	
	function _getPointPrice(y) {
	    var _this = this;
	    var proption = void 0;
	    proption = (_this.scaleBottom[0] - _this.scaleTop[0]) / (_this.scaleTop[1] - _this.scaleBottom[1]);
	    return (_this.scaleTop[1] - (y - _this.scaleTop[0]) * 100000000000000 / proption / 100000000000000).toFixed(5);
	}
	
	function _getPointTime(x) {
	    var _this = this;
	    var xproption = void 0,
	        nowmonth = void 0,
	        nowday = void 0,
	        mini = void 0,
	        nowtime = void 0,
	        nowhours = void 0;
	    xproption = (_this.scaleRight[1] - _this.scaleLeft[1]) / (_this.scaleRight[0] - _this.scaleLeft[0]);
	    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    nowtime = new Date(Math.ceil(parseInt(_this.scaleLeft[1]) + xproption * (x - _this.scaleLeft[0])));
	    nowmonth = month[nowtime.getUTCMonth()];
	    nowday = nowtime.getUTCDate();
	    mini = nowtime.getUTCMinutes();
	    if (mini < 10) {
	        mini = '0' + mini;
	    }
	    nowhours = nowtime.getUTCHours();
	    if (nowhours < 10) {
	        nowhours = '0' + nowhours;
	    }
	    if (nowtime.getUTCSeconds() > 0) {
	        mini++;
	    }
	    return nowday + ' ' + nowmonth + ' ' + nowhours + ':' + mini;
	}
	
	function _drawBox(color) {
	    var _this = this;
	
	    var ctx = _this.chartContext;
	
	    ctx.fillStyle = color;
	    ctx.strokeStyle = color;
	}
	
	function _draw(resets, func) {
	    var _this = this;
	
	    var ctx = _this.chartContext;
	
	    var original = [];
	    resets.forEach(function (item) {
	        if (ctx[item]) {
	            original.push(ctx[item]);
	        }
	    });
	
	    if (original.length !== resets.length) {
	        throw new Error('Draw error');
	    }
	
	    func.apply(_this);
	
	    resets.forEach(function (item, index) {
	        ctx[item] = original[index];
	    });
	}
	
	function ToggleCross() {
	    var _this = this;
	
	    if (_this.config._crosson) {
	        _this._stopListenCross();
	    } else {
	        _this._listenCross();
	    }
	}
	function _setCanvasSize() {
	    var _this = this;
	    var w = _this.config.width || document.getElementById('canvans-wapper').offsetWidth;
	    var h = _this.config.height || document.getElementById('canvans-wapper').offsetHeight;
	
	    _this.width = w;
	    _this.height = h;
	    _this.chartDom.width = w;
	    _this.chartDom.height = h;
	    _this.iChartDom.width = w;
	    _this.iChartDom.height = h;
	}
	function _resizeCanvas() {
	    var _this = this;
	    window.addEventListener("resize", function () {
	
	        /* 如果窗口拉伸计算canvas尺寸 */
	        _this._setCanvasSize();
	        _this._initDrawingScale();
	    });
	}
	function _roundRect(x, y, w, h, r, ctx) {
	    var min_size = Math.min(w, h);
	    if (r > min_size / 2) {
	        r = min_size / 2;
	    }
	    ctx.beginPath();
	    ctx.moveTo(x + r, y);
	    ctx.arcTo(x + w, y, x + w, y + h, r);
	    ctx.arcTo(x + w, y + h, x, y + h, r);
	    ctx.arcTo(x, y + h, x, y, r);
	    ctx.arcTo(x, y, x + w, y, r);
	    ctx.closePath();
	}
	function UpdateNowChart(data) {
	    var _this = this,
	        ctx = _this.nowChartContext,
	        ctxHeight = _this.nowChartDom.height,
	        ctxWidth = _this.nowChartDom.width,
	        nowChartPrice = _this.nowChartPrice,
	        verticalScale = void 0;
	    //处理即时图数据，如果超过40条则删除最早，加入最晚
	    if (nowChartPrice.length == 40) {
	        nowChartPrice.shift();
	        nowChartPrice.push(data);
	    } else {
	        nowChartPrice.push(data);
	    }
	    //计算纵坐标区间
	    verticalScale = _this._resetNowChartScale();
	    //清空即时图
	    ctx.clearRect(0, 0, ctxWidth, ctxHeight);
	    //画作标
	    _this._drawNowChartCoordinates(verticalScale.max, verticalScale.min);
	    //画图
	    _this._drawNowChart(verticalScale.max, verticalScale.min);
	}
	function _drawNowChartCoordinates(max, min) {
	    var _this = this,
	        ctx = _this.nowChartContext,
	        ctxHeight = _this.nowChartDom.height,
	        ctxWidth = _this.nowChartDom.width,
	        rate = void 0;
	    rate = 150 / (max - min);
	    ctx.save();
	    ctx.lineWidth = 0.5;
	    ctx.strokeStyle = 'rgb(226,226,226)'; // 线颜色
	    ctx.fillStyle = 'rgb(150,150,150)';
	    ctx.font = '10px Arial';
	    //画坐标
	    ctx.beginPath();
	    for (var i = 1; i < 6; i++) {
	        var priceText;
	        priceText = parseFloat(max - (i * 32 - 5) / rate);
	        ctx.moveTo(0, i * 32);
	        ctx.lineTo(ctxWidth, i * 32);
	        if (_this.config.currency.match('JPY') == null) {
	            ctx.fillText(priceText.toFixed(5), ctxWidth - 48, i * 32 - 5);
	        } else {
	            ctx.fillText(priceText.toFixed(3), ctxWidth - 48, i * 32 - 5);
	        }
	    }
	    ctx.stroke();
	    ctx.closePath();
	    ctx.restore();
	}
	function _resetNowChartScale() {
	    var _this = this,
	        max = -1,
	        min = 100000000,
	        nowChartPrice = _this.nowChartPrice;
	    for (var i = 0; i < nowChartPrice.length; i++) {
	        if (nowChartPrice[i][1] < min) {
	            min = nowChartPrice[i][1];
	        }
	        if (nowChartPrice[i][2] > max) {
	            max = nowChartPrice[i][2];
	        }
	    }
	    return {
	        'max': max,
	        'min': min
	    };
	}
	function _drawNowChart(max, min) {
	
	    var _this = this,
	        ctx = _this.nowChartContext,
	        ctxHeight = _this.nowChartDom.height,
	        nowChartPrice = _this.nowChartPrice,
	        ctxWidth = _this.nowChartDom.width,
	        rate = 140 / (max - min),
	        bidY = void 0,
	        askY = void 0;
	    //bid线条
	    ctx.save();
	    ctx.beginPath();
	    ctx.strokeStyle = '#3d63ae';
	    ctx.fillStyle = '#3d63ae';
	    ctx.font = '10px Arial';
	    for (var i = 0; i < nowChartPrice.length; i++) {
	        bidY = 10 + (max - nowChartPrice[i][1]) * rate;
	        if (i == 0) {
	            ctx.moveTo(0, bidY);
	        }
	        ctx.lineTo(2.25 * i, bidY);
	    }
	    ctx.lineTo(ctxWidth, bidY);
	
	    ctx.stroke();
	    ctx.closePath();
	    if (_this.config.currency.match('JPY') == null) {
	        _this._roundRect(ctxWidth - 55, bidY - 7.5, 55, 15, 3, ctx);
	    } else {
	        _this._roundRect(ctxWidth - 53, bidY - 7.5, 55, 15, 3, ctx);
	    }
	    ctx.fill();
	    //ask线条
	    ctx.beginPath();
	    ctx.strokeStyle = '#d22c39';
	    ctx.fillStyle = '#d22c39';
	    for (var _i = 0; _i < nowChartPrice.length; _i++) {
	        askY = 10 + (max - nowChartPrice[_i][2]) * rate;
	        if (_i == 0) {
	            ctx.moveTo(0, askY);
	        }
	        ctx.lineTo(2.25 * _i, askY);
	    }
	    ctx.lineTo(ctxWidth, askY);
	    ctx.stroke();
	    ctx.closePath();
	    if (_this.config.currency.match('JPY') == null) {
	        _this._roundRect(ctxWidth - 55, askY - 7.5, 55, 15, 3, ctx);
	    } else {
	        _this._roundRect(ctxWidth - 53, askY - 7.5, 55, 15, 3, ctx);
	    }
	
	    ctx.fill();
	    ctx.fillStyle = '#fff';
	    //bid和ask 标签价格文字
	    if (_this.config.currency.match('JPY') == null) {
	        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length - 1][1]).toFixed(5), ctxWidth - 50, bidY + 4.5);
	        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length - 1][2]).toFixed(5), ctxWidth - 50, askY + 4.5);
	    } else {
	        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length - 1][1]).toFixed(3), ctxWidth - 48, bidY + 4.5);
	        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length - 1][2]).toFixed(3), ctxWidth - 48, askY + 4.5);
	    }
	
	    ctx.restore();
	}
	function AddCandleHistoryPirce(data) {
	    var _this = this;
	    _this.candleHistoryPrice = data.concat(_this.candleHistoryPrice);
	}
	function AddHistoryPirce(data) {
	    var _this = this;
	    _this.historyPrice = data.concat(_this.historyPrice);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = __webpack_require__(3);
	
	var Tools = function () {
	    function Tools(config, engine) {
	        _classCallCheck(this, Tools);
	
	        var _this = this;
	
	        _this._engine = engine;
	
	        _this._id = Dom.initDom(config.toolBarElement);
	
	        _this._createVm(config.toolBarElement);
	    }
	
	    _createClass(Tools, [{
	        key: '_createVm',
	        value: function _createVm(id) {
	            var _this2 = this;
	
	            var _this = this;
	
	            _this.vm = new Vue({
	                el: '#' + id,
	                data: {
	                    user: '',
	                    password: '',
	                    symbolList: ["AUDCAD", "AUDCHF", "AUDJPY", "AUDUSD", "CADCHF", "CADJPY", "EURAUD", "EURCAD", "EURCHF", "EURGBP", "EURJPY", "EURNZD", "EURUSD", "GBPAUD", "GBPCAD", "GBPCHF", "GBPJPY", "GBPNZD", "GBPUSD", "NZDCAD", "NZDCHF", "NZDJPY", "NZDUSD", "USDCAD", "USDCHF", "USDJPY"],
	                    nowSymbol: 'GBPUSD',
	                    symbolListShow: false,
	                    nowPeriod: 'M1',
	                    periodList: ['M1', 'M5', 'M15', 'M30'],
	                    periodListShow: false,
	                    nowPrice: {
	                        'AUDCAD': ['0.00000', '0.00000'],
	                        'AUDCHF': ['0.00000', '0.00000'],
	                        'AUDJPY': ['0.000', '0.000'],
	                        'AUDUSD': ['0.00000', '0.00000'],
	                        'CADCHF': ['0.00000', '0.00000'],
	                        'CADJPY': ['0.000', '0.000'],
	                        'EURAUD': ['0.00000', '0.00000'],
	                        'EURCAD': ['0.00000', '0.00000'],
	                        'EURCHF': ['0.00000', '0.00000'],
	                        'EURGBP': ['0.00000', '0.00000'],
	                        'EURJPY': ['0.000', '0.000'],
	                        'EURNZD': ['0.00000', '0.00000'],
	                        'EURUSD': ['0.00000', '0.00000'],
	                        'GBPAUD': ['0.00000', '0.00000'],
	                        'GBPCAD': ['0.00000', '0.00000'],
	                        'GBPCHF': ['0.00000', '0.00000'],
	                        'GBPJPY': ['0.000', '0.000'],
	                        'GBPNZD': ['0.00000', '0.00000'],
	                        'GBPUSD': ['0.00000', '0.00000'],
	                        'NZDCAD': ['0.00000', '0.00000'],
	                        'NZDCHF': ['0.00000', '0.00000'],
	                        'NZDJPY': ['0.000', '0.000'],
	                        'NZDUSD': ['0.00000', '0.00000'],
	                        'USDCAD': ['0.00000', '0.00000'],
	                        'USDCHF': ['0.00000', '0.00000'],
	                        'USDJPY': ['0.000', '0.000']
	                    },
	                    prePrice: {
	                        'AUDCAD': ['0.00000', '0.00000'],
	                        'AUDCHF': ['0.00000', '0.00000'],
	                        'AUDJPY': ['0.000', '0.000'],
	                        'AUDUSD': ['0.00000', '0.00000'],
	                        'CADCHF': ['0.00000', '0.00000'],
	                        'CADJPY': ['0.000', '0.000'],
	                        'EURAUD': ['0.00000', '0.00000'],
	                        'EURCAD': ['0.00000', '0.00000'],
	                        'EURCHF': ['0.00000', '0.00000'],
	                        'EURGBP': ['0.00000', '0.00000'],
	                        'EURJPY': ['0.000', '0.000'],
	                        'EURNZD': ['0.00000', '0.00000'],
	                        'EURUSD': ['0.00000', '0.00000'],
	                        'GBPAUD': ['0.00000', '0.00000'],
	                        'GBPCAD': ['0.00000', '0.00000'],
	                        'GBPCHF': ['0.00000', '0.00000'],
	                        'GBPJPY': ['0.000', '0.000'],
	                        'GBPNZD': ['0.00000', '0.00000'],
	                        'GBPUSD': ['0.00000', '0.00000'],
	                        'NZDCAD': ['0.00000', '0.00000'],
	                        'NZDCHF': ['0.00000', '0.00000'],
	                        'NZDJPY': ['0.000', '0.000'],
	                        'NZDUSD': ['0.00000', '0.00000'],
	                        'USDCAD': ['0.00000', '0.00000'],
	                        'USDCHF': ['0.00000', '0.00000'],
	                        'USDJPY': ['0.000', '0.000']
	                    },
	                    nowChart: 'Candle',
	                    chartListShow: false,
	                    chartList: ['Candle', 'Line'],
	                    raiseColor: '#D0011B',
	                    fallColor: '#1A74DD'
	                },
	                methods: {
	                    ChangeChartType: function ChangeChartType(type) {
	                        _this._engine.ChangeChartType(type);
	                    },
	                    SwitchTimeInterval: function SwitchTimeInterval(m) {
	                        _this._engine.SwitchTimeInterval(m);
	                    },
	                    Zoom: function Zoom(plus) {
	                        _this._engine.Zoom(plus);
	                    },
	                    Cross: function Cross() {
	                        _this._engine.ToggleCross();
	                    },
	                    Move: function Move() {
	                        _this._engine.ToggleHangMove(true);
	                    },
	
	                    close: function close() {
	                        _this._engine.close();
	                    },
	                    login: function login() {
	                        _this._engine.login(_this.vm.user, _this.vm.password);
	                    },
	                    logout: function logout() {
	                        _this._engine.logout();
	                    },
	                    toggleSymbol: function toggleSymbol() {
	                        _this2.vm.symbolListShow = !_this2.vm.symbolListShow;
	                    },
	                    changeSymbol: function changeSymbol(index) {
	                        _this2.vm.nowSymbol = _this2.vm.symbolList[index];
	                        _this2.vm.symbolListShow = false;
	                        _this._engine.ChangeSymbol(_this2.vm.symbolList[index]);
	                    },
	                    togglePeriod: function togglePeriod() {
	                        _this2.vm.periodListShow = !_this2.vm.periodListShow;
	                    },
	                    changePeriod: function changePeriod(index) {
	                        _this2.vm.nowPeriod = _this2.vm.periodList[index];
	                        _this2.vm.periodListShow = false;
	                        _this._engine.SwitchTimeInterval(_this2.vm.periodList[index].toLowerCase());
	                    },
	                    toggleChart: function toggleChart() {
	                        _this2.vm.chartListShow = !_this2.vm.chartListShow;
	                    },
	                    changeChart: function changeChart(index) {
	                        _this2.vm.nowChart = _this2.vm.chartList[index];
	                        _this2.vm.chartListShow = false;
	                        _this._engine.ChangeChartType(_this2.vm.nowChart);
	                    },
	                    changeNowPrice: function changeNowPrice(data) {
	                        var _this = this,
	                            symbol = data[3],
	                            nowPriceArr = _this.nowPrice[symbol],
	                            prePriceArr = _this.prePrice[symbol];
	                        if (nowPriceArr) {
	                            prePriceArr[0] = nowPriceArr[0];
	                            prePriceArr[1] = nowPriceArr[1];
	                            nowPriceArr.pop();
	                            nowPriceArr.pop();
	                            nowPriceArr.push(data[1]);
	                            nowPriceArr.push(data[2]);
	                        }
	                    }
	                },
	                mounted: function mounted() {
	                    var _this = this;
	                    document.addEventListener('click', function (e) {
	                        var target = e.target;
	                        try {
	                            if (_this.symbolListShow == true && !matchesSelector(target, '.symbol-list li') && !matchesSelector(target, 'span.nowSymbol.tool-item') && !matchesSelector(target, 'span.nowSymbol i.triangledown')) {
	                                _this.symbolListShow = false;
	                            }
	                            if (_this.periodListShow == true && !matchesSelector(target, '.period-list li') && !matchesSelector(target, 'span.nowPeriod.tool-item') && !matchesSelector(target, 'span.nowPeriod i.triangledown')) {
	                                _this.periodListShow = false;
	                            }
	                            if (_this.chartListShow == true && !matchesSelector(target, '.chart-list li') && !matchesSelector(target, 'span.nowChart.tool-item') && !matchesSelector(target, 'span.nowChart i.triangledown')) {
	                                _this.chartListShow = false;
	                            }
	                        } catch (e) {
	                            if (_this.symbolListShow == true && !target.matchesSeletor('.symbol-list li') && !target.matches('span.nowSymbol.tool-item') && !target.matches('span.nowSymbol i.triangledown')) {
	                                _this.symbolListShow = false;
	                            }
	                            if (_this.periodListShow == true && !target.matchesSeletor('.period-list li') && !target.matches('span.nowPeriod.tool-item') && !target.matches('span.nowPeriod i.triangledown')) {
	                                _this.periodListShow = false;
	                            }
	                            if (_this.chartListShow == true && !target.matchesSeletor('.chart-list li') && !target.matches('span.nowChart.tool-item') && !target.matches('span.nowChart i.triangledown')) {
	                                _this.chartListShow = false;
	                            }
	                        }
	                    });
	                }
	
	            });
	        }
	    }]);
	
	    return Tools;
	}();
	
	function matchesSelector(el, selector) {
	    var p = Element.prototype;
	    var f = p.macthes || p.webkitMathcesSelector || p.mozMathcesSelector || p.msMathcesSelector || function (s) {
	        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
	    };
	    return f.call(el, selector);
	}
	module.exports = Tools;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helper = __webpack_require__(4);
	
	var toolsDOM = '\n    <div id=\'trader-tools-bar\' class=\' clear-float\'>\n        <div class="symbol-choose">\n            <span class="nowSymbol tool-item" @click="toggleSymbol()">\n                {{nowSymbol}}\n                <i v-bind:class="[\'triangledown\',{rotate:symbolListShow}]" ></i>\n            </span>\n\n            <ul class="symbol-list" v-show="symbolListShow">\n                <li v-for="(item,index) in symbolList" @click="changeSymbol(index)">\n                    <span class="symbol-text">{{item}}</span>\n                    <span class="symbol-price" v-bind:style=" \'color:\' + (nowPrice[item][0] > prePrice[item][0]?raiseColor:fallColor)"> {{nowPrice[item][0]}} </span>\n                    <span class="symbol-price" v-bind:style=" \'color:\' + (nowPrice[item][1] > prePrice[item][1]?raiseColor:fallColor)">{{nowPrice[item][1]}}</span>\n                </li>\n            </ul>\n        </div>\n        <div class="period-choose">\n            <span class="nowPeriod tool-item" @click="togglePeriod()">\n                {{nowPeriod}}\n                <i v-bind:class="[\'triangledown\',{rotate:periodListShow}]" ></i>\n            </span>\n\n            <ul class="period-list" v-show="periodListShow">\n                <li v-for="(item,index) in periodList" @click="changePeriod(index)">\n                    <span>{{item}}<span>\n                </li>\n            </ul>\n        </div>\n        <div class="chart-choose">\n            <span class="nowChart tool-item" @click="toggleChart()">\n                {{nowChart}}\n                <i v-bind:class="[\'triangledown\',{rotate:chartListShow}]" ></i>\n            </span>\n\n            <ul class="chart-list" v-show="chartListShow">\n                <li v-for="(item,index) in chartList" @click="changeChart(index)">\n                    <span>{{item}}<span>\n                </li>\n            </ul>\n        </div>\n        <button v-on:click=\'Zoom(1)\' class="icon-btn">\n            <i class="iconfont icon-Fangda"></i>\n        </button>\n        <button v-on:click=\'Zoom(0)\'  class="icon-btn">\n            <i class="iconfont icon-suoxiao1"></i>\n        </button>\n        <button v-on:click=\'Cross()\'  class="icon-btn ">\n            <i class="iconfont icon-Shizi"></i>\n        </button>\n        <!--\n        <button v-on:click=\'Move()\'  class="icon-btn">move</button>\n        -->\n        <!--\n        <label>\u7528\u6237</label>\n        <input style="100px" v-model="user"></input>\n        <label>\u5BC6\u7801</label>\n        <input style="100px" v-model="password"></input>\n        <button v-on:click=\'login()\'>\u767B\u9646</button>\n        <button v-on:click=\'logout()\'>logout</button>\n        -->\n    </div>\n';
	var tradeInfoDom = '\n    <div id="trade-tab">\n        <div class=\'tab-head\'>\n            <div :class="[\'tab-item\', {\'active\': tabIndex == 1}]" v-on:click=\'changeTab(1)\'>{{langType == \'cn\'? langs.cn.trading:langs.en.trading}}</div>\n            <div :class="[\'tab-item\', {\'active\': tabIndex == 2}]" v-on:click=\'changeTab(2)\'>{{langType == \'cn\'? langs.cn.tradeHis:langs.en.tradeHis}}</div>\n            <div class="line"></div>\n        </div>\n        <div class="tab-body">\n            <div class="tab-block" v-show="tabIndex == 1">\n                <table>\n                    <theader>\n                        <th>{{langType == \'cn\'? langs.cn.tradeId:langs.en.tradeId}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.openT:langs.en.openT}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.type:langs.en.type}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.symbol:langs.en.symbol}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.volume:langs.en.volume}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.openPrice:langs.en.openPrice}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.currPrice:langs.en.currPrice}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.commision:langs.en.commision}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.swap:langs.en.swap}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.profit:langs.en.profit}}</th>\n                        <th>{{langType == \'cn\'? langs.cn.operat:langs.en.operat}}</th>\n                    </theader>\n                    <tbody>\n                        <tr v-if="waitData1">\n                            <td colspan=\'15\' class="table-loading">\n                                <div class="loading">\n                                    <div class="loading-box"></div>\n                                    <div class="loading-text">Loading</div>\n                                </div>\n                            </td>\n                        </tr>\n                        <template v-else>\n                        <tr v-for="(item,index) in tradingList">\n                            <td>{{item[11]}}</td>\n                            <td>{{item[522]}}</td>\n                            <td :style="{color: item[54] == 1?colors.buy:colors.sell}">{{item[54] == 1?\'buy\':\'sell\'}}</td>\n                            <td>{{item[55]}}</td>\n                            <td>{{item[38]}}</td>\n                            <td>{{item[272]}}</td>\n                            <td>\n                                <span v-if="item[54] == 1">{{nowPrice[item[55]][0]}}</span>\n                                <span v-else>{{nowPrice[item[55]][1]}}</span>\n                            </td>\n                            <td>{{item[4]}}</td>\n                            <td>{{item[3]}}</td>\n                            <td>\n                                <span  v-bind:style=" \'color:\' + (profitList[((nowTradingPage-1)*10+index)]>0?colors.buy:colors.sell)">{{profitList[((nowTradingPage-1)*10+index)]}}<span>\n                            </td>\n                            <td>\n                                <button class="opreaBtn" v-on:click="closeOrder(item[11],item[54],item[38])">{{langType == \'cn\'? langs.cn.close:langs.en.close}}</button>\n                            </td>\n                        </tr>\n                        <tr v-if="tradingList.length <= 0">\n                            <td colspan=\'15\' style="text-align:center;">\n                            {{langType == \'cn\'? langs.cn.nodata:langs.en.nodata}}\n                            </td>\n                        </tr>\n                        </template>\n                    </tbody>\n                </table>\n                <ul class="page-selector">\n\n                    <div id="page" v-if="tradingPageSize > 0">\n                        <div class="item">\n                            <button @click="handlePrev(\'trading\')">&lt;</button>\n                            <button class="disable" v-if="tradingShowPrev">...</button>\n                            <template v-for="(v, k) in tradingArr">\n                                <button :class="{active: nowTradingPage == v}" @click="changePage(\'trading\', v)">{{v}}</button>\n                            </template>\n                            <button class="disable" v-if="tradingShowNext">...</button>\n                            <button @click="handleNext(\'trading\')">&gt;</button>\n                        </div>\n                    </div>\n\n                    <div class="summary">\n                    {{langType == \'cn\'? langs.cn.balance:langs.en.balance}}:<span>{{balance}}</span>\n                    {{langType == \'cn\'? langs.cn.equity:langs.en.equity}}:<span>{{Number(allProfit).toFixed(2)}}</span>\n                    {{langType == \'cn\'? langs.cn.margin:langs.en.margin}}:<span>{{margin}}</span>\n                    </div>\n\n                </ul>\n            </div>\n            <div class="tab-block" v-show="tabIndex == 2">\n            <table>\n                <theader>\n                    <th>{{langType == \'cn\'? langs.cn.tradeId:langs.en.tradeId}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.openT:langs.en.openT}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.type:langs.en.type}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.symbol:langs.en.symbol}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.volume:langs.en.volume}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.openPrice:langs.en.openPrice}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.closeT:langs.en.closeT}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.closePrice:langs.en.closePrice}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.commision:langs.en.commision}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.swap:langs.en.swap}}</th>\n                    <th>{{langType == \'cn\'? langs.cn.profit:langs.en.profit}}</th>\n                </theader>\n                <tbody>\n                    <tr v-if="waitData2">\n                        <td colspan=\'15\' class="table-loading">\n                            <div class="loading">\n                                <div class="loading-box"></div>\n                                <div class="loading-text">Loading</div>\n                            </div>\n                        </td>\n                    </tr>\n                    <template v-else>\n                    <tr v-for="item in tradedList">\n                        <td>{{item[11]}}</td>\n                        <td>{{item[522]}}</td>\n                        <td :style="{color: item[54] == 1?colors.buy:colors.sell}">{{item[54] == 1?\'buy\':\'sell\'}}</td>\n                        <td>{{item[55]}}</td>\n                        <td>{{item[38]}}</td>\n                        <td>{{item[272]}}</td>\n                        <td>{{item[521]}}</td>\n                        <td>{{item[271]}}</td>\n                        <td>{{item[4]}}</td>\n                        <td>{{item[3]}}</td>\n                        <td>{{item[2]}}</td>\n                    </tr>\n                    <tr v-if="tradedList.length <= 0">\n                        <td colspan=\'15\' style="text-align:center;">\n                        {{langType == \'cn\'? langs.cn.nodata:langs.en.nodata}}\n                        </td>\n                    </tr>\n                    </template>\n                </tbody>\n            </table>\n            <ul class="page-selector">\n\n                <div id="page" v-if="tradedPageSize > 0">\n                    <div class="item">\n                        <button @click="handlePrev(\'traded\')">&lt;</button>\n                        <button class="disable" v-if="tradedShowPrev">...</button>\n                        <template v-for="(v, k) in tradedArr">\n                            <button :class="{active: nowTradedPage == v}" @click="changePage(\'traded\', v)">{{v}}</button>\n                        </template>\n                        <button class="disable" v-if="tradedShowNext">...</button>\n                        <button @click="handleNext(\'traded\')">&gt;</button>\n                    </div>\n                </div>\n\n                <div class="summary">\n\n                    {{langType == \'cn\'? langs.cn.balance:langs.en.balance}}:<span>{{balance}}</span>\n                    {{langType == \'cn\'? langs.cn.equity:langs.en.equity}}:<span>{{Number(allProfit).toFixed(2)}}</span>\n                    {{langType == \'cn\'? langs.cn.margin:langs.en.margin}}:<span>{{margin}}</span>\n                </div>\n\n            </ul>\n            </div>\n        </div>\n    </div>\n';
	var operationDom = '\n    <div id="operation">\n        <div class="hand-choose">\n            <div id="counter">\n                <span class="decrease" @click="decrease($event)"><i class="iconfont icon-minus"></i></span>\n                <span class="increase" @click="increase($event)"><i class="iconfont icon-shizi"></i></span>\n                <input type="text" autocomplete="off" :min="min" :max="max" value="0.01" @blur="handleBlur($event)" class="inputValue" />\n            </div>\n        </div>\n        <div class="trader-btn-box">\n            <div class="trader-btn"  v-bind:style="\'background:\' + fallColor" @click="buy()">\n                <span class="type-text">Buy</span>\n                <span class="now-price">\n                    <i>{{(nowPrice[2]+ \'\')[0]}}</i>\n                    <i >{{(nowPrice[2]+ \'\')[1]}}</i>\n                    <i v-bind:class="[priceLength<=5?\'big\':\'\']">{{(nowPrice[2]+ \'\')[2]}}</i>\n                    <i v-bind:class="[priceLength<=6?\'big\':\'\']">{{(nowPrice[2]+ \'\')[3]}}</i>\n                    <i v-bind:class="[priceLength==5?\'small\':\'big\']">{{(nowPrice[2]+ \'\')[4]}}</i>\n                    <i v-bind:class="[priceLength==6?\'small\':\'big\']">{{(nowPrice[2]+ \'\')[5]}}</i>\n                    <i class="small">{{(nowPrice[2]+ \'\')[6]}}</i>\n                </span>\n            </div>\n            <div  class="trader-btn" v-bind:style="\'background:\' + raiseColor"  @click="sell()">\n                <span class="type-text">Sell</span>\n                <span class="now-price">\n                    <i>{{(nowPrice[1]+ \'\')[0]}}</i>\n                    <i >{{(nowPrice[1]+ \'\')[1]}}</i>\n                    <i v-bind:class="[priceLength<=5?\'big\':\'\']">{{(nowPrice[1]+ \'\')[2]}}</i>\n                    <i v-bind:class="[priceLength<=6?\'big\':\'\']">{{(nowPrice[1]+ \'\')[3]}}</i>\n                    <i v-bind:class="[priceLength==5?\'small\':\'big\']">{{(nowPrice[1]+ \'\')[4]}}</i>\n                    <i v-bind:class="[priceLength==6?\'small\':\'big\']">{{(nowPrice[1]+ \'\')[5]}}</i>\n                    <i class="small">{{(nowPrice[1]+ \'\')[6]}}</i>\n                </span>\n            </div>\n        </div>\n        <div id="tick-chart">\n            <div class="loading-box-c" v-if="showLoading"></div>\n        </div>\n    </div>\n';
	
	var dialogueDom = '\n        <div class="overlay" v-if="show"></div>\n        <transition appear enter-active-class="fadeIn" leave-active-class="fadeOut">\n        <div class="dialog-box" v-if="show">\n            <div class="loading" v-if="showLoading">\n                <div class="loading-box"></div>\n                <div class="loading-text">Loading</div>\n            </div>\n            <template v-else>\n                <div class="close" @click="close">+</div>\n                <div :style="{background:typeBg}" class="type-img"><i :class="typeImg"></i></div>\n                <div class="rightSection">\n                    <div class="title">{{title}}</div>\n                    <div class="msg">\n                        <div>{{msg}}</div>\n                        <div v-show="!msg">\n                            <span>{{msgTrade.no}}</span>\n                            <span class="bold" :style="sellOrBuy">{{msgTrade.type}} {{msgTrade.hand}}</span>\n                            <span>{{msgTrade.currency}}</span>\n                            <span>at</span>\n                            <span class="bold">{{msgTrade.price}}</span>\n                        </div>\n                    </div>\n                </div>\n            </template>\n        </div>\n        </transition>\n';
	exports.initDom = function initToolsDom(containerId) {
	    var containerEle = document.getElementById(containerId);
	    var randomId = helper.random();
	
	    containerEle.innerHTML = toolsDOM;
	
	    return randomId;
	};
	exports.initTradeInfoDom = function initTradeInfoDom(containerId) {
	    var containerEle = document.getElementById(containerId);
	    var randomId = helper.random();
	
	    containerEle.innerHTML = tradeInfoDom;
	
	    return randomId;
	};
	exports.initOperationDom = function initOperationDom(containerId) {
	    var containerEle = document.getElementById(containerId);
	    var randomId = helper.random();
	    containerEle.innerHTML = operationDom;
	    return randomId;
	};
	
	exports.initDialogue = function initDialogue() {
	    var dialogueEle = document.createElement('div');
	    dialogueEle.id = 'trader-dialog';
	    dialogueEle.innerHTML = dialogueDom;
	    document.body.appendChild(dialogueEle);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var WORDS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
	
	exports.random = function random() {
	    var re = '';
	    for (var i = 1; i < 8; i++) {
	        re += WORDS[Math.ceil(Math.random() * 10)];
	    }
	    return re;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = __webpack_require__(3);
	
	var tardeInfo = function () {
	    function tardeInfo(config, engine) {
	        _classCallCheck(this, tardeInfo);
	
	        var _this = this;
	        _this._engine = engine;
	
	        _this._id = Dom.initTradeInfoDom(config.tardeInfoElement);
	        _this._createVm(config.tardeInfoElement);
	    }
	
	    _createClass(tardeInfo, [{
	        key: '_createVm',
	        value: function _createVm(id) {
	            var _en, _cn, _data;
	
	            var _this = this;
	            _this.vm = new Vue({
	                el: '#' + id,
	                data: (_data = {
	                    waitData1: true,
	                    waitData2: true,
	                    profitList: [],
	                    profitsType: {
	                        divide: ['AUDCAD', 'AUDCHF', 'AUDJPY', 'CADCHF', 'CADJPY', 'CHFJPY', 'EURCAD', 'EURCHF', 'EURJPY', 'GBPCAD', 'GBPCHF', 'GBPJPY', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'USDCAD', 'USDCHF', 'USDJPY'],
	                        multiply: ['AUDNZD', 'EURAUD', 'EURGBP', 'EURNZD', 'GBPAUD', 'GBPNZD'],
	                        unchanged: ['AUDUSD', 'EURUSD', 'GBPUSD', 'NZDUSD']
	                    },
	                    tabIndex: 1,
	                    balance: '',
	                    margin: '',
	                    tradingAllList: []
	                }, _defineProperty(_data, 'tradingAllList', []), _defineProperty(_data, 'tradingArr', []), _defineProperty(_data, 'tradedList', []), _defineProperty(_data, 'tradedArr', []), _defineProperty(_data, 'tradingOrderLen', 0), _defineProperty(_data, 'tradedOrderLen', 0), _defineProperty(_data, 'nowTradingPage', 1), _defineProperty(_data, 'nowTradedPage', 1), _defineProperty(_data, 'tradingPageSize', 0), _defineProperty(_data, 'tradedPageSize', 0), _defineProperty(_data, 'nowPrice', {
	                    'AUDCAD': ['0.00000', '0.00000'],
	                    'AUDCHF': ['0.00000', '0.00000'],
	                    'AUDJPY': ['0.00000', '0.00000'],
	                    'AUDUSD': ['0.00000', '0.00000'],
	                    'CADCHF': ['0.00000', '0.00000'],
	                    'CADJPY': ['0.00000', '0.00000'],
	                    'EURAUD': ['0.00000', '0.00000'],
	                    'EURCAD': ['0.00000', '0.00000'],
	                    'EURCHF': ['0.00000', '0.00000'],
	                    'EURGBP': ['0.00000', '0.00000'],
	                    'EURJPY': ['0.00000', '0.00000'],
	                    'EURNZD': ['0.00000', '0.00000'],
	                    'EURUSD': ['0.00000', '0.00000'],
	                    'GBPAUD': ['0.00000', '0.00000'],
	                    'GBPCAD': ['0.00000', '0.00000'],
	                    'GBPCHF': ['0.00000', '0.00000'],
	                    'GBPJPY': ['0.00000', '0.00000'],
	                    'GBPNZD': ['0.00000', '0.00000'],
	                    'GBPUSD': ['0.00000', '0.00000'],
	                    'NZDCAD': ['0.00000', '0.00000'],
	                    'NZDCHF': ['0.00000', '0.00000'],
	                    'NZDJPY': ['0.00000', '0.00000'],
	                    'NZDUSD': ['0.00000', '0.00000'],
	                    'USDCAD': ['0.00000', '0.00000'],
	                    'USDCHF': ['0.00000', '0.00000'],
	                    'USDJPY': ['0.00000', '0.00000']
	                }), _defineProperty(_data, 'tradedShowPrev', false), _defineProperty(_data, 'tradedShowNext', false), _defineProperty(_data, 'tradingShowPrev', false), _defineProperty(_data, 'tradingShowNext', false), _defineProperty(_data, 'colors', {
	                    'sell': '#D0011B',
	                    'buy': '#1A74DD'
	                }), _defineProperty(_data, 'langType', 'en'), _defineProperty(_data, 'langs', {
	                    en: (_en = {
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
	                        'nodata': 'No current transaction record'
	                    }, _defineProperty(_en, 'swap', 'Swap'), _defineProperty(_en, 'commision', 'Commision'), _en),
	                    cn: (_cn = {
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
	                        'nodata': '当前暂无交易记录'
	                    }, _defineProperty(_cn, 'swap', '库存费'), _defineProperty(_cn, 'commision', '手续费'), _cn)
	
	                }), _data),
	                watch: {
	                    nowTradingPage: function nowTradingPage() {
	                        this.tradingArr = this.getPageArr('trading');
	                    },
	                    tradingOrderLen: function tradingOrderLen() {
	                        this.tradingArr = [];
	                        this.tradingPageSize = this.tradingPageNum;
	                        this.tradingArr = this.getPageArr('trading');
	                    },
	                    nowTradedPage: function nowTradedPage() {
	                        this.tradedArr = this.getPageArr('traded');
	                    },
	                    tradedOrderLen: function tradedOrderLen() {
	                        this.tradedArr = [];
	                        this.tradedPageSize = this.tradedPageNum;
	                        this.tradedArr = this.getPageArr('traded');
	                    },
	                    'nowPrice': {
	                        handler: function handler(val, oldVal) {
	                            var profitListArr = [];
	                            for (var i = 0; i < this.tradingAllList.length; i++) {
	                                var thisTrade = this.tradingAllList[i];
	                                var thisProfit = void 0;
	                                var profitBase = void 0;
	                                var profitRatio = void 0;
	                                var ratioName = void 0;
	                                if (this.profitsType.divide.indexOf(thisTrade[55]) !== -1) {
	                                    ratioName = 'USD' + thisTrade[55].slice(0, 6).slice(-3);
	                                } else if (this.profitsType.multiply.indexOf(thisTrade[55]) !== -1) {
	                                    ratioName = thisTrade[55].slice(0, 6).slice(-3) + 'USD';
	                                } else {
	                                    ratioName = null;
	                                }
	                                if (thisTrade[54] == 1) {
	                                    if (val[thisTrade[55]][0] != 0) {
	                                        profitBase = (val[thisTrade[55]][0] - thisTrade[272]) * thisTrade[38] * 100000;
	                                    } else {
	                                        profitBase = 'ERR';
	                                    }
	                                    if (this.profitsType.unchanged.indexOf(thisTrade[55]) == -1) {
	                                        profitRatio = val[ratioName][0];
	                                    }
	                                } else {
	                                    if (val[thisTrade[55]][1] != 0) {
	                                        profitBase = (thisTrade[272] - val[thisTrade[55]][1]) * thisTrade[38] * 100000;
	                                    } else {
	                                        profitBase = 'ERR';
	                                    }
	                                    if (this.profitsType.unchanged.indexOf(thisTrade[55]) == -1) {
	                                        profitRatio = val[ratioName][1];
	                                    }
	                                }
	                                if (this.profitsType.divide.indexOf(thisTrade[55]) !== -1) {
	                                    if (profitBase !== 'ERR' && profitRatio !== 0) {
	                                        thisProfit = profitBase / profitRatio;
	                                    } else {
	                                        thisProfit = '-';
	                                    }
	                                } else if (this.profitsType.multiply.indexOf(thisTrade[55]) !== -1) {
	                                    if (profitBase !== 'ERR' && profitRatio !== 0) {
	                                        thisProfit = profitBase * profitRatio;
	                                    } else {
	                                        thisProfit = '-';
	                                    }
	                                } else {
	                                    if (profitBase !== 'ERR') {
	                                        thisProfit = profitBase;
	                                    } else {
	                                        thisProfit = '-';
	                                    }
	                                }
	                                if (thisProfit != '-') {
	                                    thisProfit = thisProfit.toFixed(2);
	                                }
	                                profitListArr.push(thisProfit);
	                            }
	                            this.profitList = profitListArr;
	                        },
	                        deep: true
	                    }
	                },
	                methods: {
	                    changeTab: function changeTab(index) {
	                        _this.vm.tabIndex = index;
	                    },
	                    closeOrder: function closeOrder(ordernum, type, vol) {
	                        _this._engine.close(ordernum, type, vol);
	                    },
	                    changePage: function changePage(type, page) {
	                        if (type == 'trading') {
	                            this.nowTradingPage = page;
	                        } else {
	                            this.nowTradedPage = page;
	                        }
	                        _this._engine.changeTradeInfoPage(type, page);
	                    },
	
	                    handlePrev: function handlePrev(type) {
	                        if (type == 'trading') {
	                            if (this.nowTradingPage - 1 >= 1) {
	                                this.nowTradingPage -= 1;
	                                this.changePage('trading', this.nowTradingPage);
	                            }
	                        } else {
	                            if (this.nowTradedPage - 1 >= 1) {
	                                this.nowTradedPage -= 1;
	                                this.changePage('traded', this.nowTradedPage);
	                            }
	                        }
	                    },
	                    handleNext: function handleNext(type) {
	                        if (type == 'trading') {
	                            if (this.nowTradingPage + 1 <= this.tradingPageSize) {
	                                this.nowTradingPage += 1;
	                                this.changePage('trading', this.nowTradingPage);
	                            }
	                        } else {
	                            if (this.nowTradedPage + 1 <= this.tradedPageSize) {
	                                this.nowTradedPage += 1;
	                                this.changePage('traded', this.nowTradedPage);
	                            }
	                        }
	                    },
	                    getPageArr: function getPageArr(type) {
	                        var pagerCount = 6;
	                        if (type == 'trading') {
	                            var currPage = +this.nowTradingPage;
	                            var pageSize = +this.tradingPageSize;
	                        } else {
	                            var currPage = +this.nowTradedPage;
	                            var pageSize = +this.tradedPageSize;
	                        }
	                        var showPrev = false;
	                        var showNext = false;
	                        var arr = [];
	                        if (pageSize > pagerCount) {
	                            if (currPage > pagerCount - 1) {
	                                showPrev = true;
	                            }
	
	                            if (currPage < pageSize - 1) {
	                                showNext = true;
	                            }
	                        }
	
	                        if (showPrev && !showNext) {
	                            var startPage = pageSize - (pagerCount - 1);
	                            for (var i = startPage + 1; i <= pageSize; i++) {
	                                arr.push(i);
	                            }
	                        } else if (!showPrev && showNext) {
	                            for (var i = 1; i <= pagerCount - 1; i++) {
	                                arr.push(i);
	                            }
	                        } else if (showPrev && showNext) {
	                            var offset = Math.floor(pagerCount / 2) - 1;
	                            for (var i = currPage - offset + 1; i <= currPage + offset; i++) {
	                                arr.push(i);
	                            }
	                        } else {
	                            for (var i = 1; i <= pageSize; i++) {
	                                arr.push(i);
	                            }
	                        }
	
	                        if (type == 'trading') {
	                            this.tradingShowNext = showNext;
	                            this.tradingShowPrev = showPrev;
	                        } else {
	                            this.tradedShowNext = showNext;
	                            this.tradedShowPrev = showPrev;
	                        }
	
	                        return arr;
	                    },
	                    changeNowPrice: function changeNowPrice(data) {
	                        var _this = this,
	                            symbol = data[3],
	                            nowPriceArr = _this.nowPrice[symbol];
	                        if (nowPriceArr) {
	                            nowPriceArr.pop();
	                            nowPriceArr.pop();
	                            nowPriceArr.push(data[1]);
	                            nowPriceArr.push(data[2]);
	                        }
	                    }
	                },
	                computed: {
	                    'tradingPageNum': function tradingPageNum() {
	                        return Math.ceil(this.tradingOrderLen / 10);
	                    },
	                    'tradedPageNum': function tradedPageNum() {
	                        return Math.ceil(this.tradedOrderLen / 10);
	                    },
	                    'allProfit': function allProfit() {
	                        if (this.profitList.length != 0) {
	                            var profitSum = 0;
	                            var balance = Number(this.balance);
	                            for (var i = 0; i < this.profitList.length; i++) {
	                                if (this.profitList[i] != '-') {
	                                    profitSum += Number(this.profitList[i]);
	                                }
	                            }
	                            return (balance + profitSum).toFixed(2);
	                        } else {
	                            return Number(this.balance);
	                        }
	                    }
	                }
	            });
	        }
	    }]);
	
	    return tardeInfo;
	}();
	
	module.exports = tardeInfo;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = __webpack_require__(3);
	
	var operation = function () {
	    function operation(config, engine) {
	        _classCallCheck(this, operation);
	
	        var _this = this;
	        _this._engine = engine;
	
	        _this._id = Dom.initOperationDom(config.operationtElement);
	        _this._createVm(config.operationtElement);
	    }
	
	    _createClass(operation, [{
	        key: '_createVm',
	        value: function _createVm(id) {
	            var _this2 = this;
	
	            var _this = this;
	            _this.vm = new Vue({
	                el: '#' + id,
	                data: {
	                    'showLoading': false, //显示loading
	                    'raiseColor': '#d22c39',
	                    'fallColor': '#3d63ae',
	                    'nowPrice': ['', '0.00000', '0.00000', ''],
	                    'min': 0.01,
	                    'max': 0.50,
	                    'value': 0.01,
	                    'step': 0.01
	                },
	                methods: {
	                    decrease: function decrease(e) {
	                        if (+(this.value - this.step).toFixed(2) >= this.min) {
	                            this.value = + +(this.value - this.step).toFixed(2);
	                        } else {
	                            this.value = +this.min;
	                        }
	
	                        document.querySelector('.inputValue').value = this.value;
	                    },
	                    increase: function increase(e) {
	                        if (+(this.value + this.step).toFixed(2) <= this.max) {
	                            this.value = + +(this.value + this.step).toFixed(2);
	                        } else {
	                            this.value = +this.max;
	                        }
	
	                        document.querySelector('.inputValue').value = this.value;
	                    },
	                    handleBlur: function handleBlur(e) {
	                        var newValue = +e.target.value;
	                        if (isNaN(newValue)) {
	                            e.target.value = this.value;
	                        } else {
	                            var bits = this.step.toString().split('.')[1].length;
	                            newValue = +newValue.toFixed(bits);
	
	                            if (newValue >= this.max) {
	                                newValue = this.max;
	                            } else if (newValue <= this.min) {
	                                newValue = this.min;
	                            }
	
	                            e.target.value = this.value = newValue;
	                        }
	                    },
	                    buy: function buy() {
	                        _this._engine.buy(_this2.vm.value);
	                    },
	                    sell: function sell() {
	                        _this._engine.sell(_this2.vm.value);
	                    }
	                },
	                computed: {
	                    'priceLength': function priceLength() {
	                        return (this.nowPrice[1] + '').length;
	                    }
	                }
	            });
	        }
	    }]);
	
	    return operation;
	}();
	
	module.exports = operation;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dom = __webpack_require__(3);
	
	var traderDialogue = function () {
	    function traderDialogue(config, engine) {
	        _classCallCheck(this, traderDialogue);
	
	        var _this = this;
	        _this._engine = engine;
	
	        _this._id = Dom.initDialogue();
	        _this._createVm();
	    }
	
	    _createClass(traderDialogue, [{
	        key: '_createVm',
	        value: function _createVm() {
	            var _this2 = this;
	
	            var _this = this;
	            _this.vm = new Vue({
	                el: '#trader-dialog',
	                data: {
	                    show: false, //对话框显示
	                    showLoading: false, //loading显示
	                    type: 'success', //success,error,warning
	                    title: '',
	                    msg: '',
	                    msgTrade: {
	                        no: 'charpr-201703010301272405',
	                        type: 'buy', //交易类型 sell buy
	                        hand: '0.01', //交易手数
	                        currency: 'EUR/USD', //货币类型
	                        price: '1.04056', //交易价格
	                        colors: {
	                            sell: '#D0011B',
	                            buy: '#1A74DD'
	                        }
	                    },
	                    langType: 'en', //en,cn
	                    langs: {
	                        'cn': {
	                            'success1': '订单交易成功！',
	                            'success2': '订单平仓成功！'
	                        },
	                        'en': {
	                            'success1': 'Transaction Successful!',
	                            'success2': 'Close Successful!'
	                        }
	                    },
	                    timeOut: 2 },
	
	                methods: {
	                    close: function close() {
	                        this.show = !this.show;
	                    },
	                    showLoadingDia: function showLoadingDia() {
	                        this.show = true;
	                        this.showLoading = true;
	                    },
	                    showDialogue: function showDialogue(no, type, hand, currency, price, key) {
	                        if (this.langType == 'cn') {
	                            this.title = this.langs.cn[key];
	                        } else if (this.langType == 'en') {
	                            this.title = this.langs.en[key];
	                        }
	
	                        this.msgTrade.no = no;
	                        this.msgTrade.type = type == 1 ? 'buy' : 'sell';
	                        this.msgTrade.hand = hand;
	                        this.msgTrade.currency = currency;
	                        this.msgTrade.price = price;
	                        this.showLoading = false;
	                        this.type = 'success';
	                        var that = this;
	                        var close = function close() {
	                            that.show = false;
	                        };
	
	                        if (!this.showLoading) setTimeout(close, this.timeOut * 1000);
	                    },
	                    showErrDia: function showErrDia() {
	                        _this2.vm.showLoading = false;
	                        _this2.vm.type = 'error';
	                        // this.show = true;
	                        _this2.vm.msg = 'error';
	                        _this2.vm.title = 'error';
	                        var close = function close() {
	                            this.vm.show = false;
	                        };
	
	                        if (_this2.vm.show) setTimeout(close, _this2.vm.timeOut * 1000);
	                    }
	                },
	                computed: {
	                    'typeImg': function typeImg() {
	                        if (this.type == 'success') {
	                            return ['iconfont', 'icon-dagou'];
	                        } else if (this.type == 'error') {
	                            return ['iconfont', 'icon-cuo'];
	                        } else if (this.type == 'warning') {
	                            return ['iconfont', 'icon-gantanhao'];
	                        }
	                    },
	                    'typeBg': function typeBg() {
	                        if (this.type == 'success') {
	                            return '#7db93d';
	                        } else if (this.type == 'error') {
	                            return '#cc413c';
	                        } else if (this.type == 'warning') {
	                            return '#e6a523';
	                        }
	                    },
	                    'sellOrBuy': function sellOrBuy() {
	                        if (this.msgTrade.type == 'sell') {
	                            return 'color:' + this.msgTrade.colors.sell;
	                        } else {
	                            return 'color:' + this.msgTrade.colors.buy;
	                        }
	                    }
	
	                },
	                mounted: function mounted() {}
	            });
	        }
	    }]);
	
	    return traderDialogue;
	}();
	
	module.exports = traderDialogue;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cache = function () {
	    function Cache() {
	        _classCallCheck(this, Cache);
	
	        this.DB = null;
	        this.DBName = 'trader';
	        this.DBVersion = 1;
	    }
	
	    _createClass(Cache, [{
	        key: 'initDB',
	        value: function initDB(userName) {
	            var _this = this;
	
	            var DBName = this.DBName;
	
	            indexedDB.deleteDatabase(DBName + userName);
	            var req = indexedDB.open(DBName + userName);
	            req.onsuccess = function (e) {
	                _this.DB = e.target.result;
	            };
	            req.onerror = function (e) {};
	            req.onupgradeneeded = function (e) {
	                var DB = e.target.result;
	                if (!DB.objectStoreNames.contains('traderStore')) {
	                    var store = DB.createObjectStore('traderStore', { keyPath: 'type' });
	                    store.createIndex('symbol', 'symbol', { unique: false });
	                }
	            };
	            req.blocked = function (e) {};
	        }
	    }, {
	        key: 'AddHistoryPirce',
	        value: function AddHistoryPirce(data, symbol, period) {
	            var DB = this.DB,
	                DBName = this.DBName;
	
	            var transaction = DB.transaction('traderStore', 'readwrite');
	            var store = transaction.objectStore('traderStore');
	            var addData = {
	                type: symbol + '-' + period,
	                data: data,
	                symbol: symbol,
	                period: period
	            };
	            store.add(addData);
	        }
	    }, {
	        key: 'updatePrice',
	        value: function updatePrice(data) {
	            var _this2 = this;
	
	            var DB = this.DB,
	                DBName = this.DBName;
	
	            var transaction = DB.transaction('traderStore', 'readwrite');
	            var store = transaction.objectStore('traderStore');
	            var index = store.index('symbol');
	            var request = index.openCursor(IDBKeyRange.only(data[3]));
	            var nextTransaction, nextstore, nextReq;
	            request.onsuccess = function (e) {
	
	                var cursor = e.target.result;
	                if (cursor) {
	                    cursor.continue();
	                    nextTransaction = DB.transaction('traderStore', 'readwrite');
	                    nextstore = transaction.objectStore('traderStore');
	                    nextReq = nextstore.get(cursor.primaryKey);
	                    nextReq.onsuccess = function (e) {
	                        var oldPriceObj = e.target.result;
	
	                        var newPriceObj = _this2.updateData(data, oldPriceObj);
	                        nextstore.put(newPriceObj);
	                    };
	                }
	            };
	        }
	    }, {
	        key: 'updateData',
	        value: function updateData(newData, oldPriceObj) {
	            var oldData = oldPriceObj.data,
	                oldDataLength = oldData.length,
	                lastPrice = oldData[oldDataLength - 1],
	                period = oldPriceObj.period * 60000;
	            if (newData > oldData[oldDataLength - 1] + period) {
	                var newPrice = [lastPrice[0] + period, newData[1], newData[1], newData[1], newData[1]];
	                oldData.push(newPrice);
	                oldData.shift();
	            } else {
	                var time = lastPrice[0],
	                    open = lastPrice[1],
	                    close = newData[1],
	                    high = newData[1] > lastPrice[2] ? newData[1] : lastPrice[2],
	                    low = newData[1] > lastPrice[3] ? lastPrice[3] : newData[1];
	                oldData.pop();
	                oldData.push([time, open, high, low, close]);
	            }
	            return oldPriceObj;
	        }
	    }, {
	        key: 'getHistoryPrice',
	        value: function getHistoryPrice(symbol) {
	            var DB = this.DB,
	                DBName = this.DBName;
	
	            var transaction = DB.transaction('traderStore', 'readwrite');
	            var store = transaction.objectStore('traderStore');
	            var req = store.get(symbol);
	            var getPricePromise = new Promise(function (resolve, reject) {
	                req.onsuccess = function (e) {
	                    resolve(e.target.result);
	                };
	                req.onerror = function (e) {
	                    reject(e);
	                };
	            });
	            return getPricePromise;
	        }
	    }]);
	
	    return Cache;
	}();
	
	module.exports = Cache;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var SpaceStateBase = __webpack_require__(10);
	var EventEmitter = __webpack_require__(64).EventEmitter;
	var satelliteEvent = new EventEmitter();
	satelliteEvent.setMaxListeners(0);
	
	//SatelliteSocket
	
	function SatelliteSocket(config, mainCallback) {
	    var _this = this;
	
	    initConfig();
	
	    _this.bestServer(false);
	
	    function initConfig() {
	        _this.config = {
	            serverLists: config.serverLists, //配置的服务器
	            pingOverTime: config.pingOverTime || 2000, //获取最优服务器的超时时间
	            connectStatusIntervalTime: 6000, //获取服务器状态的间隔时间
	            reConnectNum: 10, //重连次数
	            dataOvertimeInterval: 7000 };
	
	        _this.connectServerStatus = { //所有node server信息
	            server: [],
	            browserTime: [],
	            newrouteTime: [],
	            time: [],
	            socket: []
	        };
	
	        _this.choosenSocket = {}; //已选择的node
	        _this.isChoosenSocketDone = false; //是否选择完node
	        _this.heartbeatFlag = true; //心跳方法开关
	        _this.maxConnectTime = 1000000; //连接无效 将连接时间设为1000000
	
	        //连接状态列表[连接中，已连接，所有路线连接失败，收拾数据的这条路线每次接收数据间隔超时,node连接中,node所有模块已连接,node连接newroute已关闭，node每次接收newroute数据超时]
	        _this.connectEnum = ['connecting', 'connected', 'connect_error', 'connect_overtime', 'node_connecting', 'node_connected', 'node_connected_close', 'node_connected_overtime'];
	
	        _this.mainCallbackReturn = {}; //回调函数的返回
	        _this.mainCallbackReturn.connect_status = _this.connectEnum[0]; //返回回调函数的连接状态
	        _this.mainCallback = mainCallback ? mainCallback : function () {};
	        _this.mainCallback(_this.mainCallbackReturn);
	
	        _this.sendEvent = function (eventname, obj) {
	            //选择完服务器后发送
	            _this.handleOnFunc(_this.isChoosenSocketDone, function () {
	                _this.choosenSocket.send(eventname, obj);
	            });
	        };
	        _this.receiveEvent = function (eventname, callback) {
	            //选择完服务器后接收
	            _this.handleOnFunc(_this.isChoosenSocketDone, function () {
	                _this.choosenSocket.receive(eventname, function (data) {
	                    callback && callback(data);
	                });
	            });
	        };
	        _this.sendOnceEvent = function (eventname, obj, callback) {
	            if (_this.isChoosenSocketDone) {
	                _this.choosenSocket.send(eventname, obj);
	            } else {
	                //返回正在连接中 不进行提交
	                callback && callback('connecting');
	            }
	        };
	
	        _this.handleOnFunc = function (isChoosenSocketDone, callback) {
	            if (isChoosenSocketDone) {
	                callback();
	            } else {
	                satelliteEvent.on('hasChoosenSocket', function () {
	                    callback();
	                });
	                // window.addEventListener('hasChoosenSocket', function(){
	                //     callback();
	                // })
	            }
	        };
	        _this.dataOverTimeHandle = function (currenttime, lasttime, overtime) {
	            //处理超时
	            if (currenttime - lasttime > overtime) {
	                //_this.heartbeatFlag = 'close';
	                //连接异常，自动更换线路
	                _this.mainCallbackReturn.connect_status = _this.connectEnum[3];
	                _this.mainCallback(_this.mainCallbackReturn);
	                _this.bestServer(false);
	            }
	        };
	    }
	}
	
	var satelliteProto = SatelliteSocket.prototype;
	
	satelliteProto.connectWithAllServer = function (serverLists, callback) {
	    var _this = this,
	        _pingTimer = void 0,
	        connectServerArr = void 0,
	        isReturnArr = [],
	        errorReturnArr = [];
	
	    clearTimeout(_pingTimer);
	
	    var _loop = function _loop(index) {
	        var _connectServer = _this.connectServerStatus,
	            _value = serverLists[index];
	
	        //base设置四个状态回调，页面显示三个状态回调：连接中，已连接，连接断开
	        var opt = {
	            server: _value,
	            reConnectNum: _this.config.reConnectNum
	        };
	
	        if (_connectServer.socket[index]) {
	            _connectServer.socket[index].closeConnect();
	        }
	
	        var _socket = new SpaceStateBase(opt);
	        _connectServer.server[index] = _value;
	        _connectServer.browserTime[index] = _this.maxConnectTime;
	        _connectServer.newrouteTime[index] = _this.maxConnectTime;
	        _connectServer.time[index] = _this.maxConnectTime;
	        _connectServer.socket[index] = _socket;
	
	        _connectServer.socket[index].connectError(function () {
	            _connectServer.browserTime[index] = _this.maxConnectTime;
	            _connectServer.newrouteTime[index] = _this.maxConnectTime;
	            _connectServer.time[index] = _this.maxConnectTime;
	            //如果连接失败10次
	            errorReturnArr.push(false);
	            if (errorReturnArr.length == _this.config.serverLists.length) {
	                clearTimeout(_pingTimer);
	                callback(false);
	            }
	        });
	
	        _connectServer.socket[index].receive('setPingTime', function (data) {
	
	            _connectServer.browserTime[index] = timeSSUtc() - data.browserTime;
	            _connectServer.newrouteTime[index] = parseInt(data.newrouteTime);
	            _connectServer.time[index] = _connectServer.browserTime[index] + _connectServer.newrouteTime[index];
	
	            isReturnArr.push(true);
	            /*如果第一个ping得到的服务器时间存在则启用定时器，到达定时时间后 关闭socket 获取存储的服务器列表取最优值。
	              如果在定时时间内服务器列表都返回，清除定时器，关闭socket 取最优值*/
	            if (isReturnArr.length === 1) {
	                _pingTimer = setTimeout(function () {
	                    callback(true);
	                }, _this.config.pingOverTime);
	            } else if (isReturnArr.length == _this.config.serverLists.length) {
	                clearTimeout(_pingTimer);
	                callback(true);
	            }
	        });
	        _connectServer.socket[index].send('getPingTime', timeSSUtc());
	        // setTimeout(function(){
	
	        // },6000)
	    };
	
	    for (var index = 0; index < serverLists.length; index++) {
	        _loop(index);
	    }
	};
	
	satelliteProto.bestServer = function (noNeedNewRouterTime) {
	    var _this = this;
	    //获取最优server
	
	    _this.connectWithAllServer(_this.config.serverLists, function (result) {
	        // //取time最小的server 判断是否断开其他
	        if (result) {
	
	            var _resultTime = void 0,
	                _resultServer = void 0,
	                _handleTime = void 0,
	                _handleServer = void 0;
	
	            _handleTime = noNeedNewRouterTime ? _this.connectServerStatus.browserTime : _this.connectServerStatus.time;
	            _handleServer = _this.connectServerStatus.server;
	            _resultTime = Math.min.apply(Math, _handleTime);
	            _resultServer = _handleServer[_handleTime.indexOf(_resultTime)];
	
	            _this.changeServer(_resultServer);
	
	            _this.mainCallbackReturn.connect_status = _this.connectEnum[1];
	            _this.mainCallback(_this.mainCallbackReturn);
	
	            _this.heartbeat();
	        } else {
	            _this.mainCallbackReturn.connect_status = _this.connectEnum[2];
	            _this.mainCallback(_this.mainCallbackReturn);
	        }
	    });
	};
	
	satelliteProto.heartbeat = function () {
	    var _this = this;
	
	    _this.handleOnFunc(_this.isChoosenSocketDone, function () {
	        var _lastHeartTime = timeSSUtc();
	        var socket = _this.choosenSocket;
	        pingIntervalFunc();
	
	        socket.receive('hearbeatReturn', function (data) {
	            _lastHeartTime = data;
	        });
	
	        function pingIntervalFunc(flag) {
	            if (_this.heartbeatFlag && _this.mainCallbackReturn.connect_status != _this.connectEnum[3]) {
	                setTimeout(function () {
	                    var _currentTime = timeSSUtc();
	                    socket.send('hearbeatReady', _currentTime);
	
	                    _this.dataOverTimeHandle(_currentTime, _lastHeartTime, _this.config.dataOvertimeInterval);
	
	                    pingIntervalFunc();
	                }, _this.config.connectStatusIntervalTime);
	            }
	        }
	    });
	};
	satelliteProto.serverStatus = function (callback) {
	    //等通知后再执行， 
	    //所有sokcet断开后，停止循环定时
	    var _this = this;
	    var serverLists = _this.config.serverLists;
	    var _connectServer = _this.connectServerStatus;
	    callback(_connectServer);
	    _this.handleOnFunc(_this.isChoosenSocketDone, function () {
	        for (var index = 0; index < serverLists.length; index++) {
	
	            one(_connectServer.socket[index], index, function (data) {
	                callback(_connectServer);
	            });
	        }
	    });
	    function one(socket, index, cb) {
	        var _lastHeartTime = timeSSUtc(),
	            statustimer = void 0;
	
	        pingIntervalFunc();
	
	        socket.receive('statusReturn', function (data) {
	            //多条改状态
	            console.log(data);
	            clearTimeout(statustimer);
	            if (socket == _this.choosenSocket) {
	                _lastHeartTime = data;
	            }
	            //console.log(data.browserTime,timeSSUtc())
	            _connectServer.browserTime[index] = timeSSUtc() - data.browserTime;
	            _connectServer.newrouteTime[index] = parseInt(data.newrouteTime);
	            _connectServer.time[index] = _connectServer.browserTime[index] + _connectServer.newrouteTime[index];
	            //使用的这条做超时判断
	            cb(data);
	        });
	        function pingIntervalFunc(flag) {
	            if (_this.mainCallbackReturn.connect_status != _this.connectEnum[3]) {
	                setTimeout(function () {
	                    var _currentTime = timeSSUtc();
	                    //console.log(_currentTime)
	                    socket.send('statusReady', _currentTime);
	
	                    statustimer = setTimeout(function () {
	                        _connectServer.browserTime[index] = _this.maxConnectTime;
	                        _connectServer.newrouteTime[index] = _this.maxConnectTime;
	                        _connectServer.time[index] = _this.maxConnectTime;
	                    }, 2000);
	
	                    if (socket == _this.choosenSocket) {
	                        _this.dataOverTimeHandle(_currentTime, _lastHeartTime, _this.config.dataOvertimeInterval);
	                    }
	
	                    pingIntervalFunc();
	                }, _this.config.connectStatusIntervalTime);
	            }
	        }
	    }
	    _this.heartbeatFlag = false;
	};
	satelliteProto.connectedStatus = function (callback) {
	    var _this = this;
	    _this.handleOnFunc(_this.isChoosenSocketDone, callback);
	};
	satelliteProto.changeServer = function (server) {
	    //切换server
	    var _this = this;
	    _this.choosenSocket = _this.connectServerStatus.socket[_this.connectServerStatus['server'].indexOf(server)];
	    //已经选好server ，通知其他应用可以继续进行，
	
	    _this.isChoosenSocketDone = true;
	
	    console.log('ready');
	    satelliteEvent.emit('hasChoosenSocket');
	    //window.dispatchEvent(new Event('hasChoosenSocket'));
	};
	
	//实时价格
	satelliteProto.ready_realtimePrice = function (obj) {
	    this.sendEvent('readyRealtimePrice', obj);
	};
	satelliteProto.realtimePrice = function (callback) {
	    this.receiveEvent('realtimePrice', callback);
	};
	
	//历史价格
	satelliteProto.ready_historyPrice = function (obj) {
	    var _this = this;
	    if (_this.isChoosenSocketDone) _this.choosenSocket.send('readyHistoryPrice', obj);
	    //this.sendEvent('readyHistoryPrice',obj);
	};
	satelliteProto.historyPrice = function (callback) {
	    this.receiveEvent('historyPrice', callback);
	};
	
	satelliteProto.tokenError = function (callback) {
	    var _this = this;
	    _this.receiveEvent('tokenError', function (data) {
	        callback(data);
	    });
	};
	//登录
	satelliteProto.ready_login = function (obj, callback) {
	    this.sendOnceEvent('readyLogin', {
	        login: obj.login,
	        pwd: obj.pwd
	    }, callback || function () {});
	};
	satelliteProto.login = function (callback) {
	    var _this = this;
	    _this.receiveEvent('login', function (data) {
	        callback(data);
	    });
	};
	//登出
	satelliteProto.ready_logout = function (obj, callback) {
	    this.sendOnceEvent('readyLogout', {
	        login: obj.login,
	        token: obj.token
	    }, callback || function () {});
	};
	satelliteProto.logout = function (callback) {
	    var _this = this;
	    _this.receiveEvent('logout', function (data) {
	        callback(data);
	        _this.sendOnceEvent('logoutRecieveSuccess', data[50]); //登出成功 返回成功信息，方便webchannel销毁这个账号的连接
	    });
	    //this.sendOnceEvent('logoutCallback' , 'OK');
	};
	
	//开单
	satelliteProto.ready_openOrder = function (obj, callback) {
	    this.sendOnceEvent('readyOpenOrder', {
	        login: obj.login,
	        token: obj.token,
	        currency: obj.currency,
	        type: obj.type,
	        vol: obj.vol,
	        time: obj.time
	    }, callback || function () {});
	};
	satelliteProto.openOrder = function (callback) {
	    this.receiveEvent('openOrder', callback);
	};
	//关单
	satelliteProto.ready_closeOrder = function (obj, callback) {
	    this.sendOnceEvent('readyCloseOrder', {
	        login: obj.login,
	        token: obj.token,
	        ordernum: obj.ordernum,
	        type: obj.type,
	        vol: obj.vol,
	        time: obj.time
	    }, callback);
	};
	satelliteProto.closeOrder = function (callback) {
	    this.receiveEvent('closeOrder', callback);
	};
	//交易中记录
	satelliteProto.ready_tradingHistory = function (obj) {
	    this.sendEvent('readyTradingHistory', {
	        login: obj.login,
	        token: obj.token,
	        start: obj.start,
	        limit: obj.limit,
	        all: obj.all ? obj.all : false
	    });
	};
	satelliteProto.tradingHistory = function (callback) {
	    this.receiveEvent('tradingHistory', callback);
	};
	satelliteProto.ready_tradedHistory = function (obj, callback) {
	    this.sendEvent('readyTradedHistory', {
	        login: obj.login,
	        token: obj.token,
	        start: obj.start,
	        limit: obj.limit
	    }, callback);
	};
	satelliteProto.tradedHistory = function (callback) {
	    this.receiveEvent('tradedHistory', callback);
	};
	
	satelliteProto.ready_accountinfo = function (obj, callback) {
	    this.sendEvent('readyAccountinfo', {
	        login: obj.login,
	        token: obj.token
	    }, callback);
	};
	satelliteProto.accountinfo = function (callback) {
	    this.receiveEvent('accountinfo', callback);
	};
	
	satelliteProto.ready_notice = function (obj) {
	    this.sendEvent('readyNotice', {
	        token: obj.token
	    });
	};
	satelliteProto.notice = function (callback) {
	    this.receiveEvent('notice', callback);
	};
	
	function separate(str, gref) {
	    return handleOneRow(str);
	}
	
	function handleOneRow(row) {
	    var result = {},
	        col = row.split('|');
	    for (var i = 0; i < col.length; i++) {
	
	        var obj = col[i].split('=');
	
	        result[obj[0]] = obj[1];
	    }
	    return result;
	}
	
	function timeSSUtc() {
	    //将时间转成utc时间，返回毫秒时间戳
	    return new Date().getTime();
	    //return Date.parse( (date ? new Date(date) : new Date()).toUTCString() )
	}
	module.exports = SatelliteSocket;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var io = __webpack_require__(11);
	
	function SatelliteBase(arg) {
	    var _this = this;
	    var server = arg.server; //连接的服务器
	    _this.socket = io.connect(server);
	    _this.connectCount = 0; //重新计数初始化
	    _this.reConnectNum = arg.reConnectNum;
	    connectHandle(_this.socket);
	}
	
	function connectHandle(socket) {
	    socket.on('disconnect', function () {
	        console.log(' disconnect');
	    });
	    socket.on('error', function () {
	        console.log(' error', +new Date());
	    });
	    socket.on('reconnect', function () {
	        //console.log(server + ' reconnect' ,+ new Date());
	    });
	
	    socket.on('reconnect_error', function () {
	        //console.log(server + ' reconnect_error' ,+ new Date());
	    });
	    socket.on('reconnect_failed', function () {
	        //console.log(server + ' reconnect_failed' ,+ new Date());
	    });
	    socket.on('reconnecting', function () {
	        //console.log(server + ' reconnecting' ,+ new Date());
	    });
	    socket.on('connect_timeout', function () {
	        console.log(' connect_timeout');
	    });
	}
	
	var socketBase = SatelliteBase.prototype;
	
	socketBase.openConnect = function (callback) {
	    var _this = this;
	    _this.socket.on('connect', function () {
	        _this.connectCount = 0;
	        callback();
	    });
	};
	
	socketBase.closeConnect = function () {
	    var _this = this;
	    _this.socket.close();
	};
	socketBase.connectError = function (callback) {
	    var _this = this;
	    _this.socket.on('connect_error', function () {
	        //连接失败多少次后关闭连接
	        _this.connectCount++;
	        if (_this.connectCount === _this.reConnectNum) {
	            _this.socket.disconnect();
	            callback && callback();
	        }
	    });
	};
	
	socketBase.send = function (event, obj) {
	    var _this = this;
	    console.log(event, obj);
	    _this.socket.emit(event, obj);
	};
	socketBase.receive = function (event, callback) {
	    var _this = this;
	    _this.socket.on(event, function (data) {
	        callback(data);
	    });
	};
	
	// //还需要修改成不同模块心跳方法不一样 
	// socketBase.reConnect = function(server) {
	//     console.log(server + ' reconnect1');
	// }
	
	module.exports = SatelliteBase;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(12);
	var parser = __webpack_require__(18);
	var Manager = __webpack_require__(29);
	var debug = __webpack_require__(14)('socket.io-client');
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = lookup;
	
	/**
	 * Managers cache.
	 */
	
	var cache = exports.managers = {};
	
	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */
	
	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }
	
	  opts = opts || {};
	
	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;
	
	  var io;
	
	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = parser.protocol;
	
	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */
	
	exports.connect = lookup;
	
	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */
	
	exports.Manager = __webpack_require__(29);
	exports.Socket = __webpack_require__(58);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */
	
	var parseuri = __webpack_require__(13);
	var debug = __webpack_require__(14)('socket.io-client:url');
	
	/**
	 * Module exports.
	 */
	
	module.exports = url;
	
	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */
	
	function url (uri, loc) {
	  var obj = uri;
	
	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;
	
	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }
	
	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }
	
	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }
	
	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }
	
	  obj.path = obj.path || '/';
	
	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;
	
	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));
	
	  return obj;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');
	
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	
	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;
	
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	
	    return uri;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(16);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(17);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);
	
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var debug = __webpack_require__(19)('socket.io-parser');
	var json = __webpack_require__(22);
	var Emitter = __webpack_require__(25);
	var binary = __webpack_require__(26);
	var isBuf = __webpack_require__(28);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = 4;
	
	/**
	 * Packet types.
	 *
	 * @api public
	 */
	
	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];
	
	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */
	
	exports.CONNECT = 0;
	
	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */
	
	exports.DISCONNECT = 1;
	
	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */
	
	exports.EVENT = 2;
	
	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */
	
	exports.ACK = 3;
	
	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */
	
	exports.ERROR = 4;
	
	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */
	
	exports.BINARY_EVENT = 5;
	
	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */
	
	exports.BINARY_ACK = 6;
	
	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */
	
	exports.Encoder = Encoder;
	
	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */
	
	exports.Decoder = Decoder;
	
	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */
	
	function Encoder() {}
	
	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */
	
	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);
	
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};
	
	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */
	
	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;
	
	  // first is type
	  str += obj.type;
	
	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }
	
	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }
	
	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }
	
	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }
	
	  debug('encoded %j as %s', obj, str);
	  return str;
	}
	
	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */
	
	function encodeAsBinary(obj, callback) {
	
	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;
	
	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }
	
	  binary.removeBlobs(obj, writeEncoding);
	}
	
	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */
	
	function Decoder() {
	  this.reconstructor = null;
	}
	
	/**
	 * Mix in `Emitter` with Decoder.
	 */
	
	Emitter(Decoder.prototype);
	
	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */
	
	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);
	
	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};
	
	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */
	
	function decodeString(str) {
	  var p = {};
	  var i = 0;
	
	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();
	
	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }
	
	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }
	
	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }
	
	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }
	
	  debug('decoded %s as %j', str, p);
	  return p;
	}
	
	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};
	
	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */
	
	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};
	
	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */
	
	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}
	
	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */
	
	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};
	
	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */
	
	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};
	
	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(20);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(21);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(24);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 25 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/
	
	/**
	 * Module requirements
	 */
	
	var isArray = __webpack_require__(27);
	var isBuf = __webpack_require__(28);
	
	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */
	
	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;
	
	  function _deconstructPacket(data) {
	    if (!data) return data;
	
	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }
	
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};
	
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */
	
	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;
	
	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }
	
	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};
	
	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */
	
	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;
	
	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;
	
	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }
	
	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };
	
	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }
	
	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;
	
	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */
	
	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var eio = __webpack_require__(30);
	var Socket = __webpack_require__(58);
	var Emitter = __webpack_require__(59);
	var parser = __webpack_require__(18);
	var on = __webpack_require__(61);
	var bind = __webpack_require__(62);
	var debug = __webpack_require__(14)('socket.io-client:manager');
	var indexOf = __webpack_require__(56);
	var Backoff = __webpack_require__(63);
	
	/**
	 * IE6+ hasOwnProperty
	 */
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Module exports
	 */
	
	module.exports = Manager;
	
	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */
	
	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};
	
	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}
	
	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */
	
	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};
	
	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */
	
	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Manager.prototype);
	
	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};
	
	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};
	
	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};
	
	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};
	
	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};
	
	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};
	
	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */
	
	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};
	
	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */
	
	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;
	
	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;
	
	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });
	
	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });
	
	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);
	
	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	
	  this.subs.push(openSub);
	  this.subs.push(errorSub);
	
	  return this;
	};
	
	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */
	
	Manager.prototype.onopen = function () {
	  debug('open');
	
	  // clear old subs
	  this.cleanup();
	
	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');
	
	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};
	
	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */
	
	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};
	
	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};
	
	/**
	 * Called with data.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};
	
	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */
	
	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};
	
	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */
	
	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });
	
	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }
	
	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }
	
	  return socket;
	};
	
	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */
	
	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;
	
	  this.close();
	};
	
	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;
	
	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};
	
	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */
	
	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};
	
	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */
	
	Manager.prototype.cleanup = function () {
	  debug('cleanup');
	
	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }
	
	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;
	
	  this.decoder.destroy();
	};
	
	/**
	 * Close the current socket.
	 *
	 * @api private
	 */
	
	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};
	
	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */
	
	Manager.prototype.onclose = function (reason) {
	  debug('onclose');
	
	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);
	
	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};
	
	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */
	
	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;
	
	  var self = this;
	
	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);
	
	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;
	
	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);
	
	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;
	
	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};
	
	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */
	
	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(31);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(32);
	
	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(39);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var transports = __webpack_require__(33);
	var Emitter = __webpack_require__(47);
	var debug = __webpack_require__(51)('engine.io-client:socket');
	var index = __webpack_require__(56);
	var parser = __webpack_require__(39);
	var parseuri = __webpack_require__(13);
	var parsejson = __webpack_require__(57);
	var parseqs = __webpack_require__(48);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Socket;
	
	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */
	
	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);
	
	  opts = opts || {};
	
	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }
	
	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }
	
	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);
	
	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }
	
	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;
	
	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;
	
	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }
	
	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }
	
	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;
	
	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;
	
	  this.open();
	}
	
	Socket.priorWebsocketSuccess = false;
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	Socket.protocol = parser.protocol; // this is an int
	
	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */
	
	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(38);
	Socket.transports = __webpack_require__(33);
	Socket.parser = __webpack_require__(39);
	
	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */
	
	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);
	
	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;
	
	  // transport name
	  query.transport = name;
	
	  // session id if we already have one
	  if (this.id) query.sid = this.id;
	
	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });
	
	  return transport;
	};
	
	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}
	
	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';
	
	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }
	
	  transport.open();
	  this.setTransport(transport);
	};
	
	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */
	
	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;
	
	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }
	
	  // set up transport
	  this.transport = transport;
	
	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};
	
	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */
	
	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;
	
	  Socket.priorWebsocketSuccess = false;
	
	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;
	
	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;
	
	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');
	
	          cleanup();
	
	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }
	
	  function freezeTransport () {
	    if (failed) return;
	
	    // Any callback called by transport should be ignored since now
	    failed = true;
	
	    cleanup();
	
	    transport.close();
	    transport = null;
	  }
	
	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;
	
	    freezeTransport();
	
	    debug('probe transport "%s" failed because of error: %s', name, err);
	
	    self.emit('upgradeError', error);
	  }
	
	  function onTransportClose () {
	    onerror('transport closed');
	  }
	
	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }
	
	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }
	
	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }
	
	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);
	
	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);
	
	  transport.open();
	};
	
	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */
	
	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();
	
	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};
	
	/**
	 * Handles a packet.
	 *
	 * @api private
	 */
	
	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
	
	    this.emit('packet', packet);
	
	    // Socket is live - any packet counts
	    this.emit('heartbeat');
	
	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;
	
	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;
	
	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;
	
	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};
	
	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */
	
	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();
	
	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};
	
	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */
	
	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};
	
	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};
	
	/**
	* Sends a ping packet.
	*
	* @api private
	*/
	
	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};
	
	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */
	
	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);
	
	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;
	
	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};
	
	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */
	
	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};
	
	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */
	
	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */
	
	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }
	
	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }
	
	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }
	
	  options = options || {};
	  options.compress = false !== options.compress;
	
	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};
	
	/**
	 * Closes the connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';
	
	    var self = this;
	
	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }
	
	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }
	
	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }
	
	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }
	
	  return this;
	};
	
	/**
	 * Called upon transport error
	 *
	 * @api private
	 */
	
	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};
	
	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */
	
	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;
	
	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);
	
	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');
	
	    // ensure transport won't stay open
	    this.transport.close();
	
	    // ignore further transport communication
	    this.transport.removeAllListeners();
	
	    // set ready state
	    this.readyState = 'closed';
	
	    // clear session id
	    this.id = null;
	
	    // emit close event
	    this.emit('close', reason, desc);
	
	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};
	
	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */
	
	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */
	
	var XMLHttpRequest = __webpack_require__(34);
	var XHR = __webpack_require__(36);
	var JSONP = __webpack_require__(53);
	var websocket = __webpack_require__(54);
	
	/**
	 * Export transports.
	 */
	
	exports.polling = polling;
	exports.websocket = websocket;
	
	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */
	
	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }
	
	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);
	
	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module
	
	var hasCORS = __webpack_require__(35);
	
	module.exports = function (opts) {
	  var xdomain = opts.xdomain;
	
	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;
	
	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;
	
	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }
	
	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }
	
	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */
	
	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */
	
	var XMLHttpRequest = __webpack_require__(34);
	var Polling = __webpack_require__(37);
	var Emitter = __webpack_require__(47);
	var inherit = __webpack_require__(49);
	var debug = __webpack_require__(51)('engine.io-client:polling-xhr');
	
	/**
	 * Module exports.
	 */
	
	module.exports = XHR;
	module.exports.Request = Request;
	
	/**
	 * Empty function
	 */
	
	function empty () {}
	
	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(XHR, Polling);
	
	/**
	 * XHR supports binary
	 */
	
	XHR.prototype.supportsBinary = true;
	
	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */
	
	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;
	
	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;
	
	  return new Request(opts);
	};
	
	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};
	
	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */
	
	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	
	  this.create();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Request.prototype);
	
	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */
	
	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;
	
	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }
	
	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }
	
	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}
	
	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }
	
	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }
	
	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }
	
	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }
	
	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};
	
	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */
	
	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};
	
	/**
	 * Called if we have data.
	 *
	 * @api private
	 */
	
	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};
	
	/**
	 * Called upon error.
	 *
	 * @api private
	 */
	
	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};
	
	/**
	 * Cleans up house.
	 *
	 * @api private
	 */
	
	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }
	
	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }
	
	  if (global.document) {
	    delete Request.requests[this.index];
	  }
	
	  this.xhr = null;
	};
	
	/**
	 * Called upon load.
	 *
	 * @api private
	 */
	
	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }
	
	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};
	
	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */
	
	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};
	
	/**
	 * Aborts the request.
	 *
	 * @api public
	 */
	
	Request.prototype.abort = function () {
	  this.cleanup();
	};
	
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */
	
	Request.requestsCount = 0;
	Request.requests = {};
	
	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}
	
	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(38);
	var parseqs = __webpack_require__(48);
	var parser = __webpack_require__(39);
	var inherit = __webpack_require__(49);
	var yeast = __webpack_require__(50);
	var debug = __webpack_require__(51)('engine.io-client:polling');
	
	/**
	 * Module exports.
	 */
	
	module.exports = Polling;
	
	/**
	 * Is XHR2 supported?
	 */
	
	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(34);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();
	
	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */
	
	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(Polling, Transport);
	
	/**
	 * Transport name.
	 */
	
	Polling.prototype.name = 'polling';
	
	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */
	
	Polling.prototype.doOpen = function () {
	  this.poll();
	};
	
	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */
	
	Polling.prototype.pause = function (onPause) {
	  var self = this;
	
	  this.readyState = 'pausing';
	
	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }
	
	  if (this.polling || !this.writable) {
	    var total = 0;
	
	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }
	
	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};
	
	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */
	
	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};
	
	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */
	
	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }
	
	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }
	
	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };
	
	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);
	
	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');
	
	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};
	
	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */
	
	Polling.prototype.doClose = function () {
	  var self = this;
	
	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }
	
	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};
	
	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */
	
	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };
	
	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';
	
	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(39);
	var Emitter = __webpack_require__(47);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Transport;
	
	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */
	
	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Transport.prototype);
	
	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */
	
	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};
	
	/**
	 * Opens the transport.
	 *
	 * @api public
	 */
	
	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }
	
	  return this;
	};
	
	/**
	 * Closes the transport.
	 *
	 * @api private
	 */
	
	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }
	
	  return this;
	};
	
	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};
	
	/**
	 * Called upon open
	 *
	 * @api private
	 */
	
	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};
	
	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */
	
	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};
	
	/**
	 * Called with a decoded packet.
	 */
	
	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon close.
	 *
	 * @api private
	 */
	
	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var keys = __webpack_require__(40);
	var hasBinary = __webpack_require__(41);
	var sliceBuffer = __webpack_require__(42);
	var after = __webpack_require__(43);
	var utf8 = __webpack_require__(44);
	
	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(45);
	}
	
	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */
	
	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
	
	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);
	
	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;
	
	/**
	 * Current protocol version.
	 */
	
	exports.protocol = 3;
	
	/**
	 * Packet types.
	 */
	
	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};
	
	var packetslist = keys(packets);
	
	/**
	 * Premade error packet.
	 */
	
	var err = { type: 'error', data: 'parser error' };
	
	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */
	
	var Blob = __webpack_require__(46);
	
	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */
	
	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }
	
	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }
	
	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;
	
	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }
	
	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }
	
	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];
	
	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }
	
	  return callback('' + encoded);
	
	};
	
	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}
	
	/**
	 * Encode packet helpers for binary types
	 */
	
	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);
	
	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }
	
	  return callback(resultBuffer.buffer);
	}
	
	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}
	
	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }
	
	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);
	
	  return callback(blob);
	}
	
	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */
	
	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }
	
	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};
	
	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */
	
	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }
	
	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);
	
	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }
	
	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }
	
	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};
	
	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}
	
	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */
	
	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }
	
	  var data = base64encoder.decode(msg.substr(1));
	
	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }
	
	  return { type: type, data: data };
	};
	
	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }
	
	  var isBinary = hasBinary(packets);
	
	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }
	
	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }
	
	  if (!packets.length) {
	    return callback('0:');
	  }
	
	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};
	
	/**
	 * Async array map using after
	 */
	
	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);
	
	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };
	
	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}
	
	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */
	
	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }
	
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	  var length = ''
	    , n, msg;
	
	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);
	
	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      msg = data.substr(i + 1, n);
	
	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);
	
	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }
	
	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }
	
	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }
	
	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	};
	
	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */
	
	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }
	
	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);
	
	    var resultArray = new Uint8Array(totalLength);
	
	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }
	
	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }
	
	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;
	
	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });
	
	    return callback(resultArray.buffer);
	  });
	};
	
	/**
	 * Encode as Blob
	 */
	
	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }
	
	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;
	
	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;
	
	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};
	
	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */
	
	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var bufferTail = data;
	  var buffers = [];
	
	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';
	
	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;
	
	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }
	
	      msgLength += tailArray[i];
	    }
	
	    if(numberTooLong) return callback(err, 0, 1);
	
	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);
	
	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }
	
	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }
	
	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */
	
	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;
	
	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */
	
	var isArray = __webpack_require__(27);
	
	/**
	 * Module exports.
	 */
	
	module.exports = hasBinary;
	
	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */
	
	function hasBinary(data) {
	
	  function _hasBinary(obj) {
	    if (!obj) return false;
	
	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }
	
	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }
	
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  return _hasBinary(data);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */
	
	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;
	
	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }
	
	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }
	
	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }
	
	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = after
	
	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count
	
	    return (count === 0) ? callback() : proxy
	
	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count
	
	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}
	
	function noop() {}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {
	
		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var stringFromCharCode = String.fromCharCode;
	
		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}
	
		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}
	
		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}
	
			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}
	
			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}
	
		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;
	
			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}
	
			if (byteIndex == byteCount) {
				return false;
			}
	
			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}
	
			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}
	
			throw Error('Invalid WTF-8 detected');
		}
	
		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}
	
		/*--------------------------------------------------------------------------*/
	
		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";
	
	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }
	
	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";
	
	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }
	
	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }
	
	    return base64;
	  };
	
	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;
	
	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }
	
	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);
	
	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];
	
	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }
	
	    return arraybuffer;
	  };
	})();


/***/ },
/* 46 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */
	
	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;
	
	/**
	 * Check if Blob constructor is supported
	 */
	
	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */
	
	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if BlobBuilder is supported
	 */
	
	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;
	
	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */
	
	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;
	
	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }
	
	      ary[i] = buf;
	    }
	  }
	}
	
	function BlobBuilderConstructor(ary, options) {
	  options = options || {};
	
	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);
	
	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }
	
	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};
	
	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};
	
	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */
	
	exports.encode = function (obj) {
	  var str = '';
	
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }
	
	  return str;
	};
	
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */
	
	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },
/* 49 */
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;
	
	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';
	
	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);
	
	  return encoded;
	}
	
	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;
	
	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }
	
	  return decoded;
	}
	
	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());
	
	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}
	
	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;
	
	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(52);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}
	
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(17);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);
	
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */
	
	var Polling = __webpack_require__(37);
	var inherit = __webpack_require__(49);
	
	/**
	 * Module exports.
	 */
	
	module.exports = JSONPPolling;
	
	/**
	 * Cached regular expressions.
	 */
	
	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;
	
	/**
	 * Global JSONP callbacks.
	 */
	
	var callbacks;
	
	/**
	 * Noop.
	 */
	
	function empty () { }
	
	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */
	
	function JSONPPolling (opts) {
	  Polling.call(this, opts);
	
	  this.query = this.query || {};
	
	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }
	
	  // callback identifier
	  this.index = callbacks.length;
	
	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });
	
	  // append to query string
	  this.query.j = this.index;
	
	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(JSONPPolling, Polling);
	
	/*
	 * JSONP only supports binary as base64 encoded strings
	 */
	
	JSONPPolling.prototype.supportsBinary = false;
	
	/**
	 * Closes the socket.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }
	
	  Polling.prototype.doClose.call(this);
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');
	
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };
	
	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;
	
	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);
	
	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};
	
	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;
	
	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;
	
	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);
	
	    this.form = form;
	    this.area = area;
	  }
	
	  this.form.action = this.uri();
	
	  function complete () {
	    initIframe();
	    fn();
	  }
	
	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }
	
	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }
	
	    iframe.id = self.iframeId;
	
	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }
	
	  initIframe();
	
	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');
	
	  try {
	    this.form.submit();
	  } catch (e) {}
	
	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(38);
	var parser = __webpack_require__(39);
	var parseqs = __webpack_require__(48);
	var inherit = __webpack_require__(49);
	var yeast = __webpack_require__(50);
	var debug = __webpack_require__(51)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(55);
	  } catch (e) { }
	}
	
	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */
	
	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = WS;
	
	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */
	
	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(WS, Transport);
	
	/**
	 * Transport name.
	 *
	 * @api public
	 */
	
	WS.prototype.name = 'websocket';
	
	/*
	 * WebSockets support binary
	 */
	
	WS.prototype.supportsBinary = true;
	
	/**
	 * Opens socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }
	
	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }
	
	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }
	
	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }
	
	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }
	
	  this.addEventListeners();
	};
	
	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */
	
	WS.prototype.addEventListeners = function () {
	  var self = this;
	
	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};
	
	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */
	
	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	
	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }
	
	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }
	
	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }
	
	        --total || done();
	      });
	    })(packets[i]);
	  }
	
	  function done () {
	    self.emit('flush');
	
	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};
	
	/**
	 * Called upon close
	 *
	 * @api private
	 */
	
	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};
	
	/**
	 * Closes socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';
	
	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};
	
	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */
	
	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 55 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 56 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;
	
	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */
	
	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;
	
	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }
	
	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');
	
	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }
	
	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(18);
	var Emitter = __webpack_require__(59);
	var toArray = __webpack_require__(60);
	var on = __webpack_require__(61);
	var bind = __webpack_require__(62);
	var debug = __webpack_require__(14)('socket.io-client:socket');
	var hasBin = __webpack_require__(41);
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = Socket;
	
	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */
	
	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};
	
	/**
	 * Shortcut to `Emitter#emit`.
	 */
	
	var emit = Emitter.prototype.emit;
	
	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */
	
	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */
	
	Socket.prototype.subEvents = function () {
	  if (this.subs) return;
	
	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};
	
	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */
	
	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;
	
	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};
	
	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};
	
	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }
	
	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };
	
	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;
	
	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }
	
	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }
	
	  delete this.flags;
	
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};
	
	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */
	
	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');
	
	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};
	
	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */
	
	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};
	
	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;
	
	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;
	
	    case parser.EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.ACK:
	      this.onack(packet);
	      break;
	
	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;
	
	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;
	
	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};
	
	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);
	
	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }
	
	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};
	
	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */
	
	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);
	
	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};
	
	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};
	
	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */
	
	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};
	
	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */
	
	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];
	
	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};
	
	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */
	
	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};
	
	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */
	
	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }
	
	  this.io.destroy(this);
	};
	
	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }
	
	  // remove socket from pool
	  this.destroy();
	
	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};
	
	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = toArray
	
	function toArray(list, index) {
	    var array = []
	
	    index = index || 0
	
	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }
	
	    return array
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = on;
	
	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */
	
	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Slice reference.
	 */
	
	var slice = [].slice;
	
	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */
	
	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ },
/* 63 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */
	
	module.exports = Backoff;
	
	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}
	
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */
	
	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};
	
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */
	
	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};
	
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};
	
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};
	
	/**
	 * Set the jitter
	 *
	 * @api public
	 */
	
	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};
	


/***/ },
/* 64 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=rocket-trader.js.map