const Dom = require('./dom.js');
class operation {
    constructor(config, engine) {
        let _this = this;
        _this._engine = engine;

        _this._id = Dom.initOperationDom(config.operationtElement);
        _this._createVm(config.operationtElement);
    }
    _createVm(id) {
        let _this = this;
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
                'step': 0.01,
            },
            methods: {
                decrease: function(e) {
                    if (+(this.value - this.step).toFixed(2) >= this.min) {
                        this.value = +(+(this.value - this.step).toFixed(2));
                    } else {
                        this.value = +this.min;
                    }
                    
                    document.querySelector('.inputValue').value = this.value;
                },
                increase: function(e) {
                    if (+(this.value + this.step).toFixed(2) <= this.max) {
                        this.value = +(+(this.value + this.step).toFixed(2));
                    } else {
                        this.value = +this.max;
                    }

                    document.querySelector('.inputValue').value = this.value;
                },
                handleBlur: function(e) {
                    var newValue = +e.target.value;
                    if (isNaN(newValue)) {
                        e.target.value = this.value;
                    } else {
                        var bits = this.step.toString().split('.')[1].length;
                        newValue = +(newValue.toFixed(bits));

                        if (newValue >= this.max) {
                            newValue = this.max;
                        } else if (newValue <= this.min) {
                            newValue = this.min;
                        }

                        e.target.value = this.value = newValue;
                    }
                },
                buy: () => {
                    _this._engine.buy(this.vm.value)
                },
                sell: () => {
                    _this._engine.sell(this.vm.value)
                },
            },
            computed: {
                'priceLength': function() {
                    return (this.nowPrice[1] + '').length
                },
            }
        })

    }
}
module.exports = operation;
