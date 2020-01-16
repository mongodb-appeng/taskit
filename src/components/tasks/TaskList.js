import React, {Fragment, useContext, useEffect} from "react";
import AlertContext from "../../context/alert/alertContext";
import TaskContext from "../../context/task/taskContext";
import {TaskItem} from "./TaskItem";
import './TaskList.css';

/*
 * represents a list of tasks which are owned by the user
 */
export const TaskList = () => {
    const alertContext = useContext(AlertContext);
    const taskContext = useContext(TaskContext);

    const {setAlert} = alertContext;
    const {loading, tasks, getTasks, error, clearTaskError} = taskContext;

    useEffect(() => {
        getTasks();
        if (error) {
            setAlert('graphql error', 'danger');
            clearTaskError();
        }
        //TODO: need to address possible bug here
        // eslint-disable-next-line
    }, [error]);

    if(tasks && tasks.length === 0 && loading){
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading</span>
                </div>
            </div>
        );
    }

    if(tasks == null || tasks.length === 0){
        return (
            <div className="d-flex justify-content-center mt-5">
                <h3>Lets begin by adding some tasks...</h3>
            </div>
        );
    }

    return (
        <Fragment>
            {tasks !== null && tasks.map(task => <TaskItem key={task._id} task={task}/>)}
        </Fragment>
    );
};
