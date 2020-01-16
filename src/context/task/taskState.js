import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {createTask, findAllTasks, updateTask, deleteOneTask} from '../../stitch';
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
 * the task state
 */
const TaskState = props => {
    const initialState = {
        tasks: [],              // list of user tasks (populated by graphql queries)
        loading: true,          // used to enable/disable spinner
        current: null,          // current task the application is using
        error: null             // error messages reported here
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    /*
     * call graphql function to get all tasks
     */
    const getTasks = async () => {
        try {
            const resp = await findAllTasks();
            dispatch({type: GET_TASKS, payload: resp});
        } catch(error) {
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    /*
     * call graphql function to delete a single task
     */
    const deleteTask = async id => {
        try {
            const resp = await deleteOneTask(id);
            dispatch({type: DELETE_TASK, payload: resp});
        }catch(error){
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    /*
     * call graphql function to update a single task
     */
    const editTask = async task => {
        try {
            const resp = await updateTask(task);
            dispatch({type: EDIT_TASK, payload: resp});
        } catch(error){
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }

    };

    /*
     * call graphql function to create a task
     */
    const addTask = async task => {
        try {
            const resp = await createTask(task);
            dispatch({type: ADD_TASK, payload: resp});
        } catch(error) {
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    // clear error msg
    const clearTaskError = () => dispatch({type: CLEAR_TASK_ERROR});

    // set current task to work on
    const setCurrentTask = task => dispatch({type: SET_CURRENT_TASK, payload: task});

    // clear current task (when work is done)
    const clearCurrentTask = () => dispatch({type: CLEAR_CURRENT_TASK});

    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            loading: state.loading,
            current: state.current,
            byTag: state.byTag,
            sortBy: state.sortBy,
            page: state.page,
            error: state.error,
            getTasks,
            deleteTask,
            editTask,
            setCurrentTask,
            clearCurrentTask,
            addTask,
            clearTaskError
        }}>
            {props.children}
        </TaskContext.Provider>
    )
};

export default TaskState;
