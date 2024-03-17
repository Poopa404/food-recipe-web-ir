<script setup lang="ts">
import recipeModalVue from '@/components/RecipeModal.vue'
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useRecipeStore } from '@/stores/recipe'
import IRService from '@/services/IRService'
import type { Recipe } from '@/type'
const router = useRouter()

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
onClickOutside(target, (event) => {
  closeContextMenu()
})

const authStore = useAuthStore()

function loginAndThenSave(event: any, user: any) {
  if (authStore.isLoggedIn) {
    showContextMenu(event, user)
  } else {
    router.push({ name: 'login' })
  }
}

const isModalShown = ref(false)

function showModal(id: number) {
  if (isModalShown.value) {
    isModalShown.value = false
  } else {
    isModalShown.value = true
    var findRec = searched_recipe.value.filter((rec) => rec.RecipeId == id)
    if (findRec.length != 0) {
      recipeStore.currentRecipe = findRec[0]
    }
  }
}

function closeModal() {
  isModalShown.value = false
}

const recipeStore = useRecipeStore()
const query_term = ref('')
const searched_recipe = ref<Array<Recipe>>([])
const suggested_term = ref('')
const needSuggestion = ref(false)

function setTerm() {
  needSuggestion.value = false
  if (recipeStore.res != null && recipeStore.res.suggest != null) {
    console.log(recipeStore.res.suggest.Name)
    var text = ''
    recipeStore.res.suggest.Name.forEach((element) => {
      if (element.options != null && element.options.length != 0) {
        console.log(element.options[0].text)
        text = text + ' ' + element.options[0].text
        needSuggestion.value = true
      } else {
        text = text + ' ' + element.text
      }
    })
    suggested_term.value = text.trim()
    console.log('suggested_term: ' + suggested_term.value)
    if (recipeStore.res.results != null) {
      searched_recipe.value = recipeStore.res.results
    }
  }
}
setTerm()

onBeforeRouteUpdate(() => {
  setTerm()
})

async function search(query: string) {
  // console.log(query_term.value)
  const recipeStore = useRecipeStore()
  await IRService.search(query).then((response) => {
    console.log('search')
    recipeStore.setCurrentResponse(response.data)
    key_value.value++
    router.push({ name: 'search', params: { query_term: query } })
  })
}

function correctTerm(corrected: string) {
  query_term.value = corrected
  search(query_term.value)
}

const key_value = ref(0)
</script>

<template>
  <div :key="key_value">
    <navBarVue v-model="query_term" />
    <recipeModalVue :class="isModalShown ? 'flex' : 'hidden'" @close-modal="closeModal" />
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
        <div class="flex flex-col w-full p-8 bg-gray-300 rounded-lg">
          <div class="relative hidden w-1/2 md:block">
            <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <form
              @submit.prevent="search(query_term)"
              class="block w-full text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-lg"
            >
              <input
                v-model="query_term"
                required
                type="text"
                id="search-navbar"
                class="w-10/12 p-2 bg-gray-100 rounded-l-lg ps-10"
                placeholder="What are you looking for?"
              />
              <button
                type="submit"
                class="w-2/12 p-2 font-semibold transition bg-gray-200 rounded-r-lg hover:bg-gray-300"
              >
                Search
              </button>
            </form>
          </div>
          <p v-if="needSuggestion" class="mt-4 font-medium">
            Did you mean <button class="italic font-bold text-pr-dark-blue hover:underline underline-offset-4" @click.prevent="correctTerm(suggested_term)">{{ suggested_term }}</button
            >?
          </p>
        </div>
        <div class="grid w-full grid-cols-4 mt-8 mb-8 gap-x-4 gap-y-16">
          <button
            @click="showModal(rec.RecipeId)"
            class="group transition hover:scale-[1.05] relative h-[18rem] flex flex-col justify-between"
            v-for="rec in searched_recipe"
            :key="rec.RecipeId"
          >
            <div class="h-[95%] w-full">
              <button
                @click.prevent.stop="loginAndThenSave($event, rec.RecipeId)"
                class="absolute z-10 hidden px-2 py-2 rounded-lg hover:bg-pr-dark-pink right-2 top-2 group-hover:block bg-pr-light-pink text-pr-white"
              >
                Save!
              </button>
              <img
                v-if="rec.Images.length != 0"
                :src="rec.Images[0]"
                class="object-cover object-center w-full rounded-lg h-3/5"
              />
              <div v-else class="flex flex-col justify-center w-full h-3/5">
                <img src="../assets/noImage.png" class="w-32 h-32 mx-auto" />
              </div>
              <p
                class="w-full text-2xl font-bold text-left text-gray-900 line-clamp-3 h-2/5 group-hover:underline underline-offset-4 decoration-pr-light-orange"
              >
                {{ rec.Name }}
              </p>
            </div>
            <div class="flex items-center mt-2 h-[5%]">
              <svg
                v-for="i in Math.floor(rec.AggregatedRating)"
                :key="i"
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
                v-for="i in 5 - Math.floor(rec.AggregatedRating)"
                :key="i"
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
              <p class="font-medium text-gray-500">({{ rec.ReviewCount }})</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
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
</style>
../components/RecipePage.vue
