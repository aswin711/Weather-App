import { combineReducers } from 'redux';
import location from './locationReducer';
import home from './homeReducer';

export default combineReducers({
    location,
    home
});