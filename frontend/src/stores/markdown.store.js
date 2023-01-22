import { defineStore } from 'pinia'
import axios from 'axios'
import {marked} from 'marked'
import DOMPurify from 'dompurify'

export const useMarkdownStore = new defineStore('markdownStore', {
    state: () => {
        return { 
            mardown: null, 
            markdownError: null,
            isMarkdownLoading: null
        }
    },
    actions: {
        async setMarkdown() {
            if(this.markdown) {
                return
            } else {
                this.isLoading = true
                await axios.get('https://raw.githubusercontent.com/foleyb25/theme-generator/Main/README.md').then( (response) => {
                    this.markdown = response.data
                    console.log(this.markdown)
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
    }
})