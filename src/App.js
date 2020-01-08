import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {About, Home, Login} from './components/pages';
import {Alerts, Navbar} from './components/layout';
import {PrivateRoute} from './components/routing';
import AlertState from './context/alert/alertState';
import TaskState from './context/task/taskState';
import StitchState from './context/stitch/stitchState';
import './App.css';

/*
 * TaskIt uses context and hooks to create shared state
 */
const App = () => {
    return (
        <StitchState>
            <TaskState>
                <AlertState>
                    <BrowserRouter>
                        <Fragment>
                            <Navbar/>
                            <div className='container'>
                                <Alerts/>
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home}/>
                                    <Route exact path='/about' component={About}/>
                                    <Route exact path='/login' component={Login}/>
                                </Switch>
                            </div>
                        </Fragment>
                    </BrowserRouter>
                </AlertState>
            </TaskState>
        </StitchState>
    );
};

export default App;
