<template>
  <img class="bg-img fixed bg-cover w-full h-full z-[-1]" :src="getThemeData.imageUrl">
  <nav class="theme-bg-secondary h-24 sticky w-full">

  </nav>
  <div v-if="error" class="bg-red-200 w-full">{{ error }}</div>
  <main class="flex flex-col justify-center items-center">
    <router-view></router-view>
  </main>
  
   
  <footer class="theme-bg-secondary h-48 w-full">

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
