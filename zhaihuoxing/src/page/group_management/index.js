import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
// componnets name
Vue.component('group_management', app)
const Component = new Constructor().$mount()
// componnets position
document.getElementById(`${window.renderData.components.group_management.group_management_auth.position}`).appendChild(Component.$el)
