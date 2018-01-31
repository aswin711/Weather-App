import {
    FETCH_CITY, FETCH_FORECAST
} from '../actions/types';

initialState = {
    weather: {},
    forecast: {}
}

export default function(state = initialState , action){
    switch(action.type) {
        case FETCH_CITY:
            return { ...state, weather: action.payload };
        case FETCH_FORECAST:
            return { ...state, forecast: action.payload };
        default:
            return state;
    }
}