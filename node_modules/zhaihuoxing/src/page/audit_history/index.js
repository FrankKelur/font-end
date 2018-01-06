import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('audit_history', app)
const Component = new Constructor().$mount()
var auditHistory = window.renderData.components.audit_history
document.getElementById(`${auditHistory.audit_history_auth.position}`).appendChild(Component.$el)
