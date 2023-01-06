import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }, {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      }
    ]

  }
]
const router = new VueRouter({
  routes
})

export default router
