import {
    GET_TASKS,
    ADD_TASK,
    FINISH_TASK,
    ARCHIVE_TASK,
    DELETE_TASK,
    EDIT_TASK
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            };
        case FINISH_TASK:
            return {
                ...state
            };
        case ARCHIVE_TASK:
            return {
                ...state
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            };
        case EDIT_TASK:
            return {
                ...state
            };
        default:
            return state;
    }
};