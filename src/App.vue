<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <div :key="route.name">  
        <component :is="Component"/>
      </div>
    </Transition>
  </RouterView>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
