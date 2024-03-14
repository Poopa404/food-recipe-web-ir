<script setup lang="ts">
import type { User } from '@/type'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
// import { notify } from '@kyvg/vue3-notification'
const authStore = useAuthStore()

const router = useRouter()

// const emit = defineEmits(['forceRerender'])

const username = ref('')
const password = ref('')

function register() {
  console.log('login Button Pressed')
  // console.log(username.value+' '+password.value)
  authStore
    .register(
      username.value,
      password.value
    )
    .then(() => {
      // notify({
      //   title: 'Authorization',
      //   text: 'You have been registered!',
      // })
      console.log('register done')
      // emit('forceRerender')
      router.push({ name: 'landing'})
    })
    // .catch(() => {
    //   messageStore.updateMessage('could not register')
    //   setTimeout(() => {
    //     messageStore.restMessage()
    //   }, 3000)
    // })
}


</script>

<template>
  <!-- component -->
  <section class="flex flex-col items-center h-screen text-gray-900 md:flex-row bg-pr-white">
    <div class="hidden w-full h-screen lg:block md:w-1/2 xl:w-2/3">
      <img src="../assets/loginImage.jpg" alt="" class="object-cover w-full h-full" />
    </div>

    <div
      class="flex items-center justify-center w-full h-screen px-6 bg-pr-white md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12"
    >
      <div class="w-full h-100">
        <RouterLink :to="{ name:'recsRecs' }" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../assets/logo1.svg" class="h-20" alt="EZ Meals Logo" />
        </RouterLink>

        <h1 class="pl-2 mt-12 text-xl font-bold leading-tight md:text-2xl">
          Sign up your account
        </h1>

        <form class="pl-2 mt-6" @submit.prevent="register">
          <div>
            <label class="block text-gray-900">Username</label>
            <input
              v-model="username"
              type="username"
              name=""
              id="username"
              placeholder="Enter Username"
              class="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-200 rounded-lg focus:border-pr-dark-blue focus:bg-pr-white focus:outline-none"
              autofocus
              required
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-900">Password</label>
            <input
              v-model="password"
              type="password"
              name=""
              id="password"
              placeholder="Enter Password"
              class="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-200 rounded-lg focus:border-pr-dark-blue focus:bg-pr-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            class="block w-full px-4 py-3 mt-6 font-semibold rounded-lg bg-pr-dark-blue text-pr-white hover:bg-pr-light-blue focus:bg-pr-light-blue"
          >
            Register
          </button>
        </form>
        <p class="flex justify-center pl-2 mt-6">
          Already have an account?
          <RouterLink
            class="ml-2 text-gray-900 underline underline-offset-2 hover:text-pr-light-pink"
            :to="{ name: 'login' }"
          >
            Log in!
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
