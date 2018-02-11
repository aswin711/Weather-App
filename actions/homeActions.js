import axios from 'axios';
import qs from 'qs';
import {
    ADD_PENDING_DATA,
    FETCH_WEATHER
} from './types';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER_DETAILS = 'weather?';
const FORECAST_DETAILS = 'forecast?';

const PARAMS = {
    appid: '1ca618887318ad44ac9babc0df2b2b76',
    units: 'metric'
};

const buildWeatherUrl = (id) => {
    const query = qs.stringify({ ...PARAMS, id});
    return `${BASE_URL}${WEATHER_DETAILS}${query}`;

}

const buildForecastUrl = (id) => {
    const query = qs.stringify({ ...PARAMS, id});
    return `${BASE_URL}${FORECAST_DETAILS}${query}`;
}

export const fetchData = (id) => async (dispatch) => {
    try {
        const weatherUrl = buildWeatherUrl(id);
        const forecastUrl = buildForecastUrl(id);

        let weather = await axios.get(weatherUrl);
        let forecast = await axios.get(forecastUrl);

        dispatch({ type: FETCH_WEATHER, payload: { id: id, weather: weather.data, forecast: forecast.data }});
    }catch(e){
        console.log(e);
    }
}

export const addPendingData = (data) => {
    return { type: ADD_PENDING_DATA, payload: data };
}