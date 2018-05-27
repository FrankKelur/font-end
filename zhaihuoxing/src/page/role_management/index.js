import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('role_management', app)
const Component = new Constructor().$mount()
var roleManagement = window.renderData.components.role_management
document.getElementById(`${roleManagement.role_management_auth.position}`).appendChild(Component.$el)
