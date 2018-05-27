import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'

if (!window.components) {
  window.components = {}
}
var bubble = {
  show (params) {
    params.message = params.title
    params = Object.assign({
      showClose: true
    }, params)
    Message(params)
  }
}

var popover = {
  show (params) {
    const h = new Vue().$createElement
    MessageBox({
      title: params.headText,
      type: params.type,
      message: h('p', null, params.text),
      confirmButtonText: params.confirm ? params.confirm.label : '',
      cancelButtonText: params.cancel ? params.cancel.label : '',
      showCancelButton: !!params.cancel,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          if (params.confirm && params.confirm.toUrl) {
            location.pathname = params.confirm.toUrl
          } else if (params.cancel && params.cancel.toUrl) {
            location.pathname = params.cancel.toUrl
          }
        }
        done()
      }
    })
  }
}
window.components['bubble'] = bubble
window.components['popup'] = popover
