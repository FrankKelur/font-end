import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('withdrawal', app)
const Component = new Constructor().$mount()
var withdrawal = window.renderData.components.withdrawal
document.getElementById(`${withdrawal.withdrawal_auth.position}`).appendChild(Component.$el)
