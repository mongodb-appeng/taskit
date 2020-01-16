import React, {Fragment, useContext} from "react";
import TaskContext from "../../context/task/taskContext";
import {TagList} from './TagComponents';
import './TaskItem.css';

/*
 * Represents a single task
 */
export const TaskItem = ({task}) => {
    const taskContext = useContext(TaskContext);
    const {deleteTask, setCurrentTask} = taskContext;

    return (
        <Fragment>
            <div className='card border-light mb-2'>
                <div className='card-horizontal'>
                    <div className='card-body'>
                        <p className='card-text'>
                            <TagList tags={task.tags}/>
                        </p>
                        <h4 className='card-title'>{task.name}</h4>
                        <div>
                            <p className='card-text'>{task.description}
                                <span className='task-icon'>
                                    <i
                                        className='material-icons grey-text task-icon-btn'
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                        onClick={()=>deleteTask(task._id)}
                                    >
                                        delete
                                    </i>
                                </span>

                                <span className='task-icon'>
                                    <i
                                        className='material-icons grey-text task-icon-btn'
                                        data-toggle='modal'
                                        data-target='#taskModal'
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                        onClick={()=>setCurrentTask(task)}
                                    >
                                        edit
                                    </i>
                                </span>
                            </p>
                            <div className="d-flex justify-content-between w-100">
                                <p className='card-text'>
                                    <small className='text-muted'>
                                        <strong>created on:{' '}</strong>
                                        {new Date(task.createdAt).toLocaleString()}
                                    </small>
                                </p>
                                <p className='card-text'>
                                    {task.dueBy === null ?
                                        <small className='text-muted'>
                                            <strong>no due by date</strong>
                                        </small> :
                                        <small className='text-muted'>
                                            <strong>due by:{' '}</strong>
                                            {new Date(task.dueBy).toDateString()}
                                        </small>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};