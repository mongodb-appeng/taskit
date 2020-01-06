import React, {Fragment, useContext, useEffect} from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import './App.css';

import TaskContext from './context/task/taskContext';
import TaskState from './context/task/taskState';

const Navbar = () =>
    <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand"><i className="material-icons navbar-icon">list_alt</i> TaskIt</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/about'>About</Link>
                </li>
            </ul>
        </div>
    </div>;

const TaskList = () => {
    const taskContext = useContext(TaskContext);
    const {tasks, getTasks} = taskContext;

    useEffect(() => {
        getTasks();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            {
                tasks.map(task => <TaskItem key={task._id} task={task}/>)
            }
        </Fragment>
    );
};

const TaskItem = ({task}) => {
    return (
        <Fragment>
            <div className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <div>
                        <p className="card-text">{task.description}
                            <a href="#!" style={{display: 'flex', float: 'right'}}>
                                <i className="material-icons grey-text">delete</i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const App = () => {
    return (
        <TaskState>
            <BrowserRouter>
                <Fragment>
                    <Navbar/>
                    <div className="container">
                        <TaskList/>
                    </div>
                </Fragment>
            </BrowserRouter>
        </TaskState>
    );
};

export default App;
