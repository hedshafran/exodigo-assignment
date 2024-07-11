import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from './api';
import { ApiTypes } from './types';
import { transformDrinks } from './pipes';

describe('API tests', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    it('should fetch and transform cocktails data', async () => {
        const mockResponse: ApiTypes.SearchCocktailsResponse = {
            "drinks": [
                {
                    "idDrink": "12704",
                    "strDrink": "Limeade",
                    "strAlcoholic": "Non alcoholic",
                    "strGlass": "Highball glass",
                    "strInstructions": "In a large glass, put the lime juice and sugar, and stir well. Add cold seltzer water to fill. Put the lime peels in the glass. Drink. Repeat until limes or soda run out.",
                    "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/5jdp5r1487603680.jpg",
                    "strIngredient1": "Lime",
                    "strIngredient2": "Sugar",
                    "strIngredient3": "Soda water",
                    "strIngredient4": "Lime peel",
                    "strIngredient5": null,
                    "strIngredient6": null,
                    "strIngredient7": null,
                    "strIngredient8": null,
                    "strIngredient9": null,
                    "strIngredient10": null,
                    "strIngredient11": null,
                    "strIngredient12": null,
                    "strIngredient13": null,
                    "strIngredient14": null,
                    "strIngredient15": null,
                    "strMeasure1": "Juice of 1 ",
                    "strMeasure2": "1 tblsp ",
                    "strMeasure3": " (seltzer water)\n",
                    "strMeasure4": null,
                    "strMeasure5": null,
                    "strMeasure6": null,
                    "strMeasure7": null,
                    "strMeasure8": null,
                    "strMeasure9": null,
                    "strMeasure10": null,
                    "strMeasure11": null,
                    "strMeasure12": null,
                    "strMeasure13": null,
                    "strMeasure14": null,
                    "strMeasure15": null,
                }
            ]
        };

        mock.onGet(`/search.php?s=limeade`).reply(200, mockResponse);

        const result = await api.searchCocktails('limeade');

        console.log(result);

        expect(result).toEqual(transformDrinks(mockResponse));
    });

    it('should return an empty array when no drinks are found', async () => {
        const mockResponse: ApiTypes.SearchCocktailsResponse = { drinks: null };

        mock.onGet(`/search.php?s=NonExistingDrink`).reply(200, mockResponse);

        const result = await api.searchCocktails('NonExistingDrink');

        expect(result).toEqual([]);
    });
});
