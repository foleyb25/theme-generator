<template>
    <div class="w-[80%] mt-8 mb-8 theme-bg-primary flex flex-col justify-center items-center shadow-2xl rounded-xl border border-black">
      <button v-if="!isLoading" class="mt-9 theme-bg-four hover:bg-white text-black border border-black font-bold py-2 px-4 rounded" @click="generateTheme">Generate New Theme</button>
      <div v-if="isLoading">Loading...</div>
      <div v-if="getThemeData" class="flex flex-col justify-center items-center">
        <div id="art-container" class="mt-8 w-full h-48 flex flex-row justify-center">
            <div id="relative=container" class="relative h-full w-full md:w-3/4 overflow-hidden">
                <div class="text-[0.75rem] md:text-[1rem] top-8 left-8 absolute"></div>
                <img class="absolute h-[90%] aspect[1/1] bottom-2 right-2 z-[4] border border-black rounded-2xl" :src="getThemeData.imageUrl" alt="">
                <div id="dongle-two" class="absolute bottom-[10%] theme-bg-two right-0 w-[90%] m-4 h-1/2 border border-black rounded-xl">
                    <div id="dongle-one" class="absolute top-[10%] theme-bg-one right-0 w-[90%] h-3/4  border border-black rounded-xl">
                        <div id="dongle-three" class="absolute top-[10%] theme-bg-three right-0 w-[90%] h-3/4 border border-black rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="prompt-container" class="p-4 ">
          <h3 class="font-bold text-[1.25rem]">{{ getThemeData.prompt }}</h3>
        </div>
        <hr class="my-8 border-black w-4/5">
        <div class="ml-4 font-bold text-[1.5rem] w-full flex flex-col items-start justify-start">
            <h2>Color Scheme</h2>
        </div>
        <div id="color-scheme-container" class="w-full p-8 grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <div class="theme-bg-primary aspect-[1/1]"><div>Primary</div><div>{{ getThemeData.colors.primary }}</div></div>
            <div class="theme-bg-secondary aspect-[1/1]"><div>Secondary</div><div>{{ getThemeData.colors.secondary }}</div></div>
            <div class="theme-bg-tertiary aspect-[1/1]"><div>Tertiary</div><div>{{ getThemeData.colors.tertiary }}</div></div>
            <div class="theme-bg-one aspect-[1/1]"><div>01</div><div>{{ getThemeData.colors.one }}</div></div>
            <div class="theme-bg-two aspect-[1/1]"><div>02</div><div>{{ getThemeData.colors.two }}</div></div>
            <div class="theme-bg-three aspect-[1/1]"><div>03</div><div>{{ getThemeData.colors.three }}</div></div>
            <div class="theme-bg-four aspect-[1/1]"><div>04</div><div>{{ getThemeData.colors.four }}</div></div>
            <div class="theme-bg-five aspect-[1/1]"><div>05</div><div>{{ getThemeData.colors.five }}</div></div>
        </div>
      </div>
    </div>
</template>

<script setup>
import {useThemeStore} from '../stores/theme.store'
import { storeToRefs } from "pinia";

const themeStore = useThemeStore()

const {getThemeData, isLoading} = storeToRefs(themeStore)

const {generateTheme} = themeStore

</script>

<style>
#color-scheme-container > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid black 2px;
    border-radius: 8px
}

</style>