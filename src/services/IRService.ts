import type { Recipe, ResponseObjectIr } from "@/type";
import type {AxiosResponse} from "axios";
import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_IR_URL,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    search(query: string): Promise<AxiosResponse<ResponseObjectIr>> {
        return apiClient.get<ResponseObjectIr>('/search_recipes?query='+query)
    },
    get_recipes(query: number[]): Promise<AxiosResponse<Recipe[]>> {
        return apiClient.post('/get_recipes', query)
    }
}   