const Dom = require('./dom.js');
class traderDialogue{
    constructor(config,engine){
        let _this = this ;
        _this._engine = engine;

        _this._id = Dom.initDialogue();
        _this._createVm();
    }
    _createVm() {
        let _this = this ;
        _this.vm = new Vue({
            el:'#trader-dialog',
            data:{
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
                        buy: '#1A74DD',
                    }
                },
                langType: 'en', //en,cn
                langs: {
                    'cn':{
                        'success1': '订单交易成功！',
                        'success2': '订单平仓成功！',
                    },
                    'en':{
                        'success1': 'Transaction Successful!',
                        'success2': 'Close Successful!',
                    }
                },
                timeOut: 2, //s
            },

            methods:{
                close: function(){
                    this.show = !this.show;
                },
                showLoadingDia:function(){
                    this.show = true;
                    this.showLoading = true;
                },
                showDialogue:function(no,type,hand,currency,price, key){
                    if(this.langType == 'cn'){
                        this.title = this.langs.cn[key];
                    }else if(this.langType == 'en'){
                        this.title = this.langs.en[key];
                    }

                    this.msgTrade.no = no ;
                    this.msgTrade.type = type==1?'buy':'sell' ;
                    this.msgTrade.hand = hand ;
                    this.msgTrade.currency = currency ;
                    this.msgTrade.price = price ;
                    this.showLoading = false;
                    this.type = 'success';
                    let that = this;
                    let close = function(){
                        that.show = false;
                    }

                    if(!this.showLoading)
                        setTimeout(close, this.timeOut * 1000);
                },
                showErrDia:()=>{
                    this.vm.showLoading = false;
                    this.vm.type ='error'
                    // this.show = true;
                    this.vm.msg = 'error'
                    this.vm.title = 'error'
                    let close = function(){
                        this.vm.show = false;
                    }

                    if(this.vm.show)
                        setTimeout(close, this.vm.timeOut * 1000);
                }
            },
            computed: {
                'typeImg': function(){
                    if(this.type == 'success'){
                        return ['iconfont', 'icon-dagou'];
                    }else if(this.type == 'error'){
                        return ['iconfont', 'icon-cuo'];
                    }else if(this.type == 'warning'){
                        return ['iconfont', 'icon-gantanhao'];
                    }
                },
                'typeBg': function(){
                    if(this.type == 'success'){
                        return '#7db93d';
                    }else if(this.type == 'error'){
                        return '#cc413c';
                    }else if(this.type == 'warning'){
                        return '#e6a523';
                    }
                },
                'sellOrBuy': function(){
                    if(this.msgTrade.type == 'sell'){
                        return 'color:'+ this.msgTrade.colors.sell;
                    }else{
                        return 'color:'+ this.msgTrade.colors.buy;
                    }
                }

            },
            mounted: function(){

            }
        })

    }
}
module.exports = traderDialogue;
