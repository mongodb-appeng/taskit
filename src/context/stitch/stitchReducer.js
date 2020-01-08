import {
    ANON_LOGIN,
    LOGOUT,
    STITCH_ERROR,
    CLEAR_STITCH_ERROR
} from '../types';
import {getCurrentUser, hasLoggedInUser} from "../../stitch";

/*
 * NOTE: this reducer is not production ready
 *
 * anonymous user authentication should only be used for reading from Atlas.
 * when a user logs in using one of the other Stitch providers this anonymous
 * user can be linked to that account which will have higher privileges.
 *
 * For this tutorial we are focusing on the graphql features and will introduce
 * richer authentication in later tutorials.
 */
export default (state, action) => {
    switch (action.type) {
        case ANON_LOGIN:
        case LOGOUT:
            return {
                ...state,
                user: getCurrentUser(),
                loggedIn: hasLoggedInUser(),
                loading: !hasLoggedInUser(),
                error: null
            };
        case STITCH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_STITCH_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};