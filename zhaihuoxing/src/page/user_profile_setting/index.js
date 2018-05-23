import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('user_profile_setting', app)
const Component = new Constructor().$mount()
var userProfileSet = window.renderData.components.user_profile_setting
document.getElementById(`${userProfileSet.user_profile_setting_auth.position}`).appendChild(Component.$el)
