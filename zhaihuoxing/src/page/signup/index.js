import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
// componnets name
Vue.component('signup', app)
const Component = new Constructor().$mount()
// componnets position
document.getElementById(`${window.renderData.components.signup.signup_auth.position}`).appendChild(Component.$el)
