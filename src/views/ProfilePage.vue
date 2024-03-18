<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import type { Folder } from '@/type'
import { ref, type Ref } from 'vue'
import FolderService from '@/services/FolderService'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import ContextMenu from '@/components/ContextMenu.vue'

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
    let folderName = prompt('Please enter the folder name', 'new folder')
    if (folderName == null || folderName.length == 0) {
      folderName = 'new folder'
    }
    FolderService.saveFolder({
      id: 0,
      name: folderName,
      recipeList: [],
      userAccount: {
        id: user.value.id,
        username: '',
        folder: [],
        roles: []
      },
      baseFolder: false
    }).then(() => {
      router.go(0)
    })
  }
}

const showMenu = ref(false)
const menuX = ref(0)
const menuY = ref(0)
const targetRow = ref(0)
const contextMenuActions = ref([
  { label: 'Rename', action: 'rename' },
  { label: 'Delete', action: 'delete' }
])
const showContextMenu = (event: any, user: number) => {
  event.preventDefault()
  showMenu.value = true
  targetRow.value = user
  menuX.value = event.pageX
  menuY.value = event.pageY
}

const closeContextMenu = () => {
  showMenu.value = false
}

async function handleActionClick(action: any) {
  if (action == 'rename') {
    console.log('rename ' + targetRow.value)
    FolderService.getFoldersById(targetRow.value).then((response) => {
      const folderToRename = response.data
      let folderName = prompt('Please enter a new folder name', folderToRename.name)
      if (folderName == null || folderName.length == 0) {
        FolderService.saveFolder({
          id: folderToRename.id,
          name: folderToRename.name,
          recipeList: folderToRename.recipeList,
          userAccount: folderToRename.userAccount,
          baseFolder: folderToRename.baseFolder
        }).then(() => {
          router.go(0)
        })
      } else if (folderName != null && folderName.length != 0) {
        FolderService.saveFolder({
          id: folderToRename.id,
          name: folderName,
          recipeList: folderToRename.recipeList,
          userAccount: folderToRename.userAccount,
          baseFolder: folderToRename.baseFolder
        }).then(() => {
          router.go(0)
        })
      }
    })
  } else {
    console.log('delete ' + targetRow.value)
    FolderService.deleteFolder(targetRow.value).then(() => {
      router.go(0)
    })
  }
}

const target = ref(null)
onClickOutside(target, (event) => {
  closeContextMenu()
})
</script>

<template>
  <div>
    <navBarVue />
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
            <RouterLink
              :to="{ name: 'folder', params: { folder: folder.id } }"
              class="group transition hover:scale-[1.05]"
              v-for="folder in folderList"
              :key="folder.id"
              :id="folder.id.toString()"
            >
              <button
                @click.prevent.stop="showContextMenu($event, folder.id)"
                v-if="!folder.baseFolder"
                class="absolute top-0 right-0 z-10 hidden p-1 transition rounded-lg group-hover:block hover:bg-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              </button>
              <img
                v-if="folder.recipeList.length == 0"
                src="../assets/folderEmpty.png"
                class=""
                alt=""
                srcset=""
              />
              <img v-else src="../assets/folder.png" class="" alt="" srcset="" />
              <p class="font-semibold">{{ folder.name }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
