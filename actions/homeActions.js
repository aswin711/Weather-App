import axios from 'axios';
import qs from 'qs';
import {
    FETCH_CITY,
    FETCH_FORECAST
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

export const getWeatherByCityId = ( cityId ) => async (dispatch) => {
    try{
        const url = buildWeatherUrl(cityId);
        let { data } = await axios.get(url);

        //console.log(data);
        dispatch({ type: FETCH_CITY, payload: data });
    } catch(e) {
        console.log(e);
    }
};

export const getForecastByCityId = ( cityId ) => async (dispatch) => {
    try{
        const url = buildForecastUrl(cityId);
        let { data } = await axios.get(url);

        console.log(data);
        dispatch({ type: FETCH_FORECAST, payload: data });
    } catch(e) {
        console.log(e);
    }
}