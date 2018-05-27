import app from './index.vue'
import Vue from 'vue'

const Constructor = Vue.extend(app)
Vue.component('nav_left_menu', app)
const Component = new Constructor().$mount()
document.getElementById(`${window.renderData.components.nav_left_menu.nav_left_menu_auth.position}`).appendChild(Component.$el)
