var io = require('socket.io-client')

function SatelliteBase (arg) {
  var _this = this
  let server = arg.server    //连接的服务器
  _this.socket = io.connect(server)
  _this.connectCount = 0         //重新计数初始化
  _this.reConnectNum = arg.reConnectNum
  connectHandle(_this.socket)
}

function connectHandle (socket) {
  socket.on('disconnect', function () {
    console.log(' disconnect')
  })
  socket.on('error', function () {
    console.log(' error', +new Date())
  })
  socket.on('reconnect', function () {
    //console.log(server + ' reconnect' ,+ new Date());
  })

  socket.on('reconnect_error', function () {
    //console.log(server + ' reconnect_error' ,+ new Date());
  })
  socket.on('reconnect_failed', function () {
    //console.log(server + ' reconnect_failed' ,+ new Date());
  })
  socket.on('reconnecting', function () {
    //console.log(server + ' reconnecting' ,+ new Date());
  })
  socket.on('connect_timeout', function () {
    console.log(' connect_timeout')
  })
}

let socketBase = SatelliteBase.prototype

socketBase.openConnect = function (callback) {
  let _this = this
  _this.socket.on('connect', function () {
    _this.connectCount = 0
    callback()
  })
}

socketBase.closeConnect = function () {
  let _this = this
  _this.socket.close()

}
socketBase.connectError = function (callback) {
  let _this = this
  _this.socket.on('connect_error', function () {
    //连接失败多少次后关闭连接
    _this.connectCount++
    if (_this.connectCount === _this.reConnectNum) {
      _this.socket.disconnect()
      callback && callback()
    }

  })

}

socketBase.send = function (event, obj) {
  let _this = this
  console.log(event, obj)
  _this.socket.emit(event, obj)
}
socketBase.receive = function (event, callback) {
  let _this = this
  _this.socket.on(event, function (data) {
    callback(data)
  })
}

// //还需要修改成不同模块心跳方法不一样 
// socketBase.reConnect = function(server) {
//     console.log(server + ' reconnect1');
// }

module.exports = SatelliteBase