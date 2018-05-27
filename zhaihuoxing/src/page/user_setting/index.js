import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('user_setting', app)
const Component = new Constructor().$mount()
var userSet = window.renderData.components.user_setting
document.getElementById(`${userSet.user_setting_auth.position}`).appendChild(Component.$el)
