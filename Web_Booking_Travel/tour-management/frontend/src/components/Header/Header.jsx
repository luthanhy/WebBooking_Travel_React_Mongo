import React, { useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import './Header.css';

const nav_link = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/tours',
        display: 'Tours'
    }
];

const Header = () => {
    const location = useLocation();
    const [username, setUsername] = useState(""); // State to store username
    const isLoggedIn = username !== ""; // Check if user is logged in

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout actions, e.g., clear local storage, reset state, etc.
        setUsername("");
    };

    return (
        <header className='header'>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex align-items-center justify-content-between'>
                        <div className='logo'>
                            <a href='./home'>a
                                <img src={logo} alt='' />
                            </a>
                        </div>

                        <div className='navigation'>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {nav_link.map((item, index) => (
                                    <li className='nav_item' key={index}>
                                        <NavLink to={item.path} className={location.pathname === item.path ? "active_link" : ""}>
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='nav__right d-flex align-items-center gap-4'>
                            <div className='upload__btn'>
                                <Button className='btn primary__btn'>
                                    <NavLink to = '/uploadTour'>
                                        UploadTour
                                    </NavLink>
                                </Button>
                            </div>
                            <div className='nav__btn'>
             
                                <Button className='btn secondary__btn'>
                                    <NavLink to='/login' className={location.pathname === '/login' ? "active_link" : ""}>
                                        Login
                                    </NavLink>
                                </Button>
                                <Button className='btn primary__btn'>
                                    <NavLink to='/register' className={location.pathname === '/register' ? "active_link" : ""}>
                                        Register
                                    </NavLink>
                                </Button>
                            </div>
     
                            <span className='mobile_menu'>
                                <i className='ri-menu-line'></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
