import app from './index.vue'
import Vue from 'vue'

const Constructor = Vue.extend(app)
// componnets name
Vue.component('change_pwd', app)
const Component = new Constructor().$mount()
// componnets position
document.getElementById(`${window.renderData.components.change_pwd.change_pwd_auth.position}`).appendChild(Component.$el)
