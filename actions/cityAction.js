import { CITY_ADDED } from "./types";

export const addCity = (city) => {
    return { type: CITY_ADDED, action: city
    }
}