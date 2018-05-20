import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('exchange_rate_setting', app)
const Component = new Constructor().$mount()
var exchangeRateSetting = window.renderData.components.exchange_rate_setting
document.getElementById(`${exchangeRateSetting.exchange_rate_setting_auth.position}`).appendChild(Component.$el)
