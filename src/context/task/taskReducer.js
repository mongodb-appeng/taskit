import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    EDIT_TASK,
    SET_CURRENT_TASK,
    CLEAR_CURRENT_TASK,
    TASK_ERROR,
    CLEAR_TASK_ERROR,
} from '../types';

/*
 * reducer for changes to the state of the tasks
 */
export default (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload._id),
                laoding: false
            };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
                current: null,
                loading: false
            };
        case SET_CURRENT_TASK:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_TASK:
            return {
                ...state,
                current: null,
                loading: false
            };
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case CLEAR_TASK_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};