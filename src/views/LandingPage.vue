<script setup lang="ts">
import recipeModalVue from '@/components/RecipeModal.vue'
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth';

import { useRouter } from 'vue-router'
const router = useRouter()

const folderList = ref([
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
  }
])

const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetRow = ref({})
const contextMenuActions = ref([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' }
])
const showContextMenu = (event: any, user: any) => {
  event.preventDefault()
  showMenu.value = true
  targetRow.value = user
  menuX.value = event.clientX
  menuY.value = event.clientY
}

const closeContextMenu = () => {
  showMenu.value = false
}

function handleActionClick(action: any) {
  console.log(action)
  console.log(targetRow.value)
}


const target = ref(null)
onClickOutside(target, event => {
  closeContextMenu()
})

const authStore = useAuthStore()

function loginAndThenSave(event: any, user: any) {
  if(authStore.isLoggedIn){
    showContextMenu(event,user)
  } else {
    router.push({ name: 'login' })
  }
}

const isModalShown = ref(false)

function showModal(){
  if(isModalShown.value){
    isModalShown.value = false
  } else {
    isModalShown.value = true
  }
}

function closeModal(){
  isModalShown.value = false
}

</script>

<template>
  
  <navBarVue />
  <recipeModalVue :class="isModalShown? 'flex':'hidden'" @close-modal="closeModal"/>
  <ContextMenu
    ref="target"
    v-if="showMenu"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
    :x="menuX"
    :y="menuY"
  />
  <section>
    <div class="flex flex-col max-w-screen-xl p-6 mx-auto">
      <div class="flex w-full flex-rol">
        <RouterLink
          :to="{ name: 'recsRecs' }"
          class="px-3 py-1 mr-6 font-medium transition border-2 rounded-lg text-md hover:text-pr-white border-pr-light-pink text-pr-light-pink hover:bg-pr-light-pink"
          exact-active-class="bg-pr-light-pink"
        >
          <p>Your Recommendation</p>
        </RouterLink>
        <RouterLink
          :to="{ name: 'recsGeneral' }"
          class="px-3 py-1 mr-6 font-medium transition border-2 rounded-lg text-md hover:text-pr-white border-pr-dark-blue text-pr-dark-blue hover:bg-pr-dark-blue"
          exact-active-class="bg-pr-dark-blue"
        >
          <p>General</p>
        </RouterLink>
        <RouterLink
          v-for="folder in folderList"
          :key="folder.id"
          :folder="folder"
          :to="{ name: folder.linkName }"
          class="px-3 py-1 mr-6 font-medium transition border-2 rounded-lg text-md hover:text-pr-white border-pr-light-orange text-pr-light-orange hover:bg-pr-light-orange"
          exact-active-class="bg-pr-light-orange"
        >
          <p>{{ folder.label }}</p>
        </RouterLink>
      </div>
      <div class="grid w-full grid-cols-4 mt-8 mb-8 gap-x-4 gap-y-16 ">
        <button
          @click="showModal"
          class="group transition hover:scale-[1.05] relative"
          v-for="num in number"
          :key="num"
        >
          <button
            @click.prevent.stop="loginAndThenSave($event,num)"
            class="absolute z-10 hidden px-2 py-2 rounded-lg hover:bg-pr-dark-pink right-2 top-2 group-hover:block bg-pr-light-pink text-pr-white"
          >
            <!-- <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16 fill-pr-light-pink"
            >
              <path
                d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
              />
            </svg> -->
            Save!
          </button>
          <img src="../assets/loginImage.jpg" alt="" srcset="" class="rounded-lg" />
          <p
            class="mt-4 text-3xl font-bold text-left text-gray-900 group-hover:underline underline-offset-4 decoration-pr-light-orange"
          >
            Some food
          </p>

          <div class="flex items-center mt-2">
            <svg
              class="w-4 h-4 text-pr-light-orange me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-pr-light-orange me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-pr-light-orange me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-pr-light-orange me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <svg
              class="w-4 h-4 text-gray-400 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <p class="font-medium text-gray-500">(32)</p>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
[aria-current]:not([aria-current='false']) {
  color: #f9f9f9;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay:hover {
  cursor: pointer;
}
</style>../components/RecipePage.vue
