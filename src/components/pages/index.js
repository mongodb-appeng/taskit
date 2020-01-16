import React, {Fragment, useContext, useEffect} from 'react';
import {TaskList, TaskModal} from '../tasks';
import StitchContext from '../../context/stitch/stitchContext';
import TaskContext from '../../context/task/taskContext';
import AlertContext from '../../context/alert/alertContext';

export const About = () =>  <div className='row h-50 align-items-center' style={{paddingTop: '50px'}}>
    <div className='col-12 h-100 d-table'>
        <div className='card card-block'>
            <div className='card-header text-center font-weight-bold navbar-light bg-light'>
                About TaskIt
            </div>
            <div className='card-body d-table-cell align-middle'>
                <p className='card-text'>MongoDB Stitch GraphQL demo</p>
                <p className='card-text'>version: <strong>0.1.0</strong></p>
                <p className='card-text'>license: <strong>Apache Version 2.0</strong></p>
                <p className='card-text'>Github: <strong><a href='https://github.com/mongodb-appeng/taskit'>taskit</a></strong></p>
            </div>
        </div>
    </div>
</div>;

export const Home = () => {
    const taskContext = useContext(TaskContext);
    const {clearCurrentTask} = taskContext;

    return (
        <Fragment>
            <div style={{paddingBottom: '10px', paddingTop: '10px'}}>
                <button
                    type='button'
                    className='btn btn-lg btn-secondary'
                    data-toggle='modal'
                    data-target='#taskModal'
                    onClick={clearCurrentTask}
                >
                    <i className='material-icons' style={{verticalAlign: 'middle', paddingBottom: '5px'}}>
                        add_circle_outline
                    </i>
                    {' '}New Task
                </button>
            </div>
            <TaskList/>
            <TaskModal/>
        </Fragment>
    )
};

export const Login = props => {
    const stitchContext = useContext(StitchContext);
    const alertContext = useContext(AlertContext);

    const {anonLogin, loggedIn, error} = stitchContext;
    const {setAlert} = alertContext;

    useEffect(() => {
        if(loggedIn) {
            props.history.push('/');
        }

        if(error !== null){
            setAlert(error, 'danger');
        }
        // eslint-disable-next-line
    }, [loggedIn, props.history, error]);

    return (
        <div className='row h-50 align-items-center' style={{paddingTop: '50px'}}>
            <div className='col-12 h-100 d-table'>
                <div className='card card-block'>
                    <div className='card-header text-center font-weight-bold navbar-light bg-light'>
                        TaskIt: A Simple ToDo Tutorial
                    </div>
                    <div className='card-body d-table-cell align-middle'>
                        <p className='card-text'>
                            This tutorial makes use of the MongoDB Atlas Data Platform, including Stitch and the new
                            GraphQL features to manipulate basic tasks.
                        </p>
                        <p>
                            This application uses simple anonymous login to gain access to the data plaform.
                        </p>
                        <p>
                            For more information on how to setup this application please visit
                            this <a href='https://github.com/mongodb-appeng/taskit'>github</a> repository
                        </p>
                    </div>
                    <div className='card-body text-center'>
                        <button
                            className='btn btn-light btn-outline-secondary btn-lg mx-auto text-center'
                            onClick={anonLogin}
                        >
                            Anonymous Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};