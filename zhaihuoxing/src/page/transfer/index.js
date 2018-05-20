import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('transfer', app)
const Component = new Constructor().$mount()
var transfer = window.renderData.components.transfer
document.getElementById(`${transfer.transfer_auth.position}`).appendChild(Component.$el)
