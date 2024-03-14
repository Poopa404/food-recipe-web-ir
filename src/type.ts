export interface User {
    id: number
    username: string
    folder : Folder[]
    roles: string[]
}

export interface Folder {
    id: number
    name: string
    userAccount: User
    recipeList: string[]
}