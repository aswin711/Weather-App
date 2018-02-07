import { cities } from '../utils/cities';
import _ from 'lodash';
import { FETCH_LOCATION } from './types';


export const searchLocation = (text) => dispatch => {
    try {
        let sorted = [];
        _.map(cities, city => {
            if(_.includes(city.name,text)){
                sorted.push(city);
            }
        });
    
        dispatch({ type: FETCH_LOCATION, payload: sorted });
    } catch (e){
        console.log(e);
    }
    
}