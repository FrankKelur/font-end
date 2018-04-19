import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('symbol_group', app)
const Component = new Constructor().$mount()
var symbolGroup = window.renderData.components.symbol_group
document.getElementById(`${symbolGroup.symbol_group_auth.position}`).appendChild(Component.$el)
