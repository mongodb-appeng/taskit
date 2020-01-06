import React, {useReducer} from 'react';
import StitchContext from './stitchContext';
import TaskReducer from './stitchReducer';
import {
    GET_TASKS,
    ADD_TASK,
    FINISH_TASK,
    ARCHIVE_TASK,
    DELETE_TASK,
    EDIT_TASK
} from '../types';

const dummyTasks = [
    {
        _id: 1,
        name: 'clean bedroom',
        description: 'some description here',
        createdAt: new Date(),
        tags: [],
        dueBy: null,
        modifiedAt: null,
        archived: false,
        archivedAt: null,
        finished: false,
        finishedAt: null,
        recurringTask: false,
        recurringDate: null,
        history: []
    },
    {
        _id: 2,
        name: 'clean kitchen',
        description: 'some description here',
        createdAt: new Date(),
        tags: [],
        dueBy: null,
        modifiedAt: null,
        archived: false,
        archivedAt: null,
        finished: false,
        finishedAt: null,
        recurringTask: false,
        recurringDate: null,
        history: []
    },
    {
        _id: 3,
        name: 'clean bathroom',
        description: 'some description here',
        createdAt: new Date(),
        tags: [],
        dueBy: null,
        modifiedAt: null,
        archived: false,
        archivedAt: null,
        finished: false,
        finishedAt: null,
        recurringTask: false,
        recurringDate: null,
        history: []
    }
];

const StitchState = props => {
    const initialState = {
        tasks: dummyTasks,
        loading: true,
        current: null,
        byTag: null,
        sortBy: null,
        page: 0,
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    /*
     * getTasks
     * TODO: update to use stitch
     */
    const getTasks = () => {
        dispatch({type: GET_TASKS});
    };

    return (
        <StitchContext.Provider value={{
            tasks: state.tasks,
            loading: state.loading,
            current: state.current,
            byTag: state.byTag,
            sortBy: state.sortBy,
            page: state.page,
            error: state.error,
            getTasks
        }}>
            {props.children}
        </StitchContext.Provider>
    )
};

export default StitchState;
