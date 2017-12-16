var portfinder = require('portfinder')

portfinder.getPort(function (err, port) {
  if (!err) {
    console.log('err, port', err, port)
  } else {
    console.log('err', err)
  }
})
