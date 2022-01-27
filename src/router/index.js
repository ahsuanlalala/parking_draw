import Vue from 'vue'
import VueRouter from 'vue-router'
import third from '../views/third.vue'
import home from '../views/home.vue'
import second from '../views/second.vue'
import first from '../views/first.vue'
import error from '../views/error.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/third',
    name: 'third',
    component: third,
    meta: {
      title: '抽籤系統'
    }
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '抽籤系統'
    }
  },
  {
    path: '/second',
    name: 'second',
    component: second,
    meta: {
      title: '抽籤系統'
    }
  },
  {
    path: '/first',
    name: 'first',
    component: first,
    meta: {
      title: '抽籤系統'
    }
  },
  {
    path: '*',
    name: 'error',
    component: error,
    meta: {
      title: '抽籤系統'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router
