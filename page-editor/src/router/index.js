import Vue from 'vue'
import Router from 'vue-router'
import list from '@/pages/list'
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
          name: 'editor',
          component: editor
        },
        {
          path: 'list',
          component: list,
          name: 'list'
        }
      ]
    },
    {
      path: '/',
      name: 'default',
      component: adminLayout,
      children: [
        {
          path: '/',
          name: 'list',
          component: editor
        }
      ]
    }
  ]
})
