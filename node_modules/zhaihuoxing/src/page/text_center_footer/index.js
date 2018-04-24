import app from './index.vue'
import Vue from 'vue'

const Constructor = Vue.extend(app)
Vue.component('text_center_footer', app)
const Component = new Constructor().$mount()
document.getElementById(`${window.renderData.components.text_center_footer.text_center_footer_auth.position}`).appendChild(Component.$el)
