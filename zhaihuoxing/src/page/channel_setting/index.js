import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('channel_setting', app)
const Component = new Constructor().$mount()
var channelSetting = window.renderData.components.channel_setting
document.getElementById(`${channelSetting.channel_setting_auth.position}`).appendChild(Component.$el)
