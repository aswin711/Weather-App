import { combineReducers } from 'redux';
import location from './locationReducer';
import home from './homeReducer';
import city from './cityReducer';

export default combineReducers({
    location,
    home,
    city
});