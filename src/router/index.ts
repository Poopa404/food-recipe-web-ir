import { createRouter, createWebHistory } from 'vue-router'
import LandingPageVue from '@/views/LandingPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'
import SignupPageVue from '@/views/SignupPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageVue
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPageVue
    }
  ]
})

export default router
