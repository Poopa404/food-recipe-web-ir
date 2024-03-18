<script setup lang="ts">
import recipeModalVue from '@/components/RecipeModal.vue'
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRecipeStore } from '@/stores/recipe'
import FolderService from '@/services/FolderService'
import IRService from '@/services/IRService'

const router = useRouter()
const authStore = useAuthStore()
const user = storeToRefs(authStore).user

const recipeStore = useRecipeStore()
const currentFolder = storeToRefs(recipeStore).currentFolder
const currentItemFolder = storeToRefs(recipeStore).currentItemInFolder
console.log(currentItemFolder.value)

function stars(id: number) {
  return currentFolder.value.recipeList.find((x) => x.recipeId === id + '')?.stars
}
</script>

<template>
  <div>
    <navBarVue />
    <section>
      <div class="flex flex-col max-w-screen-xl p-6 mx-auto">
        <div class="mb-12">
          <div class="flex justify-center my-8">
            <div class="text-center">
              <div
                class="flex items-center justify-center w-32 h-32 mx-auto text-6xl font-bold rounded-full bg-pr-light-pink text-pr-white"
              >
                <span>{{ user?.username.charAt(0) }}{{ user?.username.charAt(1) }}</span>
              </div>
              <p class="mt-4 text-4xl font-semibold">{{ user?.username }}</p>
            </div>
          </div>
          <div class="flex flex-row pb-4 text-3xl font-bold border-b-2 border-pr-light-blue">
            <p>{{ currentFolder?.name }}</p>
            <RouterLink
              :to="{ name: 'profile' }"
              class="px-4 py-2 ml-4 text-lg font-semibold rounded-lg p bg-pr-dark-blue text-pr-white hover:bg-pr-light-blue"
            >
              Back
            </RouterLink>
          </div>
          <div class="grid w-full grid-cols-6 my-8 gap-x-16 gap-y-8">
            <a
              href="#"
              class="group transition hover:scale-[1.05] flex flex-col justify-between h-[250px]"
              v-for="item in currentItemFolder"
              :key="item.RecipeId"
            >
              <div>
                <img
                  v-if="item.Images.length != 0"
                  :src="item.Images[0]"
                  class="object-cover object-center w-full rounded-lg h-3/5"
                />
                <div v-else class="flex flex-col justify-center w-full h-3/5">
                  <img src="../assets/noImage.png" class="w-32 h-32 mx-auto" />
                </div>
                <p class="mt-4 font-semibold">{{ item.Name }}</p>
              </div>
              <div>
                <p class="font-semibold">Your rating:</p>
                <div class="flex flex-row">
                  <svg
                    v-for="i in stars(item.RecipeId)"
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
                    v-for="i in 5 - stars(item.RecipeId)"
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
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
