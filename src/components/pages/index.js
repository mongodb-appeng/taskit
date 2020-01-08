import React, {Fragment, useContext, useEffect} from 'react';
import {TaskList, CreateTaskModal} from '../tasks';
import StitchContext from '../../context/stitch/stitchContext';
import AlertContext from '../../context/alert/alertContext';

/*
 * TODO: get version from some variable
 *  - license?
 *  - github link?
 *  - doc links?
 */
export const About = () =>  <div>
    <h1>About</h1>
    <p>graphql demo</p>
    <p>add other information here as needed</p>
    <p>version 1.0.0</p>
    <p><span className='iconify' data-icon='mdi:github-face' data-inline='false'/></p>
</div>;

/*
 * a search might be nice ...
 */
export const Home = () => {
    return (
        <Fragment>
            <div style={{paddingBottom: '10px', paddingTop: '10px'}}>
                <button
                    type='button'
                    className='btn btn-lg btn-secondary'
                    data-toggle='modal'
                    data-target='#createTaskModal'
                >
                    <i className='material-icons' style={{verticalAlign: 'middle', paddingBottom: '5px'}}>
                        add_circle_outline
                    </i>
                    {' '}New Task
                </button>
            </div>
            <TaskList/>
            <CreateTaskModal/>
        </Fragment>
    )
};

/*
 * TODO: simple anonymous testing for login
 */
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
                        TaskIt: A Simple Task Tutorial
                    </div>
                    <div className='card-body d-table-cell align-middle'>
                        <p className='card-text'>
                            This tutorial makes use of the MongoDB Atlas Data Platform, including Stitch and the new
                            GraphQL features to manipulate basic tasks.
                        </p>
                        <p className='card-text'>for more information see:</p>
                        <ul>
                            <li>....</li>
                            <li>....</li>
                            <li>....</li>
                        </ul>
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