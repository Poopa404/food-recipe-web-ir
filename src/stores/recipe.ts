import type {Recipe, ResponseObjectIr} from '@/type'
import { defineStore } from 'pinia'
export const useRecipeStore = defineStore('recipe', {
    state: () => ({
        currentRecipe: null as Recipe | null,
        res: null as ResponseObjectIr | null
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
    }
})