import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {createTask, findAllTasks, findOneTaskById, updateTask, deleteOneTask} from '../../stitch';
import {
    GET_TASKS,
    ADD_TASK,
    FINISH_TASK,
    ARCHIVE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    TASK_ERROR,
    CLEAR_TASK_ERROR,
} from '../types';

const TaskState = props => {
    const initialState = {
        tasks: [],
        loading: true,
        current: null,
        byTag: null,
        sortBy: null,
        page: 0,
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getTasks = async () => {
        try {
            const resp = await findAllTasks();
            dispatch({type: GET_TASKS, payload: resp.data.taskss});
        } catch(error) {
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    const deleteTask = async id => {
        try {
            await deleteOneTask(id);
            dispatch({type: DELETE_TASK, payload: id});
        }catch(error){
            console.error('deleteTaskError');
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    const archiveTask = id => dispatch({type: ARCHIVE_TASK, payload: id});
    const editTask = task => dispatch({type: EDIT_TASK, payload: task});

    const addTask = async task => {
        try {
            console.log('addTask');
            const resp = await createTask(task);
            dispatch({type: ADD_TASK, payload: resp.data.insertOneTasks});
            console.log('addTask returned');
        } catch(error) {
            console.error('addTaskError');
            console.error(error);
            dispatch({type: TASK_ERROR, payload: error.message});
        }
    };

    const finishTask = id => dispatch({type: FINISH_TASK, payload: id});

    const clearTaskError = () => dispatch({type: CLEAR_TASK_ERROR});

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
            archiveTask,
            editTask,
            addTask,
            finishTask,
            clearTaskError
        }}>
            {props.children}
        </TaskContext.Provider>
    )
};

export default TaskState;
