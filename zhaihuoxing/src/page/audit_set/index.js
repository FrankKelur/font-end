import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('audit_set', app)
const Component = new Constructor().$mount()
var auditSet = window.renderData.components.audit_set
document.getElementById(`${auditSet.audit_set_auth.position}`).appendChild(Component.$el)
