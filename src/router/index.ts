import { createRouter, createWebHistory } from 'vue-router'
import LandingPageVue from '@/views/LandingPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'
import SignupPageVue from '@/views/SignupPage.vue'
import SearchPageVue from '@/views/SearchPage.vue'
import RecsViewVue from '@/views/recs/RecsView.vue'
import RecipePage from '@/views/RecipePage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

const folderList = [
  {
      id:0,
      linkName: 'recsHealthy',
      label: 'Healthy',
      url: 'healthy'
  },
  {
      id:1,
      linkName: 'recsLunch',
      label: 'Lunch',
      url: 'lunch'
  },
  {
      id:2,
      linkName: 'recsDessert',
      label: 'Dessert',
      url: 'dessert'
  },
]

const childrenTag = [
  {
    path: '',
    name: 'recsRecs',
    component: RecsViewVue
  },
  {
    path: 'recs',
    name: 'recsGeneral',
    component: RecsViewVue
  }
]

for (let i = 0; i < folderList.length; i++) {
  const element = folderList[i];
  childrenTag.push({
    path: element.url,
    name: element.linkName,
    component: RecsViewVue
  })
  
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageVue,
      children: childrenTag,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPageVue,
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipePage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageVue,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPageVue,
    }
  ]
})

export default router
