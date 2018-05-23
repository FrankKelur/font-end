import Vue from 'vue'
import Router from 'vue-router'
import editor from '@/pages/editor'
import adminLayout from '@/layout/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: adminLayout,
      children: [
        {
          path: 'editor',
          component: editor
        }
      ]
    }
  ]
})
