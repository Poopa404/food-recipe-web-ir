<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'

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

const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
])

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
</script>

<template>
  <navBarVue />
  <ContextMenu
    v-if="showMenu"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
    :x="menuX"
    :y="menuY"
  />
  <section>
    <div class="flex flex-col max-w-screen-xl p-6 mx-auto">
      <div class="flex w-full p-8 bg-gray-300 rounded-lg flex-rol ">
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
            action=""
            method="get"
            class="block w-full text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-lg"
          >
            <input
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
      </div>
      <div class="grid w-full grid-cols-4 mt-8 gap-x-4 gap-y-16">
        <RouterLink
          :to="{ name: 'recipe' }"
          class="group transition hover:scale-[1.05] relative"
          v-for="num in number"
          :key="num"
        >
          <button
            @contextmenu.prevent="showContextMenu($event, num)"
            @click.prevent="console.log('test')"
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
            class="mt-4 text-3xl font-bold text-gray-900 group-hover:underline underline-offset-4 decoration-pr-light-orange"
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
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
