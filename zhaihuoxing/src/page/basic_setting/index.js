import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('basic_setting', app)
const Component = new Constructor().$mount()
var basicSetting = window.renderData.components.basic_setting
document.getElementById(`${basicSetting.basic_setting_auth.position}`).appendChild(Component.$el)
