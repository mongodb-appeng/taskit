import React, {useReducer} from 'react';
import StitchContext from './stitchContext';
import TaskReducer from './stitchReducer';
import {loginAnonymous, getCurrentUser, hasLoggedInUser, logoutCurrentUser} from '../../stitch';
import {
    ANON_LOGIN,
    LOGOUT,
    STITCH_ERROR,
    CLEAR_STITCH_ERROR
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
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const anonLogin = async () => {
        try {
            await loginAnonymous();
            dispatch({type: ANON_LOGIN});
        } catch(error) {
            dispatch({type: STITCH_ERROR, error: error.message});
        }
    };

    const logout = async () => {
        try {
            await logoutCurrentUser();
            dispatch({type: LOGOUT});
        } catch(error) {
            dispatch({type: STITCH_ERROR, error: error.message});
        }
    };

    const clearError = () => dispatch({type: CLEAR_STITCH_ERROR});

    return (
        <StitchContext.Provider value={{
            user: state.user,
            loggedIn: state.loggedIn,
            error: state.error,
            anonLogin,
            logout,
            clearError
        }}>
            {props.children}
        </StitchContext.Provider>
    )
};

export default StitchState;
