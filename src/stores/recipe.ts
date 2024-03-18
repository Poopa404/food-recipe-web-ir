import type { Folder, Recipe, ResponseObjectIr } from '@/type'
import { defineStore } from 'pinia'
export const useRecipeStore = defineStore('recipe', {
    state: () => ({
        currentRecipe: null as Recipe | null,
        res: null as ResponseObjectIr | null,
        currentFolder: null as Folder | null,
        currentItemInFolder: null as Recipe[] | null
    }),
    // getters: {
    //     getCurrentResponse: (state) => {
    //         return state.response
    //     },
    //     getCurrentRecipe: (state) => {
    //       return state.currentRecipe
    //   }
    // },
    actions: {
        setCurrentResponse(res: ResponseObjectIr) {
            this.res = res
        },
        setCurrentRecipe(recipe: Recipe) {
            this.currentRecipe = recipe
        },
        setCurrentFolder(folder: Folder) {
            this.currentFolder = folder
        },
        setCurrentItemInFolder(recipe: Recipe[]) {
            this.currentItemInFolder = recipe
        },
    }
})