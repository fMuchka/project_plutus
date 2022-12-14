import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/Portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue')
    },
  ]
})

export default router
