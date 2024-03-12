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
  <section>
    <div class="flex flex-col max-w-screen-xl p-6 mx-auto">
      <div class="flex justify-center my-8">
        <div class="text-center">
          <div
            class="flex items-center justify-center w-32 h-32 mx-auto text-6xl font-bold rounded-full bg-pr-light-pink text-pr-white"
          >
            <span>FS</span>
          </div>
          <p class="mt-4 text-4xl font-semibold">Someone Someone</p>
        </div>
      </div>
      <div class="flex flex-row pb-4 text-3xl font-bold border-b-2 border-pr-light-blue">
        <p>Saved Recipes</p>
        <button class="px-4 py-2 ml-4 text-lg font-semibold rounded-lg p bg-pr-dark-blue text-pr-white hover:bg-pr-light-blue">New folder!</button>
      </div>
      <div class="grid w-full grid-cols-6 mt-8 gap-x-16 gap-y-8">
        <a href="#" class="group transition hover:scale-[1.05]" v-for="num in number" :key="num">
          <img src="../assets/folderEmpty.png" class="" alt="" srcset="" />
          <p class="font-semibold">Folder</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
