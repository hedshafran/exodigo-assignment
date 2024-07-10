import axios from "axios";
import { transformDrinks } from "./pipes";
import { Api, ApiTypes } from "./types";

const pluckData = (response: any) => response.data;

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

const api: Api = {
    searchCocktails: (query: string) => instance.get<ApiTypes.SearchCocktailsResponse>(`/search.php?s=${query}`)
        .then(pluckData)
        .then(transformDrinks),
};

export default api;