import {
    FETCH_CITY
} from '../actions/types';

export default function(state =[], action){
    switch(action.type) {
        case FETCH_CITY:
            return action.payload;
        default:
            return state;
    }
}