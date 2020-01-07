import React, {Fragment, useContext, useEffect, useState} from 'react';
import TaskContext from '../../context/task/taskContext';
import AlertContext from '../../context/alert/alertContext';
import './index.css';

/*
 *
 */
export const TaskList = () => {
    const taskContext = useContext(TaskContext);
    const {tasks, getTasks} = taskContext;

    useEffect(() => {
        getTasks();
        //eslint-disable-next-line
    }, []);

    if(tasks === undefined){
        return <h4>loading....</h4>
    }
    return (
        <Fragment>
            {tasks && tasks.map(task => <TaskItem key={task._id} task={task}/>)}
        </Fragment>
    );
};

/*
 * TODO: create icon menu items?
 */
const TaskItem = ({task}) => {
    const taskContext = useContext(TaskContext);
    const {deleteTask} = taskContext;

    const testF = () => {
        console.log('deleteTask called');
        deleteTask(task._id);

    }
    return (
        <Fragment>
            <div className="card border-light mb-2">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                        <img src="http://via.placeholder.com/110X110" alt=""/>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{task.name}</h5>
                        <div>
                            <p className="card-text">{task.description}
                                <span className='task-icon'>
                                    <i
                                        className="material-icons grey-text task-icon-btn"
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                    >
                                        delete
                                    </i>
                                </span>
                                <span className='task-icon'>
                                    <i
                                        className="material-icons grey-text task-icon-btn"
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                    >
                                        archive
                                    </i>
                                </span>
                                <span className='task-icon'>
                                    <i
                                        className="material-icons grey-text task-icon-btn"
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                    >
                                        edit
                                    </i>
                                </span>
                                <span className="task-icon">
                                    <i
                                        className="material-icons grey-text task-icon-btn"
                                        style={{marginRight: '10px', marginLeft: '10px'}}
                                        onClick={testF}
                                    >
                                        done
                                    </i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export const CreateTaskModal = () => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const stateContext = useContext(TaskContext);
    const {addTask} = stateContext;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = () => {
        if(name === '' || description === ''){
            setAlert('task form not filled in properly', 'warning');
        } else {
            const newTask = {
                name,
                description,
                createdAt: new Date(),
                archived: false,
                finished: false,
                recurringTask: false
            };
            addTask(newTask);
            setName('');
            setDescription('');
        }
    };

    /*
     * TODO: calendar, image, etc.
     * TODO: need form validation - will figure out later
     */
    return (
        <div className='modal fade' id='createTaskModal' tabIndex='-1' role='dialog' aria-labelledby='createTaskModalLabel' aria-hidden>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Create New Task</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden>&times;</span>
                        </button>
                    </div>
                    <form>
                    <div className='modal-body'>
                        <div className='input-group mb-3'>
                            <input
                                className='w-100 required form-control'
                                type='text'
                                placeholder='task name'
                                value={name} required
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input
                                className='w-100 required form-control'
                                type='text'
                                placeholder='task description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={onSubmit}>Save Task</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}