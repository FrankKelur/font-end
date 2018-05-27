import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('trade_history', app)
const Component = new Constructor().$mount()
var tradeHistory = window.renderData.components.trade_history
document.getElementById(`${tradeHistory.trade_history_auth.position}`).appendChild(Component.$el)
