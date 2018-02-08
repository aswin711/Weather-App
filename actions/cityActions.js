import { CITY_ADDED, CITIES_ADDED } from "./types";

export const addCity = (city) => {
    return { type: CITY_ADDED, payload: city };
}

export const addCities = (cities) => {
    return { type: CITIES_ADDED, payload: cities };
}