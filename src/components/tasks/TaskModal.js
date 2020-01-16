import React, {useContext, useEffect, useState} from "react";
import AlertContext from "../../context/alert/alertContext";
import TaskContext from "../../context/task/taskContext";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export const TaskModal = () => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const taskContext = useContext(TaskContext);
    const {addTask, clearCurrentTask, editTask, current} = taskContext;

    /*
     *
     */
    useEffect(() => {
        if(current !== null){
            setTask(current);
        } else {
            setTask({
                name: '',
                description: '',
                tags: [],
                dueBy: null,
                createdAt: new Date(),
                active: true
            });
        }
    }, [taskContext, current]);

    const [task, setTask] = useState({
        name: '',
        description: '',
        tags: [],
        dueBy: new Date(),
        createdAt: null,
        active: null
    });

    const {name, description, tags, dueBy} = task;

    /*
     *
     */
    const onChange = evt => setTask({...task, [evt.target.name]: evt.target.value});

    const addTags = evt => {
        if(evt.key === 'Enter' && evt.target.value !== ''){
            //only add if it already exists
            if(tags.indexOf(evt.target.value) === -1) {
                setTask({...task, tags: [...tags, evt.target.value]});
            }
            evt.target.value = '';
        }
    };

    const removeTag = idx => {
        const t = tags.filter(tag => tags.indexOf(tag) !== idx);
        setTask({...task, tags: t});
    };

    const changeDate = date => {
        setTask({...task, dueBy: date});
    };


    const onSubmit = evt => {
        evt.preventDefault();
        if(current === null){
            if(task.name === '' || task.description === ''){
                setAlert('task form not filled in properly', 'warning');
            } else {
                addTask(task);
            }
        } else {
            editTask(task);
        }
        clearCurrentTask();
    };

    return (
        <div
            className='modal fade'
            id='taskModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='taskModalLabel'
            aria-hidden
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>{current ? 'Edit Task' : 'Create New Task'}</h5>
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
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='input-group mb-3'>
                                <input
                                    className='w-100 required form-control'
                                    type='text'
                                    placeholder='task description'
                                    name='description'
                                    value={description}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="dropdown-divider"/>
                            <div className='input-group mb-3'>
                                <ul className="list-group list-group-horizontal">
                                    {tags.map((tag, idx) => (
                                        <li className='btn btn-secondary mr-1' key={idx} onClick={()=>removeTag(idx)}>
                                            <span>{tag}</span>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='input-group mb-3'>
                                <input
                                    className='w-100 form-control'
                                    type="text"
                                    onKeyUp={addTags}
                                    placeholder='press enter to add tags'/>
                            </div>
                            <div>
                                <p className='ml-1 mb-0 text-muted'>set due date</p>
                                <DatePicker
                                    className='mt-0 text-muted w-100 form-control'
                                    selected={dueBy !== null ? new Date(dueBy) : dueBy}
                                    onChange={changeDate}
                                />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                data-dismiss='modal'
                                onClick={onSubmit}
                            >
                                {current ? 'Update Task' : 'Save Task'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};