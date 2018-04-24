import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('audit_start', app)
const Component = new Constructor().$mount()
var auditStart = window.renderData.components.audit_start
document.getElementById(`${auditStart.audit_start_auth.position}`).appendChild(Component.$el)
