import {SET_ALERT, REMOVE_ALERT} from '../types';

/*
 * alert reducer which will process alert state changes
 */
export default (state, action) => {
    switch(action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};