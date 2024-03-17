export interface User {
    id: number
    username: string
    folder: Folder[]
    roles: string[]
}

export interface Folder {
    id: number
    name: string
    userAccount: User
    recipeList: string[]
}

export interface Recipe {
    RecipeId: number,
    Name: string,
    Images: string[],
    AuthorName: string,
    DatePublished: string,
    AggregatedRating: number,
    ReviewCount: number,
    PrepTime: string,
    CookTime: string,
    TotalTime: string,
    RecipeServings: number,
    Calories: number,
    FatContent: number,
    SaturatedFatContent: number,
    CholesterolContent: number,
    SodiumContent: number,
    CarbohydrateContent: number,
    FiberContent: number,
    SugarContent: number,
    ProteinContent: number,
    Description: string,
    RecipeYield: number,
    RecipeIngredientParts: string[],
    RecipeIngredientQuantities: string[]
    RecipeInstructions: string[]
}

export interface ResponseObjectIr {
    results: Recipe[],
    total_hit: number,
    suggest: {
        Name: {
            length: number,
            offset: number,
            options: {
                freq: number,
                score: number,
                text: string
            }[],
            text: string
        }[]
    }
}