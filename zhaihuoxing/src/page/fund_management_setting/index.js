import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('fund_management_setting', app)
const Component = new Constructor().$mount()
var fundManagementSet = window.renderData.components.fund_management_setting
document.getElementById(`${fundManagementSet.fund_management_setting_auth.position}`).appendChild(Component.$el)
