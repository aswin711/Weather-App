import { CITY_ADDED, CITIES_ADDED } from "../actions/types";
import _ from 'lodash';

export default function(state = [],action){
    switch(action.type){
        case CITY_ADDED:
            return _.uniqBy([
                action.payload, ...state
            ],'id');
        case CITIES_ADDED:
            return action.payload;
        default:
            return state;
    }
}