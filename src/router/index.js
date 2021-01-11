import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    // component: List,
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  },
  {
    path: '/create',
    name: 'create',
    beforeEnter: routeDefend,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    props: true,
    beforeEnter: routeDefend,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

function routeDefend(to, from, next) {
  if(store.getters.getUser.isAuthorized){
    next()
  }else{
    next('/')
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
