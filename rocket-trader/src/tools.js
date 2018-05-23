'use strict'

const Dom = require('./dom.js');

class Tools {
    constructor(config, engine) {
        let _this = this;

        _this._engine = engine;

        _this._id = Dom.initDom(config.toolBarElement);

        _this._createVm(config.toolBarElement);
    }

    _createVm(id) {
        let _this = this;

        _this.vm = new Vue({
            el: '#' + id,
            data:{
                user:'',
                password:'',
                symbolList:["AUDCAD","AUDCHF","AUDJPY","AUDUSD","CADCHF","CADJPY","EURAUD","EURCAD","EURCHF","EURGBP","EURJPY","EURNZD","EURUSD","GBPAUD","GBPCAD","GBPCHF","GBPJPY","GBPNZD","GBPUSD","NZDCAD","NZDCHF","NZDJPY","NZDUSD","USDCAD","USDCHF","USDJPY",],
                nowSymbol:'GBPUSD',
                symbolListShow:false,
                nowPeriod:'M1',
                periodList :['M1','M5','M15','M30'],
                periodListShow:false,
                nowPrice:{
                    'AUDCAD':['0.00000','0.00000'],
                    'AUDCHF':['0.00000','0.00000'],
                    'AUDJPY':['0.000','0.000'],
                    'AUDUSD':['0.00000','0.00000'],
                    'CADCHF':['0.00000','0.00000'],
                    'CADJPY':['0.000','0.000'],
                    'EURAUD':['0.00000','0.00000'],
                    'EURCAD':['0.00000','0.00000'],
                    'EURCHF':['0.00000','0.00000'],
                    'EURGBP':['0.00000','0.00000'],
                    'EURJPY':['0.000','0.000'],
                    'EURNZD':['0.00000','0.00000'],
                    'EURUSD':['0.00000','0.00000'],
                    'GBPAUD':['0.00000','0.00000'],
                    'GBPCAD':['0.00000','0.00000'],
                    'GBPCHF':['0.00000','0.00000'],
                    'GBPJPY':['0.000','0.000'],
                    'GBPNZD':['0.00000','0.00000'],
                    'GBPUSD':['0.00000','0.00000'],
                    'NZDCAD':['0.00000','0.00000'],
                    'NZDCHF':['0.00000','0.00000'],
                    'NZDJPY':['0.000','0.000'],
                    'NZDUSD':['0.00000','0.00000'],
                    'USDCAD':['0.00000','0.00000'],
                    'USDCHF':['0.00000','0.00000'],
                    'USDJPY':['0.000','0.000'],
                    // 'XAGUSD':['0.00000','0.00000'],
                    // 'XAUUSD':['0.00000','0.00000'],
                },
                prePrice:{
                    'AUDCAD':['0.00000','0.00000'],
                    'AUDCHF':['0.00000','0.00000'],
                    'AUDJPY':['0.000','0.000'],
                    'AUDUSD':['0.00000','0.00000'],
                    'CADCHF':['0.00000','0.00000'],
                    'CADJPY':['0.000','0.000'],
                    'EURAUD':['0.00000','0.00000'],
                    'EURCAD':['0.00000','0.00000'],
                    'EURCHF':['0.00000','0.00000'],
                    'EURGBP':['0.00000','0.00000'],
                    'EURJPY':['0.000','0.000'],
                    'EURNZD':['0.00000','0.00000'],
                    'EURUSD':['0.00000','0.00000'],
                    'GBPAUD':['0.00000','0.00000'],
                    'GBPCAD':['0.00000','0.00000'],
                    'GBPCHF':['0.00000','0.00000'],
                    'GBPJPY':['0.000','0.000'],
                    'GBPNZD':['0.00000','0.00000'],
                    'GBPUSD':['0.00000','0.00000'],
                    'NZDCAD':['0.00000','0.00000'],
                    'NZDCHF':['0.00000','0.00000'],
                    'NZDJPY':['0.000','0.000'],
                    'NZDUSD':['0.00000','0.00000'],
                    'USDCAD':['0.00000','0.00000'],
                    'USDCHF':['0.00000','0.00000'],
                    'USDJPY':['0.000','0.000'],
                    // 'XAGUSD':['0.00000','0.00000'],
                    // 'XAUUSD':['0.00000','0.00000'],
                },
                nowChart:'Candle',
                chartListShow:false,
                chartList:['Candle','Line'],
                raiseColor: '#D0011B',
                fallColor: '#1A74DD',
            },
            methods: {
                ChangeChartType: (type) => {
                    _this._engine.ChangeChartType(type);
                },
                SwitchTimeInterval: (m) => {
                    _this._engine.SwitchTimeInterval(m)
                },
                Zoom: (plus) => {
                    _this._engine.Zoom(plus);
                },
                Cross: () => {
                    _this._engine.ToggleCross()
                },
                Move: () => {
                    _this._engine.ToggleHangMove(true)
                },

                close:() =>{
                    _this._engine.close()
                },
                login:()=>{
                    _this._engine.login(_this.vm.user,_this.vm.password)
                },
                logout:()=>{
                    _this._engine.logout()
                },
                toggleSymbol:()=>{
                    this.vm.symbolListShow = !this.vm.symbolListShow
                },
                changeSymbol:index=>{
                    this.vm.nowSymbol = this.vm.symbolList[index]
                    this.vm.symbolListShow = false
                        _this._engine.ChangeSymbol(this.vm.symbolList[index]);
                },
                togglePeriod:()=>{
                    this.vm.periodListShow = !this.vm.periodListShow
                },
                changePeriod:index=>{
                    this.vm.nowPeriod = this.vm.periodList[index]
                    this.vm.periodListShow = false
                    _this._engine.SwitchTimeInterval(this.vm.periodList[index].toLowerCase());
                },
                toggleChart:()=>{
                    this.vm.chartListShow = !this.vm.chartListShow
                },
                changeChart:(index)=>{
                    this.vm.nowChart = this.vm.chartList[index]
                    this.vm.chartListShow = false
                    _this._engine.ChangeChartType(this.vm.nowChart);
                },
                changeNowPrice:function (data){
                    var _this = this ,
                        symbol = data[3],
                        nowPriceArr = _this.nowPrice[symbol],
                        prePriceArr = _this.prePrice[symbol];
                        if(nowPriceArr){
                            prePriceArr[0] = nowPriceArr[0]
                            prePriceArr[1] = nowPriceArr[1]
                            nowPriceArr.pop();
                            nowPriceArr.pop();
                            nowPriceArr.push(data[1])
                            nowPriceArr.push(data[2])

                        }

                }
            },
            mounted:function(){
                var _this = this ;
                document.addEventListener('click',(e)=>{
                    let target = e.target
                    try {
                        if(_this.symbolListShow == true && !matchesSelector(target,'.symbol-list li') && !matchesSelector(target,'span.nowSymbol.tool-item') && !matchesSelector(target,'span.nowSymbol i.triangledown')){
                            _this.symbolListShow = false
                        }
                        if (_this.periodListShow == true && !matchesSelector(target,'.period-list li') && !matchesSelector(target,'span.nowPeriod.tool-item') && !matchesSelector(target,'span.nowPeriod i.triangledown')){
                            _this.periodListShow = false
                        }
                        if(_this.chartListShow == true && !matchesSelector(target,'.chart-list li') && !matchesSelector(target,'span.nowChart.tool-item') && !matchesSelector(target,'span.nowChart i.triangledown')){
                            _this.chartListShow = false
                        }
                    } catch (e) {
                        if(_this.symbolListShow == true && !target.matchesSeletor('.symbol-list li') && !target.matches('span.nowSymbol.tool-item') && !target.matches('span.nowSymbol i.triangledown')){
                            _this.symbolListShow = false
                        }
                        if (_this.periodListShow == true && !target.matchesSeletor('.period-list li') && !target.matches('span.nowPeriod.tool-item') && !target.matches('span.nowPeriod i.triangledown')){
                            _this.periodListShow = false
                        }
                        if(_this.chartListShow == true && !target.matchesSeletor('.chart-list li') && !target.matches('span.nowChart.tool-item') && !target.matches('span.nowChart i.triangledown')){
                            _this.chartListShow = false
                        }
                    }

                })
            }

        })

    }
}
function matchesSelector(el,selector){
    var p = Element.prototype
    var f = p.macthes
        || p.webkitMathcesSelector
        || p.mozMathcesSelector
        || p.msMathcesSelector
        ||function(s){
            return [].indexOf.call(document.querySelectorAll(s),this) !== -1;
        };
        return f.call(el,selector)
}
module.exports = Tools;
