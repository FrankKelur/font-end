import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'

Vue.use(Router)

export function CreateRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/ssr',
        name: 'hello world',
        component: HelloWorld
      },
      {
        path: '/test',
        name: 'test',
        component: Test
      }
    ]
  })
}
