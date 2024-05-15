import React, { useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RiUploadLine } from 'react-icons/ri';
import Modal from 'react-modal';
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
    return (
        <header className='header'>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex align-items-center justify-content-between'>
                        <div className='logo'>
                            <a href='./home'>
                                <img src={logo} alt='' />
                            </a>
                        </div>

                        <div className='navigation'>
                            <ul className='menu d-flex align-items-center gap-5'>
                                {nav_link.map((item, index) => (
                                    <li className='nav_item' key={index}>
                                        <NavLink to={item.path} className={navClass=>navClass.isActive?"active_link":""}>
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='nav__right d-flex align-items-center gap-4'>
                          

                            <div className='nav__btn'>
                                <Button className='btn secondary__btn'>
                                    <NavLink to='/login' className={navClass=>navClass.isActive?"active_link":""}>
                                        Login
                                    </NavLink>
                                </Button>
                                <Button className='btn primary__btn'>
                                    <NavLink to='/register' className={navClass=>navClass.isActive?"active_link":""}>
                                        Register
                                    </NavLink>
                                </Button>
                            </div>
                            <div className='upload__btn'>
                            <Button className='btn primary__btn'>
                                <NavLink to = '/uploadTour'>
                                        UploadContent
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
