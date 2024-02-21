<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>


<template>
  <header>
    <div class="wrapper">
      <nav class="bg-pr-white shadow-[0_3px_12px_0_rgba(0,0,0,0.2)] fixed top-0 w-full">
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl p-6 mx-auto">
          <RouterLink :to="{ name:'landing' }" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../assets/logo1.svg" class="h-12" alt="EZ Meals Logo" />
          </RouterLink>
          <div class="flex w-2/5 md:order-1">
            <div class="relative hidden w-full md:block">
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
                class="block w-full text-sm text-gray-900 bg-gray-100 border border-gray-200 rounded-lg"
              >
                <input
                  type="text"
                  id="search-navbar"
                  class="w-10/12 p-2 rounded-l-lg ps-10 bg-pr-white"
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
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-2"
            id="navbar-search"
          >
            <ul
              class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-pr-white"
            >
              <li>
                <RouterLink
                :to="{ name:'login'}"
                  class="block px-3 py-1 transition bg-transparent border-4 rounded-lg text-pr-light-pink border-pr-light-pink hover:bg-pr-light-pink hover:text-pr-white"
                  >Log in</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  :to="{ name:'signup'}"
                  class="block px-3 py-1 transition border-4 rounded-lg bg-pr-light-blue text-pr-white border-pr-light-blue hover:bg-pr-dark-blue hover:border-pr-dark-blue"
                  >Sign up</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <br/><br/><br/><br/>
</template>
