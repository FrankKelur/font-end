import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('individual_account', app)
const Component = new Constructor().$mount()
var individualAccount = window.renderData.components.individual_account
document.getElementById(`${individualAccount.individual_account_auth.position}`).appendChild(Component.$el)
