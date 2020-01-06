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
                ...state
            };
        case ADD_TASK:
            return {
                ...state
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
                ...state
            };
        case EDIT_TASK:
            return {
                ...state
            };
        default:
            return state;
    }
};