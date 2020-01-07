import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import StitchContext from '../../context/stitch/stitchContext';

/*
 * simple private route to protect home page
 */
export const PrivateRoute = ({component: Component, ...rest}) => {
    const stitchContext = useContext(StitchContext);
    const {loggedIn} = stitchContext;

    return (
        <Route
            {...rest}
            render={props => !loggedIn ? (<Redirect to='/login'/>) : (<Component {...props}/>)}
        />
    );
};