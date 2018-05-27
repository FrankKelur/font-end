import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('account_setting', app)
const Component = new Constructor().$mount()
var accountSetting = window.renderData.components.account_setting
document.getElementById(`${accountSetting.account_setting_auth.position}`).appendChild(Component.$el)
