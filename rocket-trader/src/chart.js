/*
   版本2:
   每次获取新价格重绘所有历史记录
   */


module.exports = Chart;

function Chart(config) {

    let self = this;

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
        _boxHeight:38,
        zoom: 3,
        /* config of indicates */
        indi: {
            verlineon: false
        },
        candleRiseColor:'#3d63ae',
        candleFallColor:'#d22c39',
        croseLableColor:'#000',//十字坐标标签价格
        croseLableOpacity:'0.8',//狮子坐标标签透明度
        croseLineColor:'#000',//十字坐标颜色
        croseLineOpactiy:'0.4',//十字坐标线透明度
        currentPriceLabelColor:'#000',//现在价格标签颜色
        currentPriceLabelOpacity:'1',//现在价格标签透明度
        currentPriceLineColor:'#000'
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
Chart.prototype._roundRect  = _roundRect;

/*更新及时图*/
Chart.prototype.UpdateNowChart  = UpdateNowChart;

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
    let _this = this;



    Object.assign(_this.config, config);

    /* 容器宽高 */

    let canvasContainer = document.getElementById(_this.config.element);    //配置Element中的canvas-wapper这个dom
    // 清空容器里的所有东西
    canvasContainer.innerHTML = '';
    //创建包裹
    let canvansWapper = document.createElement('div');
    canvansWapper.id = 'canvans-wapper'
    canvansWapper.style.position = 'relative';
    canvansWapper.style.border = '1px solid rgb(226,226,226)';
    canvansWapper.style.borderRadius = '5px';
    canvansWapper.style.overflow = 'hidden';
    canvansWapper.style.height = '100%';
    canvansWapper.style.width = '100%';


    let canvasLoading = document.createElement('div');
    canvasLoading.className = 'loading-box-c';
    _this.chartLoading = canvasLoading;
    canvansWapper.appendChild(canvasLoading);

    _this.canvansWapper = canvansWapper;
    canvasContainer.appendChild(canvansWapper);
    /* 创建绘图的canvas dom */
    let newEle = document.createElement('canvas');
    canvansWapper.appendChild(newEle);
    _this.chartDom = newEle;
    _this.chartContext = newEle.getContext('2d');

    /* 创建背景canvas dom */
    let newEle2 = document.createElement('canvas');
    newEle2.style.position = 'absolute';
    newEle2.style.left = '0';
    newEle2.style.top = '0';
    canvansWapper.appendChild(newEle2);
    _this.iChartDom = newEle2;
    _this.iChartContext = newEle2.getContext('2d');

    //如果配置有创建即时图canvas dom
    if(_this.config.operationtElement){
        let nowChartContainer = document.getElementById('tick-chart'),
            newEle3 = document.createElement('canvas');
        nowChartContainer.appendChild(newEle3);
        _this.nowChartDom  = newEle3;
        _this.nowChartContext = newEle3.getContext('2d');
        _this.nowChartDom.width= 160;
        _this.nowChartDom.height= 160;
    }
    //根据配置调整canvas大小
    _this._setCanvasSize();
    //绑定拖动窗口时间重设canvas大小
    _this._resizeCanvas();
    _this.config._candleTimeInterval = _this.config.zoom * _this.candle[_this.config.candlePeriod].min;

}

/* 初始化 画图区域 */
function _initDrawingScale() {
    let _this = this;

    /* 当前价格 */
    let curPrice, curPoint;
    curPrice = _this.currentPricePair;

    /* 绘图区域确定 */
    let nowtime, strokeLocation;
    strokeLocation = _this.width -120;
    nowtime = _this.candleHistoryPrice[ _this.candleHistoryPrice.length-1][0];

    let timeInterval = _this.config._candleTimeInterval;


    _this.scaleLeft = [0, nowtime - (_this.width-120) * timeInterval * 60000/60];
    _this.scaleRight = [strokeLocation, nowtime];
    _this.scaleTop = [100, 0,];
    _this.scaleBottom = [_this.height - 100, 0];

}

function _drawBackground() {
    let _this = this;

    let ctx = _this.chartContext,
        w = _this.width,
        h = _this.height;
    _this._draw([
        'fillStyle'
    ], function() {
        ctx.fillStyle = _this.config.chartBackground || '#000';

        ctx.beginPath();

        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);

        ctx.fill();

        ctx.closePath();

    })

}

/*loading 显示 (bolean)*/
function loadingShow(b){
    let _this = this;
    if(b){
        _this.chartLoading.style.display = 'block';
    }else{
        _this.chartLoading.style.display = 'none';
    }
}

/* 画网格，座标和横座标时间 */
function _drawCoordinates() {
    let _this = this;

    let ctx = _this.chartContext, // 绘图对象 在第蜡烛图上画
        //timeInterval = _this.config._candleTimeInterval, // 网格间隔，1分钟
        //nowPairs = _this.currentPricePair, // 最新的价格和时间对
        // numOfVertical = _this.numOfVertical, //网格纵向数量
        // numOfHorizental = _this.numOfHorizental, //网格横向数量
        canvasWidth = _this.width,
        canvasHeight = _this.height;

    let boxWidth = 60, // 单元格宽度
        boxHeight = _this.config._boxHeight; // 单元格高度

    /* 画网格 */
    let i, j;

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
    for (i = 1; i < canvasWidth/boxWidth; i++) {
        ctx.moveTo(_this.width-boxWidth * i, 0);
        ctx.lineTo(_this.width-boxWidth * i, canvasHeight);
        if (i % 2 === 0 && i >2) {
            /* 填充时间文本 */
            ctx.fillText(_this._getPointTime(_this.width-boxWidth*i), _this.width-boxWidth * i+3, canvasHeight-7);
        }
    }


    /* 画横线(价格) */

    for (j = 1; j < canvasHeight/boxHeight; j++) {
        ctx.moveTo(0, canvasHeight - boxHeight * j);
        ctx.lineTo(canvasWidth, canvasHeight - boxHeight * j);

        var text = _this._getPointPrice(canvasHeight - boxHeight * j);
        var x_pos = canvasWidth - 54;

        if(_this.config.currency.match('JPY')== null){
            ctx.fillText(text, x_pos,canvasHeight - boxHeight * j + 12);
        }
        else{
            ctx.fillText(Number(text).toFixed(3), x_pos-3,canvasHeight - boxHeight * j + 12);
        }
    }

    ctx.stroke();
    ctx.closePath();
}

function _genVerticalScale() {
    let _this = this;
    let timePxRatio;
    let viewPortLeft;
    let viewPortRight;
    timePxRatio =_this.config._candleTimeInterval*1000*60 /60;

    viewPortLeft =  _this.scaleLeft[1] - _this.scaleLeft[0]*timePxRatio;
    //由于开始价格从倒数第二列开始画 因此要补充一列的时间
    viewPortRight = (_this.scaleRight[1] - _this.scaleLeft[0]*timePxRatio) + _this.config._candleTimeInterval*1000*60;
    /* 当前价格 如果超出绘图scale则重新计算scale */
    // let point = _this.currentPricePair;
    // if (!point || !(point[1] < _this.scaleBottom[1] || point[1] > _this.scaleTop[1])) {
    //     return;
    // }

    let max = -1,
        min = 100000000,
        price1,
        price2,
        startTime = _this.scaleLeft[1];

    for (let i = _this.candleHistoryPrice.length - 1; i > 0; i--) {
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
        let tmax = -1,
            tmin = 100000000;
        for (let j = _this.candleHistoryPrice.length - 1; j >= 0; j--) {
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
    if(Math.ceil(Math.log(max-min)/Math.LN10 ) ==-4){
        _this.config._boxHeight = 38;
    }
    else{
        _this.config._boxHeight = 42;
    }
    //_this.scaleTop[1] = parseFloat(max) + (parseFloat(max) - parseFloat(min)) / 2;
    _this.scaleTop[1] = parseFloat(max);
    //_this.scaleBottom[1] = parseFloat(min) - (parseFloat(max) - parseFloat(min)) / 2;
    _this.scaleBottom[1] = parseFloat(min);
}

function _initTickChartStyle() {
    let _this = this;
    let context = _this.chartContext;

    let gradient = _this.chartContext.createLinearGradient(0, _this.scaleBottom[0], 0, 0);
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
    let _this = this;

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
    let _this = this;

    /*
     *
     *  Drawing logics added below
     *
     * */
    /* ============================================== */
    let ctx = _this.chartContext;

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
    let _this = this;
    let ctx = _this.chartContext;

    /* 重设为直线 */
    ctx.setLineDash([0, 0]);

    ctx.globalAlpha = 1;
}

function _drawTickHistoryPrice() {
    let _this = this;
    let historyPrice = _this.historyPrice;
    /* 历史数据长度 */
    let allLength = historyPrice.length;
    /* 最新数据 */
    let currentPricePair = _this.currentPricePair;

    if (!currentPricePair) {
        return;
    }

    _this._draw([
        'globalAlpha',
        'lineWidth',
        'strokeStyle',
        'fillStyle'
    ], function() {

        /* 最新数据对应的图上的点 */
        let currentPoint = _this._getPoint(currentPricePair);
        let lastLinePoint = _this._getPoint(historyPrice[allLength-1]);
        /* ctx */
        let context = _this.chartContext;

        _this._initTickChartStyle();

        /* 画线 */
        context.beginPath();

        context.moveTo(lastLinePoint[0], currentPoint[1]);

        let price, point;

        /* 记录循环中的横座标，如果上一个与当前相同则不画线，避免出现竖线 */
        let tmp = [];
        /* 清空记录十字可移动的点 */
        _this.crossLinePoint = [];

        context.moveTo.apply(context, currentPoint);
        for (let i = allLength - 1; i > 0; i--) {
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
    let _this = this;

    let context = _this.chartContext,
        allcandleslen = _this.candleHistoryPrice.length,
        allcandles = _this.candleHistoryPrice,
        mintime = _this.scaleLeft[0],
        g,
        candles = [],
        period = _this.candle[_this.config.candlePeriod].period;


    /* 重设为直线 */
    context.setLineDash([0, 0]);


    /* 清空记录十字可移动的点 */
    _this.crossLinePoint = [];
    for (let i = allcandleslen; i >0; i--) {
        _this._drawCandle.call(_this, allcandles[i-1], context);
    }
    let currentPricePair = _this.currentPricePair;
    let currentPoint = _this._getPoint(currentPricePair);

    _this._drawLatestLine(currentPricePair, currentPoint);
}

function SwitchTimeInterval(m) {

    this.config.candlePeriod = m;

    this.config._candleTimeInterval = this.config.zoom * this.candle[m].min;

    this._initDrawingScale();
}

function _drawCandle(candle, context) {
    let _this = this;
    let margin;
    let zoom = _this.config.zoom;
    let candleMargin = _this.config._candleMargin;
    let candleTimeStamp = candle[0];
    let startp = _this._getPoint([candle[0],candle[1]]);//开盘
    let endp = _this._getPoint([candle[0],candle[4]]);
    let mx = _this._getPoint([candle[0], candle[2]]);
    let mn = _this._getPoint([candle[0], candle[3]]);
    //根据zoom计算蜡烛的宽度的1/2
    switch (true) {
        case zoom == 1:
            margin =17
            break;
        case zoom == 3:
            margin = 5;
            break;
        case zoom == 5:
            margin = 3
            break;
        case zoom == 7:
            margin = 2
            break;
        case zoom == 9:
            margin =1.5
            break;
        case zoom == 11:
            margin =0.5
            break;
        default:

    }
    context.save()
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(_this.width-60,0)
    context.lineTo(_this.width-60,_this.height)
    context.lineTo(0,_this.height)
    context.lineTo(0,0)
    context.closePath();
    context.clip()
    context.beginPath();
    let green = _this.config.candleRiseColor;
    let red = _this.config.candleFallColor;

    if (startp[1] === endp[1]) {
        /* 开盘价和收盘价相等 */
        context.lineWidth = "1";

        /* 画贯穿蜡烛的竖线,最高和最低 */
        context.moveTo(mx[0], mx[1]);
        context.lineTo(mn[0], mn[1]);

        /* 画一条横线 */
        context.moveTo(startp[0] -margin, startp[1]);
        context.lineTo(endp[0] +margin, endp[1]);
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

        context.fillRect(startp[0]-margin,startp[1],2*margin,endp[1]-startp[1])

        context.closePath();

    }
    context.restore();
    /* 加一个蜡烛中心点，十字可停留 */
    _this.crossLinePoint.push(startp[0] );
}
/* 画横线 */
function _drawLatestLine(curPrice, coor) {
    let _this = this,
        ctx = _this.chartContext,
        curPriceAll = parseFloat(curPrice[1]).toFixed(5) + '',
        curPriceBig = curPriceAll.slice(0,5),
        curPriceSmall =curPriceAll.slice(5,8);
    ctx.strokeStyle = _this.config.currentPriceLineColor;
    ctx.save()
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
    _this._roundRect(_this.width - 82, coor[1] - 15,80,30,3,ctx);
    ctx.moveTo(_this.width - 82, coor[1] - 5);
    ctx.lineTo(_this.width - 87, coor[1] );
    ctx.lineTo(_this.width - 82, coor[1]+5 );
    ctx.lineTo(_this.width - 82, coor[1]-5 );
    ctx.fill();

    ctx.closePath();



    ctx.fillStyle = '#fff';
    ctx.beginPath();
    if(_this.config.currency.match('JPY')== null){
        ctx.font= '10px Arial'
        ctx.fillText(curPriceBig, _this.width - 67, coor[1] + 5);
        ctx.font='16px Arial'
        ctx.fillText(curPriceSmall, _this.width - 35, coor[1] + 5);

    }
    else{
        ctx.font= '10px Arial'
        ctx.fillText(parseFloat(curPrice[1]).toFixed(3), _this.width - 60, coor[1] + 5);
    }
    ctx.fill();
    ctx.restore()
}

function ChangeChartType(newtype) {
    let self = this;

    if (!self.supportChartType.includes(newtype)) {
        throw new Error('invalid chart type');
    }

    self.config.chartType = newtype;
}


function _getPoint(point) { //获取某一个价格对【time,price】 在图上的横纵坐标
    if (!point) {
        return;
    }
    let _this = this;
    let coordinate = [];
    /* 时间和坐标比 */
    let pointInterval =  _this.config._candleTimeInterval*60000/60;
    /* 左边距 + 时间单位 * （价格时间 - 左边时间） */
    coordinate[0] =  Math.round(_this.scaleRight[0] -  ( _this.scaleRight[1]-point[0])*10000000000000000000000000000000000000000000000000000000000/pointInterval/10000000000000000000000000000000000000000000000000000000000);

    /* 座标和价格比 */
    pointInterval =(_this.scaleTop[1] - _this.scaleBottom[1])/ (_this.scaleBottom[0] - _this.scaleTop[0]) ;
    /*  */
    coordinate[1] =  Math.round(_this.scaleTop[0] + (_this.scaleTop[1] - point[1])/pointInterval );

    return coordinate;
}


/* 判断是否应该回退 */
function _shouldGenHorizentalScale(price) {
    let _this = this;

    let timeInterval = _this.config._candleTimeInterval;

    if (price[0] > (_this.scaleRight[1] + timeInterval * 60 * 1000/_this.config.zoom)) {
        return true;
    } else {
        return false;
    }

}

/* 修改为  重设横座标scale */
function GenHorizentalScale(reset, curPrice) {
    let _this = this;

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
    let nowtime, strokeLocation;
    strokeLocation = _this.width-120;

    nowtime =  _this.candleHistoryPrice[ _this.candleHistoryPrice.length-1][0];
    let timeInterval = _this.config._candleTimeInterval;
    // _this.scaleLeft = [0, nowtime - (_this.width-120) * timeInterval * 60000/60];
    // _this.scaleRight = [strokeLocation, nowtime];
    _this.scaleLeft[1] = nowtime - (_this.width-120) * timeInterval * 60000/60
    _this.scaleRight[1] =  nowtime
}

function AddCandleHistoryPrice(data) {
    let _this = this;

    /* 判断最后一个的时间 */
    if (!_this.currentPricePair) {
        return;
    }
    /* 过滤重复数据 */
    if (_this.currentPricePair[0] === data[0]) {
        return;
    }

    let last = _this.candleHistoryPrice[_this.candleHistoryPrice.length - 1];
    if (!last) {
        return;
    }
    let time, open, close, high, low;
    let period = _this.candle[_this.config.candlePeriod].period;

    if (parseInt(data[0]) > (parseInt(last[0]) + period)) {
        /* new candle */
        _this.candleHistoryPrice.push([(parseInt(last[0]) + period), data[1], data[1], data[1], data[1]]);
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
    let _this = this;
    let dom = _this.iChartDom;

    dom.onmouseup = null;
    dom.onmousedown = null;
    dom.onmouseout = null;
    dom.onmousemove = null;
    dom.onclick = null;
}

function ListenMoveChart() {
    let _this = this;
    let dom = _this.iChartDom;

    _this.config.handmove = true;

    _this._removeListeners();

    dom.onmousedown = _this._handmovekeydown.bind(_this);
    dom.onmouseup = _this._handmovekeyup.bind(_this);
}

function _handmovekeydown() {
    let _this = this;
    let dom = _this.iChartDom;
    let minMoveDistance = 60/this.config.zoom;
    let tmpx;
    let timePxRatio = this.config._candleTimeInterval *60*1000/60
    dom.onmousemove = function(e) {
        let x, dis;
        x = e.offsetX;
        if (tmpx) {
            dis = Math.round((x - tmpx)/minMoveDistance*2)*minMoveDistance
            _this.scaleLeft[0] += dis;
            _this.scaleRight [0] += dis;
        }
        tmpx = x;
        var viewPortLeft = _this.scaleLeft[1]-_this.scaleLeft[0]*timePxRatio;
        if(viewPortLeft<_this.candleHistoryPrice[0][0]){
            _this.parent.askAddMoreHistoryPirce(_this.candleHistoryPrice[0][0])
        }
    };
}

function _handmovekeyup() {
    let _this = this;
    let dom = _this.iChartDom;

    dom.onmousemove = null;
}

function ListenIndiVerLine() {
    let _this = this;
    let dom = _this.iChartDom;

    _this.config.indi.verlineon = true;

    _this._removeListeners();

    dom.onclick = _this._verlineclick.bind(_this);
}

function _verlineclick(e) {
    let _this = this;

    let y = e.offsetY;

    _this.indicators.horLine = y;
}

function _listenCross() {
    let _this = this;
    let dom = _this.iChartDom;

    _this.config._crosson = true;

    _this._removeListeners();

    dom.onmouseout = _this._crosemouseout.bind(_this);
    dom.onmousemove = _this._crosemousemove.bind(_this);
}

function _crosemouseout() {
    let _this = this;
    let ctx = _this.iChartContext;
    let width = _this.width;
    let height = _this.height;
    ctx.clearRect(0, 0, width, height);
}

function _crosemousemove(e) {
    let _this = this;
    let ctx = _this.iChartContext,
        points = _this.crossLinePoint;
    let x = e.offsetX;
    let y = e.offsetY;
    let width = _this.width;
    let height = _this.height;
    ctx.save();

    /* 找到最近的可停靠点 */
    let len = points.length;
    let i, t, hint, tmp;

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
    ctx.globalAlpha  = _this.config.croseLineOpactiy
    ctx.stroke();


    /* 画纵座标小框 */
    ctx.fillStyle = _this.config.currentPriceLabelColor;
    ctx.globalAlpha = _this.config.croseLableOpacity;
    _this._roundRect(x-50,height-26,100,24,3,ctx);
    ctx.fill();
    /* 画横座标小框 */
    _this._roundRect(width - 62, y - 12,60,24,3,ctx);

    ctx.fill();

    /* 填充文本 */
    ctx.font = '10px Arial'
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';

    if(_this.config.currency.match('JPY')== null){
        ctx.fillText(_this._getPointPrice(y), width - 54, y + 5);    
    }else{
        ctx.fillText(Number(_this._getPointPrice(y)).toFixed(3), width - 54, y + 5);
    }

    ctx.fillText(_this._getPointTime(x), x - 32, height -9);  
    ctx.restore()
}

function _stopListenCross() {
    let _this = this;
    let dom = _this.iChartDom;

    _this.config._crosson = false;

    dom.onmouseout = null;
    dom.onmousemove = null;
}

function StopListenMoveChart() {
    let _this = this;

    let dom = _this.iChartDom;

    _this.config.handmove = false;

    _this._initDrawingScale();

    dom.onmousedown = null;
    dom.onmouseup = null;
}

function SetHistoryPrice(msg) {
    let _this = this;

    _this.currentPricePair = msg[msg.length - 1];

    _this.historyPrice = msg;
    _this._initDrawingScale();

    return _this;
}

function SetCandleHistory(msg) {
    let _this = this;

    _this.candleHistoryPrice = msg;

    return _this;
}

function Zoom(plus) {
    let _this = this;

    let m = _this.config.candlePeriod;

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
    let _this = this;

    _this._drawHorLine();
    _this._drawVerLine();
}

function _drawVerLine() {
    let _this = this;
    let point = _this.indicators.verLine;

    if (!point) {
        return;
    }

    let ctx = _this.chartContext;

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
    let _this = this;
    let point = _this.indicators.horLine;

    if (!point) {
        return;
    }

    let ctx = _this.chartContext;

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
    let _this = this;
    let proption;
    proption = (_this.scaleBottom[0] - _this.scaleTop[0]) / ((_this.scaleTop[1] - _this.scaleBottom[1]) );
    return (_this.scaleTop[1] -  (y-_this.scaleTop[0])*100000000000000/proption/100000000000000).toFixed(5);
}

function _getPointTime(x) {
    let _this = this;
    let xproption, nowmonth, nowday, mini, nowtime, nowhours;
    xproption = (_this.scaleRight[1] - _this.scaleLeft[1]) / (_this.scaleRight[0] - _this.scaleLeft[0]);
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    let _this = this;

    let ctx = _this.chartContext;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;

}


function _draw(resets, func) {
    let _this = this;

    let ctx = _this.chartContext;

    let original = [];
    resets.forEach(function(item) {
        if (ctx[item]) {
            original.push(ctx[item]);
        }
    })

    if (original.length !== resets.length) {
        throw new Error('Draw error');
    }

    func.apply(_this);

    resets.forEach(function(item, index) {
        ctx[item] = original[index];
    })
}

function ToggleCross() {
    let _this = this;

    if (_this.config._crosson) {
        _this._stopListenCross();
    } else {
        _this._listenCross();
    }
}
function _setCanvasSize(){
    var _this = this;
    let w =  _this.config.width ||  document.getElementById('canvans-wapper').offsetWidth;
    let h = _this.config.height || document.getElementById('canvans-wapper').offsetHeight;

    _this.width = w;
    _this.height = h;
    _this.chartDom.width = w;
    _this.chartDom.height = h;
    _this.iChartDom.width = w;
    _this.iChartDom.height = h;

}
function _resizeCanvas(){
    var _this = this;
    window.addEventListener("resize",function(){

        /* 如果窗口拉伸计算canvas尺寸 */
        _this._setCanvasSize();
        _this._initDrawingScale();
    });
}
function _roundRect(x,y,w,h,r,ctx){
    var min_size = Math.min(w,h);
    if(r > min_size/2){
        r = min_size/2;
    }
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
}
function UpdateNowChart(data){
    let _this = this ,
        ctx = _this.nowChartContext,
        ctxHeight = _this.nowChartDom.height,
        ctxWidth = _this.nowChartDom.width,
        nowChartPrice = _this.nowChartPrice,
        verticalScale ;
    //处理即时图数据，如果超过40条则删除最早，加入最晚
    if(nowChartPrice.length == 40){
        nowChartPrice.shift();
        nowChartPrice.push(data);
    }
    else{
        nowChartPrice.push(data);
    }
    //计算纵坐标区间
    verticalScale = _this._resetNowChartScale();
    //清空即时图
    ctx.clearRect(0,0,ctxWidth,ctxHeight);
    //画作标
    _this._drawNowChartCoordinates(verticalScale.max,verticalScale.min);
    //画图
    _this._drawNowChart(verticalScale.max,verticalScale.min)
}
function _drawNowChartCoordinates(max,min){
    let _this = this ,
        ctx = _this.nowChartContext,
        ctxHeight = _this.nowChartDom.height,
        ctxWidth = _this.nowChartDom.width,
        rate;
    rate = 150/(max-min)
    ctx.save();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgb(226,226,226)'; // 线颜色
    ctx.fillStyle = 'rgb(150,150,150)';
    ctx.font = '10px Arial';
    //画坐标
    ctx.beginPath();
    for(var i=1;i<6;i++){
        var priceText
        priceText = parseFloat(max-(i*32-5)/rate)
        ctx.moveTo(0,i*32);
        ctx.lineTo(ctxWidth,i*32)
        if(_this.config.currency.match('JPY')== null){
            ctx.fillText(priceText.toFixed(5),ctxWidth-48,i*32-5)
        }
        else{
            ctx.fillText(priceText.toFixed(3),ctxWidth-48,i*32-5)
        }

    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}
function _resetNowChartScale(){
    let _this = this ,
        max = -1,
        min = 100000000,
        nowChartPrice = _this.nowChartPrice;
    for(let i= 0; i<nowChartPrice.length;i++){
        if(nowChartPrice[i][1]<min){
            min = nowChartPrice[i][1]
        }
        if(nowChartPrice[i][2]>max){
            max = nowChartPrice[i][2]
        }
    }
    return {
        'max':max,
        'min':min
    }
}
function _drawNowChart(max,min){

    let _this = this ,
        ctx = _this.nowChartContext,
        ctxHeight = _this.nowChartDom.height,
        nowChartPrice = _this.nowChartPrice,
        ctxWidth = _this.nowChartDom.width,
        rate = 140/(max-min),

        bidY,askY;
    //bid线条
    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = '#3d63ae';
    ctx.fillStyle = '#3d63ae';
    ctx.font = '10px Arial';
    for(let i = 0;i<nowChartPrice.length ; i ++){
        bidY = 10 +(max-nowChartPrice[i][1])*rate
        if(i ==0){
            ctx.moveTo(0,bidY)
        }
        ctx.lineTo(2.25*i,bidY)
    }
    ctx.lineTo(ctxWidth,bidY)

    ctx.stroke()
    ctx.closePath();
    if(_this.config.currency.match('JPY')== null){
        _this._roundRect(ctxWidth - 55, bidY-7.5,55,15,3,ctx);
    }
    else{
        _this._roundRect(ctxWidth - 53, bidY-7.5,55,15,3,ctx);
    }
    ctx.fill();
    //ask线条
    ctx.beginPath();
    ctx.strokeStyle = '#d22c39';
    ctx.fillStyle = '#d22c39';
    for(let i = 0;i<nowChartPrice.length ; i ++){
        askY = 10 +(max-nowChartPrice[i][2])*rate
        if(i ==0){
            ctx.moveTo(0,askY)
        }
        ctx.lineTo(2.25*i,askY)
    }
    ctx.lineTo(ctxWidth,askY)
    ctx.stroke();
    ctx.closePath();
    if(_this.config.currency.match('JPY')== null){
        _this._roundRect(ctxWidth - 55, askY-7.5,55,15,3,ctx);
    }
    else{
        _this._roundRect(ctxWidth - 53, askY-7.5,55,15,3,ctx);
    }

    ctx.fill();
    ctx.fillStyle = '#fff';
    //bid和ask 标签价格文字
    if(_this.config.currency.match('JPY')== null){
        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length-1][1]).toFixed(5),ctxWidth - 50,bidY+4.5)
        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length-1][2]).toFixed(5),ctxWidth - 50,askY+4.5)
    }
    else{
        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length-1][1]).toFixed(3),ctxWidth - 48,bidY+4.5)
        ctx.fillText(parseFloat(nowChartPrice[nowChartPrice.length-1][2]).toFixed(3),ctxWidth - 48,askY+4.5)
    }

    ctx.restore()
}
function AddCandleHistoryPirce(data){
    var _this = this ;
    _this.candleHistoryPrice = data.concat(_this.candleHistoryPrice)
}
function AddHistoryPirce(data){
    var _this = this ;
    _this.historyPrice = data.concat(_this.historyPrice)
}
