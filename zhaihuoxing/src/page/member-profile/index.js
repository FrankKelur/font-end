import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('member-profile', app)
const Component = new Constructor().$mount()
document.getElementById('content').appendChild(Component.$el)
