import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('operation_records', app)
const Component = new Constructor().$mount()
var operationRecords = window.renderData.components.operation_records
document.getElementById(`${operationRecords.operation_records_auth.position}`).appendChild(Component.$el)
