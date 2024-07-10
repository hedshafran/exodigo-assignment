import { ApiTypes, Cocktail } from "./types";

export function transformDrink(data: ApiTypes.Cocktail): Cocktail {
    const ingredients = [
        data.strIngredient1,
        data.strIngredient2,
        data.strIngredient3,
        data.strIngredient4,
        data.strIngredient5,
        data.strIngredient6,
        data.strIngredient7,
        data.strIngredient8,
        data.strIngredient9,
        data.strIngredient10,
        data.strIngredient11,
        data.strIngredient12,
        data.strIngredient13,
        data.strIngredient14,
        data.strIngredient15,
    ].filter(Boolean);

    const measures = [
        data.strMeasure1,
        data.strMeasure2,
        data.strMeasure3,
        data.strMeasure4,
        data.strMeasure5,
        data.strMeasure6,
        data.strMeasure7,
        data.strMeasure8,
        data.strMeasure9,
        data.strMeasure10,
        data.strMeasure11,
        data.strMeasure12,
        data.strMeasure13,
        data.strMeasure14,
        data.strMeasure15,
    ].filter(Boolean);

    return {
        id: data.idDrink,
        name: data.strDrink,
        thumb: data.strDrinkThumb,
        glass: data.strGlass,
        instructions: data.strInstructions,
        ingredients: ingredients.map((ingredient, i) => ({
            ingredient,
            measure: measures[i],
        })),
    };
}

export function transformDrinks({ drinks }: ApiTypes.SearchCocktailsResponse): Cocktail[] {
    return drinks ? drinks.map(transformDrink) : [];
}