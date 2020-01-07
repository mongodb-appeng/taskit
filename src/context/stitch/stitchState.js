import React, {useReducer} from 'react';
import StitchContext from './stitchContext';
import TaskReducer from './stitchReducer';
import {loginAnonymous, getCurrentUser, hasLoggedInUser, logoutCurrentUser} from '../../stitch';
import {
    ANON_LOGIN,
    LOGOUT,
    STITCH_ERROR
} from '../types';

/*
 * TODO:
 *  - try catch & error handling
 *
 * NOTE: This state context is not production ready
 */
const StitchState = props => {
    /*
     * check for existing anonymous login
     */
    const initialState = {
        user: getCurrentUser(),
        loggedIn: hasLoggedInUser(),
        loading: !hasLoggedInUser(),
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const anonLogin = async () => {
        await loginAnonymous();
        dispatch({type: ANON_LOGIN});
    };

    const logout = async () => {
        await logoutCurrentUser();
        dispatch({type: LOGOUT});
    };

    return (
        <StitchContext.Provider value={{
            user: state.user,
            loggedIn: state.loggedIn,
            loading: state.loading,
            error: state.error,
            anonLogin,
            logout
        }}>
            {props.children}
        </StitchContext.Provider>
    )
};

export default StitchState;
