import _ from 'lodash';
import {
    ADD_PENDING_DATA, FETCH_WEATHER
} from '../actions/types';

export default function(state = [] , action){
    switch(action.type) {
        case FETCH_WEATHER:
            return _.uniqBy([
                action.payload, ...state
            ],'id');
        case ADD_PENDING_DATA:
            return action.payload;
        default:
            return state;
    }
}