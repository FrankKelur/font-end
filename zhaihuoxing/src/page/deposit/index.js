import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('deposit', app)
const Component = new Constructor().$mount()
var deposit = window.renderData.components.deposit
document.getElementById(`${deposit.deposit_auth.position}`).appendChild(Component.$el)
