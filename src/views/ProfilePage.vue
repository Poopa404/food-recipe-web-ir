<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import type { Folder } from '@/type'
import { ref, type Ref } from 'vue'
import FolderService from '@/services/FolderService'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const user = ref(authStore.user)

const folderList: Ref<Array<Folder>> = ref([])
if (user.value != null) {
  FolderService.getFoldersByUID(user.value.id).then((response) => {
    folderList.value = response.data
  })
}

function newFolder() {
  if (user.value != null) {
    FolderService.saveFolder({
      id: 0,
      name: 'new folder',
      recipeList: [],
      userAccount: {
        id: user.value.id,
        username: '',
        folder: [],
        roles: []
      }
    }).then(() => {
      router.go(0)
    })
  }
}
</script>

<template>
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
          <p>Saved Recipes</p>
          <button
            @click="newFolder"
            class="px-4 py-2 ml-4 text-lg font-semibold rounded-lg p bg-pr-dark-blue text-pr-white hover:bg-pr-light-blue"
          >
            New folder!
          </button>
        </div>
        <div class="grid w-full grid-cols-6 mt-8 gap-x-16 gap-y-8">
          <a
            href="#"
            class="group transition hover:scale-[1.05]"
            v-for="folder in folderList"
            :key="folder.id"
          >
            <img
              v-if="folder.recipeList.length == 0"
              src="../assets/folderEmpty.png"
              class=""
              alt=""
              srcset=""
            />
            <img v-else src="../assets/folder.png" class="" alt="" srcset="" />
            <p class="font-semibold">{{ folder.name }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
