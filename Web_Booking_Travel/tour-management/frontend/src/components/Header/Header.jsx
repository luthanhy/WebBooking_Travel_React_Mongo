import React, { useRef, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, } from 'react-router-dom';
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
    const headerRef = useRef(null);

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();
        return () => {
            window.removeEventListener('scroll', stickyHeaderFunc);
        };
    }, []);

    return (
        <header className='header' ref={headerRef}>
            <Container>
                <Row>
                    <div className='nav__wrapper d-flex align-items-center justify-content-between'>
                        {/* logo */}
                        <div className='logo'>
                            <a href='./home'>
                                <img src={logo} alt='' />
                            </a>
                        </div>
                        {/* end logo */}

                        {/* menu */}
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
                        {/* end menu */}

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
