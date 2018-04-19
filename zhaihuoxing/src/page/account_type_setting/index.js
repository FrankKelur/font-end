import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('account_type_setting', app)
const Component = new Constructor().$mount()
var accountTypeSetting = window.renderData.components.account_type_setting
document.getElementById(`${accountTypeSetting.account_type_setting_auth.position}`).appendChild(Component.$el)
