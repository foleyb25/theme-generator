<template>
  <img class="bg-img fixed bg-cover w-full h-full z-[-1]" :src="getThemeData.imageUrl">
  <nav class="theme-bg-secondary h-24 sticky w-full flex flex-row justify-between">
    <div id="logo" class="flex flex-row justify-center items-center w-1/4 ml-2">
      <img src="/tg-logo.png"  class="max-h-[90%]" alt="">
    </div>
    <div id="links" class="w-1/4 flex flex-row justify-center items-center">
      <router-link to="/" class="theme-bg-four hover:bg-white text-black border-black border font-bold py-2 px-4 rounded">Home</router-link>
    </div>
  </nav>
  <div v-if="error" class="bg-red-200 w-full">{{ error }}</div>
  <main class="flex flex-col justify-center items-center">
    <router-view></router-view>
  </main>
  
   
  <footer class="theme-bg-secondary h-48 w-full flex flex-row justify-between">
    <div id="logo" class="flex flex-row justify-center items-center w-1/4 ml-2">
      <img src="/tb-logo.png"  class="max-h-[90%]" alt="">
    </div>
    <div id="links" class="w-1/4 flex flex-row justify-center items-center">
      <a href="#" class="theme-bg-four hover:bg-white text-black border-black border font-bold py-2 px-4 rounded">Back To Top</a>
    </div>

  </footer>
  
  
</template>

<script setup>
import {useThemeStore} from './stores/theme.store'
import { storeToRefs } from "pinia";

const themeStore = useThemeStore()

const {getThemeData, error} = storeToRefs(themeStore)

const primary = getThemeData.value.colors.primary
const secondary = getThemeData.value.colors.secondary
const tertiary = getThemeData.value.colors.tertiary
const one = getThemeData.value.colors.one
const two = getThemeData.value.colors.two
const three = getThemeData.value.colors.three
const four = getThemeData.value.colors.four
const five = getThemeData.value.colors.five

</script>

<style>
.theme-bg-primary {
  background-color: v-bind(primary);
}

.theme-bg-secondary {
  background-color: v-bind(secondary);
}

.theme-bg-tertiary {
  background-color: v-bind(tertiary);
}

.theme-bg-one {
  background-color: v-bind(one);
}

.theme-bg-two {
  background-color: v-bind(two);
}

.theme-bg-three {
  background-color: v-bind(three);
}

.theme-bg-four {
  background-color: v-bind(four);
}

.theme-bg-five {
  transition-duration: 0.4s;
  background-color: v-bind(five);
}


</style>
