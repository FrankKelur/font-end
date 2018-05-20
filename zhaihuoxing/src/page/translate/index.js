import app from './index.vue'
import Vue from 'vue'
import 'common/js/init'

const Constructor = Vue.extend(app)
Vue.component('translate', app)
const Component = new Constructor().$mount()
var translate = window.renderData.components.translate
document.getElementById(`${translate.translate_auth.position}`).appendChild(Component.$el)
