import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('user_management', app)
const Component = new Constructor().$mount()
var userManagement = window.renderData.components.user_management
document.getElementById(`${userManagement.user_management_auth.position}`).appendChild(Component.$el)
