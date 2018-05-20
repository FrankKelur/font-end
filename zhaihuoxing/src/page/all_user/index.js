import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('all_user', app)
const Component = new Constructor().$mount()
var allUser = window.renderData.components.all_user
document.getElementById(`${allUser.all_user_auth.position}`).appendChild(Component.$el)
