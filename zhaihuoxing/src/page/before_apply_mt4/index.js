import app from './index.vue'
import Vue from 'vue'

const Constructor = Vue.extend(app)
// componnets name
Vue.component('before_apply_mt4', app)
const Component = new Constructor().$mount()
// componnets position
document.getElementById(`${window.renderData.components.before_apply_mt4.before_apply_mt4_auth.position}`).appendChild(Component.$el)
