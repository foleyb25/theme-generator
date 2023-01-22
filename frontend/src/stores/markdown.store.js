import { defineStore } from 'pinia'
import axios from 'axios'
import {marked} from 'marked'
import DOMPurify from 'dompurify'

//

export const useMarkdownStore = new defineStore('markdownStore', {
    state: () => {
        return { 
            mardown: null, 
            markdownError: null,
            isMarkdownLoading: null,

            npmMarkdwon: null,
            npmMarkdownError: null,
            isnpmMarkdownLoading: null,
        }
    },
    actions: {
        async setMarkdown() {
            if(this.markdown) {
                return
            } else {
                this.isMarkdownLoading = true
                await axios.get('https://raw.githubusercontent.com/foleyb25/theme-generator/Main/README.md').then( (response) => {
                    this.npmMarkdown = response.data
                    this.isnpmMarkdownLoading = false
                }).catch( (err) => {
                    this.npmaMarkdownError = "Something went wrong retrieving theme from the server, using default theme: "+err
                    this.isnpmMarkdownLoading = false
                })
            }
        },

        async setNPMMarkdown() {
            if(this.npmMarkdown) {
                return
            } else {
                this.isnpmMarkdownLoading = true
                await axios.get('https://raw.githubusercontent.com/foleyb25/theme-generator-npm/main/README.md').then( (response) => {
                    this.markdown = response.data
                    this.isMarkdownLoading = false
                }).catch( (err) => {
                    this.markdownError = "Something went wrong retrieving theme from the server, using default theme: "+err
                    this.isMarkdownLoading = false
                })
            }
        },
        // Define actions that can update the state here
    },
    mutations: {
        // Define mutations that can update the state here
    },
    getters: {
        getMarkdown() {
            if(this.markdown) return DOMPurify.sanitize(marked.parse(this.markdown))
        },

        getNPMMarkdown() {
            if(this.markdown) return DOMPurify.sanitize(marked.parse(this.markdown))
        },
    }
})