var data;
onconnect = function(e) {
  console.log('onconnect')
  var port = e.ports[0];
  port.onmessage = function(e) {
    console.log('onmessage')
    if(e.data=='get'){
      port.postMessage(data);
    }else{
      data=e.data;
    }
  }
}
