import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('user_type_setting', app)
const Component = new Constructor().$mount()
var userTypeSet = window.renderData.components.user_type_setting
document.getElementById(`${userTypeSet.user_type_setting_auth.position}`).appendChild(Component.$el)
