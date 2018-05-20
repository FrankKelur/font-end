import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('user_profile', app)
const Component = new Constructor().$mount()
var userProfile = window.renderData.components.user_profile
document.getElementById(`${userProfile.user_profile_auth.position}`).appendChild(Component.$el)
