import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('agent_id_setting', app)
const Component = new Constructor().$mount()
var agentIdSetting = window.renderData.components.agent_id_setting
document.getElementById(`${agentIdSetting.agent_id_setting_auth.position}`).appendChild(Component.$el)
