module.exports = {
  waitFor (testFx, onReady, maxtimeOutMillis, page, file) {
    var start = new Date().getTime(),
      condition = false,
      interval = setInterval(function () {
        // if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
        if (!condition) {
          // If not time-out yet and condition not yet fulfilled
          console.log(condition)
          condition = (testFx()) //< defensive code
        } else {
          if (!condition) {
            // If condition still not fulfilled (timeout but condition is 'false')
            console.log('\'waitFor()\' timeout')
            page.render(file)
          } else {
            // Condition fulfilled (timeout and/or condition is 'true')
            console.log('\'waitFor()\' finished in ' + (new Date().getTime() - start) + 'ms.')
            onReady(condition) //< Do what it's supposed to do once the condition is fulfilled
            clearInterval(interval) //< Stop this interval
          }
          phantom.exit(1)
        }
      }, 1000) //< repeat check every 250ms
  },
  printArgs: function () {
    var i, ilen
    for (i = 0, ilen = arguments.length; i < ilen; ++i) {
      console.log('    arguments[' + i + '] = ' + JSON.stringify(arguments[i]))
    }
    console.log('')
  },
  counter: {
    toGet: 0,
    got: 0
  }
}