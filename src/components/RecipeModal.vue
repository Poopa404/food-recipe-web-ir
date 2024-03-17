<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import moment from 'moment';
import { useRoute } from 'vue-router';

const recipeStore = useRecipeStore()
// console.log(moment.duration('PT15M').humanize())

function timeFormat(time: string){
  return moment.duration(time).humanize()
}

function createIngList(quan: string[], parts: string[]){
  var returnArray: {
    q: string;
    p: string;
  }[] = []
  parts.forEach((p,i) => {
    returnArray.push({
      q: quan[i],
      p: p
    })
  })
  return returnArray
}

</script>

<template>
  <div v-if="recipeStore.currentRecipe != null"
    class="fixed z-10 w-full h-full bg-black bg-opacity-50"
    @click.self.stop="$emit('closeModal')"
  >
    <div
      class="w-4/5 h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden border-4 bg-pr-white mx-auto rounded-lg mt-4"
    >
      <section
        class="flex flex-col items-center h-[calc(100vh-96px)] text-gray-900 md:flex-row bg-pr-white"
      >
        <div
          class="flex items-center justify-center w-full h-full px-6 bg-pr-white md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 lg:px-16 xl:px-12"
        >
          <div class="flex items-center justify-center w-full h-full">
            <div class="flex flex-col w-4/5 text-center h-3/4">
              <p class="text-4xl font-bold h-[35%] overflow-hidden line-clamp-3">
                {{ recipeStore.currentRecipe?.Name }}
              </p>
              <div class="h-[20%]">
                <p class="font-semibold">by {{ recipeStore.currentRecipe?.AuthorName }}</p>
                <p class="text-xs font-normal text-gray-500">
                  {{ (new Date(recipeStore.currentRecipe?.DatePublished)).getDate() }}/{{ (new Date(recipeStore.currentRecipe?.DatePublished)).getMonth() }}/{{ (new Date(recipeStore.currentRecipe?.DatePublished)).getFullYear() }}
                </p>
              </div>
              <div class="h-[25%]">
                <button
                  class="flex flex-row h-auto px-2 py-2 mx-auto rounded-lg hover:bg-pr-dark-pink group-hover:block bg-pr-light-pink text-pr-white"
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 mr-2 fill-pr-white"
                  >
                    <path
                      d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    />
                  </svg>
                  <p>Save!</p>
                </button>
              </div>
              <div class="h-[20%]">
                <div class="flex items-center justify-center w-full mb-4">
                  <svg
                    v-for="i in Math.floor(recipeStore.currentRecipe?.AggregatedRating)"
                    :key="i"
                    class="w-8 h-8 text-pr-light-orange me-1"
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
                    v-for="i in 5 - Math.floor(recipeStore.currentRecipe?.AggregatedRating)"
                    :key="i"
                    class="w-8 h-8 text-gray-400 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <p class="ml-2 font-medium text-gray-500 text-md">({{ recipeStore.currentRecipe?.ReviewCount }})</p>
                </div>
                <a href="#reviewSection" class="inline-block hover:underline underline-offset-2">
                  READ REVIEWS
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="block w-full h-full md:w-1/2">
          <img
                v-if="recipeStore.currentRecipe.Images.length != 0"
                :src="recipeStore.currentRecipe.Images[0]"
                class="object-cover object-center w-full rounded-lg h-3/5"
              />
              <div v-else class="flex flex-col justify-center w-full h-3/5">
                <img src="../assets/noImage.png" class="w-32 h-32 mx-auto" />
              </div>
        </div>
      </section>
      <section class="flex flex-col justify-center w-3/5 mx-auto mt-12">
        <div
          class="h-fit p-4 grid grid-cols-4 bg-gray-100 border-2 border-gray-200 rounded border-t-[12px] border-t-pr-light-blue"
        >
          <div class="flex justify-center">
            <div>
              <p class="font-bold">Prep Time:</p>
              <p>{{ timeFormat(recipeStore.currentRecipe?.PrepTime) }}</p>
            </div>
          </div>
          <div class="flex justify-center">
            <div>
              <p class="font-bold">Cook Time:</p>
              <p>{{ timeFormat(recipeStore.currentRecipe?.CookTime) }}</p>
            </div>
          </div>
          <div class="flex justify-center">
            <div>
              <p class="font-bold">Total Time:</p>
              <p>{{ timeFormat(recipeStore.currentRecipe?.TotalTime) }}</p>
            </div>
          </div>
          <div class="flex justify-center">
            <div>
              <p class="font-bold">Servings:</p>
              <p>{{ recipeStore.currentRecipe.RecipeServings }}</p>
            </div>
          </div>
        </div>
        <div class="my-4 font-bold">Nutrition: Per serving</div>
        <div
          class="h-fit p-8 grid grid-cols-4 bg-gray-100 border-2 gap-y-8 border-gray-200 rounded border-t-[12px] border-t-pr-light-orange"
        >
          <div class="flex">
            <div>
              <p class="font-bold">Calories:</p>
              <p>{{ recipeStore.currentRecipe.Calories }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Fat Content:</p>
              <p>{{ recipeStore.currentRecipe.FatContent }}</p>
              <p class="font-normal">(Saturated Fat Content: {{ recipeStore.currentRecipe.SaturatedFatContent }})</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Cholesterol Content:</p>
              <p>{{ recipeStore.currentRecipe.CholesterolContent }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Sodium Content:</p>
              <p>{{ recipeStore.currentRecipe.SodiumContent }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Carbohydrate Content:</p>
              <p>{{ recipeStore.currentRecipe.CarbohydrateContent }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Fiber Content:</p>
              <p>{{ recipeStore.currentRecipe.FiberContent }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Sugar Content</p>
              <p>{{ recipeStore.currentRecipe.SugarContent }}</p>
            </div>
          </div>
          <div class="flex">
            <div>
              <p class="font-bold">Protein Content:</p>
              <p>{{ recipeStore.currentRecipe.ProteinContent }}</p>
            </div>
          </div>
        </div>
        <p class="mt-12">
          {{ recipeStore.currentRecipe.Description }}
        </p>
        <div class="mt-12">
          <p class="pb-4 text-3xl font-bold border-b-2 border-pr-light-pink">Ingredients</p>
          <ul class="p-6 leading-loose list-disc">
            <li class="text-pr-light-pink" v-for="parts in createIngList(recipeStore.currentRecipe.RecipeIngredientQuantities, recipeStore.currentRecipe.RecipeIngredientParts)" :key="parts.p">
              <p class="text-black">{{ parts.q }} {{ parts.p }}</p>
            </li>
          </ul>
        </div>
        <div class="mt-12">
          <p class="pb-4 text-3xl font-bold border-b-2 border-pr-light-pink">Instructions</p>
          <ul class="p-6 leading-loose list-disc text-pr-light-pink">
            <li class="mb-4" v-for="(step, i) in recipeStore.currentRecipe.RecipeInstructions" :key="i">
              <p class="font-bold text-black">Step {{ i+1 }}</p>
              <p class="text-black">{{ step }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="flex flex-col justify-center my-12" id="reviewSection">
          <p class="pb-4 text-3xl font-bold border-b-2 border-pr-light-pink">Reviews</p>
          <ul>
            <li class="pb-4 my-8 border-b-2 border-gray-300">
              <div class="flex flex-row items-center mb-4">
                <div class="w-12 h-12 mr-4 rounded-full bg-pr-light-pink"></div>
                <p class="text-lg font-bold">user1</p>
              </div>
              <div class="flex items-center w-full mb-4">
                <svg
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <p class="ml-2 text-gray-900 text-md">01/01/2000</p>
              </div>
              <p>lorem ipsum lorem ipsum lorem ipsum</p>
            </li>
            <li class="pb-4 my-8 border-b-2 border-gray-300">
              <div class="flex flex-row items-center mb-4">
                <div class="w-12 h-12 mr-4 rounded-full bg-pr-light-pink"></div>
                <p class="text-lg font-bold">user1</p>
              </div>
              <div class="flex items-center w-full mb-4">
                <svg
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <p class="ml-2 text-gray-900 text-md">01/01/2000</p>
              </div>
              <p>lorem ipsum lorem ipsum lorem ipsum</p>
            </li>
            <li class="pb-4 my-8 border-b-2 border-gray-300">
              <div class="flex flex-row items-center mb-4">
                <div class="w-12 h-12 mr-4 rounded-full bg-pr-light-pink"></div>
                <p class="text-lg font-bold">user1</p>
              </div>
              <div class="flex items-center w-full mb-4">
                <svg
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
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
                  class="w-6 h-6 text-pr-light-orange me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <p class="ml-2 text-gray-900 text-md">01/01/2000</p>
              </div>
              <p>lorem ipsum lorem ipsum lorem ipsum</p>
            </li>
          </ul>
          <button
            class="p-4 mx-auto font-semibold border-4 rounded-md border-pr-dark-blue text-pr-dark-blue hover:bg-pr-dark-blue hover:text-pr-white"
          >
            LOAD MORE REVIEWS
          </button>
        </div> -->
      </section>
    </div>
  </div>
</template>
