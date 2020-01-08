import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import StitchContext from '../../context/stitch/stitchContext';
import './Navbar.css';

export const Navbar = () => {
    const stitchContext = useContext(StitchContext);

    const {loggedIn, logout} = stitchContext;

    return (
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link to='/' className='navbar-brand'>
                <i className='material-icons navbar-icon'>list_alt</i> TaskIt
            </Link>

            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'/>
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/about'>About</Link>
                    </li>
                    {loggedIn ?
                        (
                            <Fragment>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/'>Home</Link>
                                </li>
                                <li>
                                    <a onClick={logout} href='#!' className='nav-link'>Logout</a>
                                </li>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>Login</Link>
                                </li>
                            </Fragment>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};
