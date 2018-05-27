import Vue from 'vue'
import './theme-color'
import {
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.directive('ellipsis-title', {
  bind (el, binding, vnode) {
    el.classList.add('ellipsis-title')
    // z todo 换成在binding的时候，添加title，或者在添加完title之后，去除 onmouseenter事件
    el.onmouseenter = function () {
      // console.log('onmouseenter', el)
      // console.log('el.innerHTML', el.innerHTML)
      // console.log('binding', binding)
      // console.log('vnode', vnode)
      if (el.clientWidth < el.scrollWidth) {
        el.title = el.innerHTML
      } else {
        el.title = ''
      }
    }
  }
})

var defaultHandler = {
  dragover (event) {
    event.preventDefault()
  },
  dragenter (event) {
    var el = event.target
    var targetIdx = parseInt(el.getAttribute('idx'))
    var idx = parseInt(event.dataTransfer.getData('sourceIdx'))
    var origin = event.dataTransfer.getData('origin')
    if (el.getAttribute('dropable') && (origin !== 'middle' || targetIdx !== idx)) { // 自身不允许拖放到自身
      el.className += ' dragenter theme-border-D'
    }
  },
  dragleave (event) {
    var el = event.target
    try { el.className = el.className.replace(/dragenter/g, '').replace(/theme\\-border\\-D/g, '') } catch (ex) {}
  }
  // ,
  // getDropableEle (target) {
  //   while (!target.getAttribute('dropable')) {
  //     target = target.parentNode
  //   }
  //   console.log('target', target)
  //   return target
  // }
}

Vue.directive('draggable', {
  bind (el, binding, vnode) {
    el.className += ' draggable-item'
    var handler = Object.assign(defaultHandler, binding.value)
    el.setAttribute('draggable', true)
    el.addEventListener('dragstart', handler.dragstart)
  }
})

Vue.directive('dropable', {
  bind (el, binding, vnode) {
    var handler = Object.assign(defaultHandler, binding.value)
    el.setAttribute('dropable', true)
    el.addEventListener('dragenter', handler.dragenter)
    el.addEventListener('dragleave', handler.dragleave)
    el.addEventListener('dragover', handler.dragover)
    el.addEventListener('drop', handler.drop)
  }
})
