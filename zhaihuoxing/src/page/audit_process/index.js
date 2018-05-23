import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('audit_process', app)
const Component = new Constructor().$mount()
var auditProcess = window.renderData.components.audit_process
document.getElementById(`${auditProcess.audit_process_auth.position}`).appendChild(Component.$el)
