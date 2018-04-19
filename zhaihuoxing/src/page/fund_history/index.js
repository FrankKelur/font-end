import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('fund_history', app)
const Component = new Constructor().$mount()
var fundHistory = window.renderData.components.fund_history
document.getElementById(`${fundHistory.fund_history_auth.position}`).appendChild(Component.$el)
