import { createRouter, createWebHistory } from 'vue-router'
import LandingPageVue from '@/views/LandingPage.vue'
import LoginPageVue from '@/views/LoginPage.vue'
import SignupPageVue from '@/views/SignupPage.vue'
import SearchPageVue from '@/views/SearchPage.vue'
import RecsViewVue from '@/views/recs/RecsView.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import { useRecipeStore } from '@/stores/recipe'
import IRService from '@/services/IRService'
import FolderPage from '@/views/FolderPage.vue'
import FolderService from '@/services/FolderService'

const folderList = [
  {
    id: 0,
    linkName: 'recsHealthy',
    label: 'Healthy',
    url: 'healthy'
  },
  {
    id: 1,
    linkName: 'recsLunch',
    label: 'Lunch',
    url: 'lunch'
  },
  {
    id: 2,
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
      path: '/search/:query_term',
      name: 'search',
      component: SearchPageVue,
      props: true,
      beforeEnter: async (to) => {
        const query_term: string = to.params.query_term as string
        const recipeStore = useRecipeStore()
        await IRService.search(query_term)
          .then((response) => {
            recipeStore.setCurrentResponse(response.data)
            console.log(recipeStore.res)
          })
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/profile/:folder',
      name: 'folder',
      component: FolderPage,
      props: true,
      beforeEnter: async (to) => {
        const folder: number = parseInt(to.params.folder as string)
        const recipeStore = useRecipeStore()
        await FolderService.getFoldersById(folder).then(async (responseFolder) => {
          recipeStore.setCurrentFolder(responseFolder.data)
          console.log(responseFolder.data)
          if (responseFolder.data != null && responseFolder.data.recipeList != null && responseFolder.data.recipeList.length != 0) {
            const idList: number[] = []
            responseFolder.data.recipeList.forEach(element => {
              console.log(element.recipeId)
              console.log(parseInt(element.recipeId))
              idList.push(parseInt(element.recipeId))
            });
            console.log(idList)
            console.log(responseFolder.data.recipeList)
            await IRService.get_recipes(idList).then((response) => {
              console.log(response.data.list)
              recipeStore.setCurrentItemInFolder(response.data.list)
            })
          }

        })

      }
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
