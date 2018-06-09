var id = 0
var service = {
  getRealTimeData: function (data) {
    // console.log('getRealTimeData', data)
    // string 请求类型
    // string symbol分类
    // string symbol
    // string 后缀
    // string 当天0点点差
    // string 当天0点bid价格
    // string 当天bid最高价格
    // string 当天bid最低价格
    // string bid 价格
    // string ask 价格
    // string bid 市场深度
    // string ask 市场深度
    // string 时间戳 毫秒时间戳
    return [
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()],
      [1, 'float', 'eur', '.suffix', 1, 1, 20, 10, 15, 15, 10, 10, new Date().getTime()]
    ]
  },
  getHistoryData: function (data) {
    // console.log('getHistoryData', data)
    // string 请求类型
    // string symbol
    // string 后缀
    // string 间隔
    // string 时间
    // string 最高价格
    // string 最低价格
    // string 开始价格
    // string 结束价格
    // string vol 价格报价数
    return {
      uniqueid: id++ === 0 ? 'new' : id,
      symbol: '1',
      period: '1',
      data: [
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15],
        [1, 'eur', '.suffix', 100, new Date().getTime(), 20, 10, 15, 15, 15]
      ]
    }
  }
}
module.exports = service
