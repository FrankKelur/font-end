import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('concise_header', app)
const Component = new Constructor().$mount()
document.getElementById(`${window.renderData.components.concise_header.concise_header_auth.position}`).appendChild(Component.$el)
