<script setup lang="ts">
import navBarVue from '@/components/NavBar.vue'
import { ref } from 'vue';

const folderList = ref([
    {
        id:0,
        linkName: 'recsHealthy',
        label: 'Healthy',
        url: 'healthy'
    },
    {
        id:1,
        linkName: 'recsLunch',
        label: 'Lunch',
        url: 'lunch'
    },
    {
        id:2,
        linkName: 'recsDessert',
        label: 'Dessert',
        url: 'dessert'
    },
])

</script>

<template>
  <navBarVue />
  <section>
    <div class="flex flex-col max-w-screen-xl p-6 mx-auto">
      <div class="flex w-full flex-rol">
        <RouterLink
          :to="{ name: 'recsRecs' }"
          class="px-3 py-1 mr-6 text-lg font-medium transition border-4 rounded-lg hover:text-pr-white border-pr-light-pink text-pr-light-pink hover:bg-pr-light-pink"
          exact-active-class="bg-pr-light-pink"
        >
          <p>Your Recommendation</p>
        </RouterLink>
        <RouterLink
          :to="{ name: 'recsGeneral' }"
          class="px-3 py-1 mr-6 text-lg font-medium transition border-4 rounded-lg hover:text-pr-white border-pr-dark-blue text-pr-dark-blue hover:bg-pr-dark-blue"
          exact-active-class="bg-pr-dark-blue"
        >
          <p>General</p>
        </RouterLink>
        <RouterLink v-for="folder in folderList" :key="folder.id" :folder="folder"
          :to="{ name: folder.linkName }"
          class="px-3 py-1 mr-6 text-lg font-medium transition border-4 rounded-lg hover:text-pr-white border-pr-light-orange text-pr-light-orange hover:bg-pr-light-orange"
          exact-active-class="bg-pr-light-orange"
        >
          <p>{{ folder.label }}</p>
        </RouterLink>
      </div>
      <div class="w-full bg-blue-500">test</div>
    </div>
    <br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br />
  </section>
</template>

<style scoped>
[aria-current]:not([aria-current="false"]) {
    color: #F9F9F9;
}
</style>