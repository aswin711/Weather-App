import {
    FETCH_CITY, FETCH_FORECAST, ADD_PENDING_DATA
} from '../actions/types';

initialState = [ {
            id: 0,
            weather: {},
            forecast: {}
    }
]

export default function(state = initialState , action){
    switch(action.type) {
        case FETCH_CITY:
            let f = 0;
            state.map((city,index) => {
                if(city.id === action.payload.id){
                   
                    state[index] = { id: city.id , weather: action.payload.weather, forecast: city.forecast };
                    f = 1;
                   
                }
            })
            if ( f === 0) { state.push(action.payload); }
            return state;
        case FETCH_FORECAST:
        let g = 0;
        state.map((city,index) => {
            if(city.id === action.payload.id){
                state[index] = { id: city.id , forecast: action.payload.forecast, weather: city.weather };
                g = 1;
            }
        });
        if ( g === 0) { state.push(action.payload); }
        return state;
        case ADD_PENDING_DATA:
            return action.payload;
        default:
            return state;
    }
}