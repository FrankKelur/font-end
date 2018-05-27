import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(ElementUI)
// Vue.component('b-icon', {
//   render (h) {
//     return (<span><img style="width:50px;height:50px;" src="./assets/logo.png" alt="this is my icon"/></span>)
//   }
// })

// Vue.component('jsx-example', {
//   render (h) {
//     return (<div id='foo'>
//       <b-icon></b-icon>
//       <span>bar</span>
//     </div>)
//   }
// })

new Vue({
  el: '#app',
  render: h => h(App)
})
