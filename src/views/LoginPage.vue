<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

function login(){
  authStore
    .login(username.value, password.value)
    .then(() => {
      router.push({ name: 'landing' })
    })
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
          Log in to your account
        </h1>

        <form class="pl-2 mt-6"  @submit.prevent="login">
          <div>
            <label class="block text-gray-900">Username</label>
            <input
              v-model="username"
              type="username"
              name=""
              id=""
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
              id=""
              placeholder="Enter Password"
              class="w-full px-4 py-3 mt-2 bg-gray-100 border border-gray-200 rounded-lg focus:border-pr-dark-blue focus:bg-pr-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            class="block w-full px-4 py-3 mt-6 font-semibold rounded-lg bg-pr-light-pink text-pr-white hover:bg-pr-dark-pink focus:bg-pr-dark-pink"
          >
            Log In
          </button>
        </form>
        <p class="flex justify-center pl-2 mt-6">
          Don't have an account?
          <RouterLink
            class="ml-2 text-gray-900 underline underline-offset-2 hover:text-pr-light-pink"
            :to="{ name: 'signup' }"
          >
            Sign up!
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
