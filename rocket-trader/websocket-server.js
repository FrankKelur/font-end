var app = require('http').createServer(function () {})
var io = require('socket.io')(app)
var service = require('./service')
io.on('connection', function (socket) {
  socket.emit('setPingTime', {newrouteTime: 1, browserTime: 1})
  setInterval(function () {
    socket.emit('historyPrice', service.getHistoryData())
    socket.emit('realtimePrice', service.getRealTimeData())
  }, 1000)

  socket.on('readyHistoryPrice', function (data) {
    console.log('readyHistoryPrice', data)
  })
  socket.on('readyRealtimePrice', function (data) {
    console.log('readyRealtimePrice', data)
  })
})

app.listen(36001)
console.log('Websocket server listening at 36001')