**WebTrader是个为了外汇和二元期权交易所制造的图表交易系统产品**。

-------
### 1、WebTrader架构

![WebTrader架构](http://git.system.mogu61.com/BI/rocket-trader/raw/zll/wiki_pic/logo_noti.png)

webtrader前端由三个主要的模块构成：
- Engine部分负责结合业务和图表之间的关系，使得只要控制数据的变化即可操作图表，Engine最终还负责创建实例作为插件的形式注入页面；
- Chart部分是控制外汇和二元期权的主图、即时图、物件、指数等；
- Web Chanel负责推送数据与银行系统进行下单沟通等。

### 2、WebTrader技术栈&依赖

- Dom部分，依赖Vue方便视图双向绑定，和事件操作
- 图表部分，使用原生JS和canvas进行绘制
- 构建打包部分使用gulp的wepack-stream进行构建

### 3、项目目录结构


```
    |---- dist                              (最终构建出js目录)
           |---- rocket-trader.js           (最终构建出js)
    |---- example                           (示例目录)
           |---- web-trader.html            (示例网页)
    |---- src                               (构建前源码目录)
           |---- chart.js                   (图表部分代码，核心代码)
           |---- dom.js                     (面板doom部分代码)
           |---- engine.js                  (中间件配置模块)
           |---- helper.js                  (工具类：生成独一无二的id)
           |---- spacestate.socket.js       (web chanel 前端部分代码)
           |---- tools.js                   (面板doom部分vue实例代码)
    |---- .gitignore
    |---- README.md
    |---- gulpfile.js                       (gulp配置文件)
    |---- package.json                      (npm配置文件)
```
### 4、使用方法以及API

1. 在页面创建一个容器DIV用于放置Web trader实例

```
    <div class="chart-box">
```

2. 在页面js中创建实例

```
    window.onload= function(){
        var chartExample = new Engine({
                element: 'chart-box',              //页面容器
                candlePeriod: 'm1',                //初次渲染价格数据源间隔
                currency: 'EURUSD',                //初次渲染货币种类
                chartType: 'candle',               //初次渲染主图形状
                width: 600,                        //设置宽度
                height: 300,                       //设置高度
                chartBackground: '#fff',           //北京颜色
                candleRiseColor:'#d22c39',         //上升蜡烛颜色  
                candleFallColor:'#3d63ae',         //下跌蜡烛颜色
                croseLableColor:'#000',            //十字坐标标签价格
                croseLableOpacity:'0.8',           //十字坐标标签透明度
                croseLineColor:'#000',             //十字坐标颜色
                croseLineOpactiy:'0.4',            //十字坐标线透明度
                currentPriceLabelColor:'#000',     //现在价格标签颜色
                currentPriceLabelOpacity:'1',      //现在价格标签透明度
                currentPriceLineColor:'#000'       //现在价格水平线颜色
        })
    }

```
[rap接口链接](http://rap.system.mogu61.com/workspace/myWorkspace.do?projectId=22#76)

| 配置选项                     | 默认参数     | 是否必填 | 类型 |
| --------                    | --------     | -------- |-------- |
| element                     |              | true     | string     |
| candlePeriod                | m1           | false     | string     |
| currency                    | EURUSD       | false     | string     |
| chartType                   | candle       | false     | string     |
| width                       | auto         | false     | number 或者string   |
| height                      | auto         | false     | number 或者string   |
| chartBackground             | #ffffff      | false     | string     |
| candleRiseColor             | #d22c39      | false     | string     |
| candleFallColor             | #3d63ae      | false     | string     |
| croseLableColor             | #000         | false     | string     |
| croseLableOpacity           | 0.8          | false     | string     |
| croseLineColor              | #000         | false     | string     |
| croseLineOpactiy            | 0.4          | false     | string   |
| currentPriceLabelColor      | #000         | false     | string   |
| currentPriceLabelOpacity    | 1            | false     | string     |
| currentPriceLineColor       | #000         | false     | string     |


更多配置选项会根据需求不断加入

3.图表实例的操作方法
创建实例后可用实例的方法去操作图表，可以创建按钮去监听用来操作图表

```
切换主图类型
//example：
//页面按钮绑定事件
var button = document.getElementById('buttom');
buttom.addEventListen('click',function(){
    chartExample.ChangeChartType('candle') //此实例为刚才new所创建，控制图标类型改为蜡烛图
})
```

[rap接口链接](http://rap.system.mogu61.com/workspace/myWorkspace.do?projectId=22#76)


| 实例方法  | 方法作用  | 传入参数  |
| -------- | -------- | -------- |
| ChangeChartType     | 更改图类型     | thick、candle      |
| GenHorizentalScale     | 重新计算横坐标     |         |
| AddCandleHistoryPrice     | 增加蜡烛图历史纪录     | 价格数组     |
| StartDraw     | 开始画图     |      |
| StopDraw     | 停止画图     |      |
| SwitchTimeInterval     | 切换m1、m5等       |    m1、m5、m15、m30  |
| ListenCrossToggle     | 十字部件的开启     |      |
| StopListenCross     | 十字部件的关闭     |      |
| ListenMoveChart     | 拖动功能开启     |      |
| StopLiatenMoveChart     | 拖动功能关闭     |      |
| SetHistoryPrice     | 设置线图历史数据     |  价格数组    |
| SetCandleHistory     | 设置蜡烛图历史数据     |     价格数组 |
| zoom     | 控制间隔数量     |     true（放大）、false（缩小） |
