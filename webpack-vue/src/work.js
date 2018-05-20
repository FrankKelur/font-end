onmessage = function (e) {
  console.log('worker on message', e)
  postMessage('Result' + e.data)
}
