import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/StartAndRanking.vue'),
    },
    {
      path: '/push2answer',
      name: 'push2answer',
      component: () => import('../views/PushToAnswer.vue'),
      props: route => ({ ...route.query }),
    },
  ]
})

export default router
