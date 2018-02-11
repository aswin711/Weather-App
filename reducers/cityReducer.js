import { CITY_ADDED, CITIES_ADDED } from "../actions/types";
import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

export default function(state = [],action){
    switch(action.type){
        /*case REHYDRATE:
            return action.payload.city || [];*/
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