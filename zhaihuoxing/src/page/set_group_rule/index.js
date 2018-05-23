import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('set_group_rule', app)
const Component = new Constructor().$mount()
var setGroupRule = window.renderData.components.set_group_rule
document.getElementById(`${setGroupRule.set_group_rule_auth.position}`).appendChild(Component.$el)
