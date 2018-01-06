import app from './index.vue'
import Vue from 'vue'

const Constructor = Vue.extend(app)
// componnets name
Vue.component('greeting', app)
const Component = new Constructor().$mount()
// componnets position
document.getElementById(`${window.renderData.components.greeting.greeting_auth.position}`).appendChild(Component.$el)
