import React, {useReducer} from 'react';
import StitchContext from './stitchContext';
import TaskReducer from './stitchReducer';
import {
    loginAnonymous,
    getCurrentUser,
    getCurrentUserToken,
    hasLoggedInUser,
    logoutCurrentUser
} from '../../stitch';
import {
    ANON_LOGIN,
    LOGOUT,
    STITCH_ERROR,
    CLEAR_STITCH_ERROR
} from '../types';

/*
 * NOTE: This state context is not production ready
 */
const StitchState = props => {
    /*
     * The stitch user is stored in local storage if the
     * anonymous user is not explicitly logged out, so
     * first will try to load the current user from existing
     * local storage
     *
     * With anonymous users authentication, this means that
     * if 2 different users were to use the same browser they
     * would share the same session.  Anonymous authentication
     * should really only be used for read-only data which does
     * not require users to login (like blog, or catalogue data),
     * while user authentication can be used for restricted data
     * like shopping carts and creating data in the system.
     */
    const initialState = {
        user: getCurrentUser(),
        loggedIn: hasLoggedInUser(),
        token: getCurrentUserToken(),
        error: null
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const anonLogin = async () => {
        try {
            await loginAnonymous();
            dispatch({type: ANON_LOGIN});
        } catch(error) {
            dispatch({type: STITCH_ERROR, payload: error.message});
        }
    };

    const logout = async () => {
        try {
            await logoutCurrentUser();
            dispatch({type: LOGOUT});
        } catch(error) {
            dispatch({type: STITCH_ERROR, payload: error.message});
        }
    };

    const clearError = () => dispatch({type: CLEAR_STITCH_ERROR});

    return (
        <StitchContext.Provider value={{
            user: state.user,
            loggedIn: state.loggedIn,
            token: state.token,
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
