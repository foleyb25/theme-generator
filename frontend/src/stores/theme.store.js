import { defineStore } from 'pinia'
import axios from 'axios'

export const useThemeStore = new defineStore('themeStore', {
    state: () => {
        return { 
            themeData: null, 
            error: null,
            isLoading: null
        }
    },
    actions: {
        async setTheme() {
            if(this.themeData) {
                return
            } else {
                this.isLoading = true
                await axios.get('/api/theme/get').then( (response) => {
                    this.themeData = response.data
                    this.isLoading = false
                }).catch( (err) => {
                    this.error = "Something went wrong retrieving theme from the server, using default theme: "+err
                    this.isLoading = false
                })
            }
        },

        async generateTheme() {
            console.log("Generating new theme")
            this.isLoading = true
            await axios.get('/api/theme/generate').then( (response) => {
                this.isLoading = false
                this.themeData = null
                window.location.reload()
            }).catch( (err) => {
                this.error = "Something went wrong retrieving theme from the server, using default theme: "+err
                this.isLoading = false
            })
        }
        // Define actions that can update the state here
    },
    mutations: {
        // Define mutations that can update the state here
    },
    getters: {
        getThemeData() {
            if(this.themeData) {
                return this.themeData
            } else {
                return {
                    "colors": {
                        "primary":"#FFFFFF",
                        "secondary":"#000000",
                        "tertiary":"#333333",
                        "one":"#F44336",
                        "two":"#9C27B0",
                        "three":"#3F51B5",
                        "four":"#4CAF50",
                        "five":"#FFC107"
                    },
                    "imageUrl":"",
                    "prompt":""
                }
            }
        },
        // Define getters that can retrieve information from the state here
    }
})