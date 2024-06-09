import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';
import NotificationPanel from './Notification';

const nav_link = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tours',
    display: 'Tours',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);

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
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <a href="/home">
                <img src={logo} alt="Logo" />
              </a>
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_link.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={location.pathname === item.path ? 'active_link' : ''}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex align-items-center gap-4">
              {user ? (
                <>
                  {user.accountType === 'sale' && (
                    <Button className="btn primary__btn">
                      <NavLink to="/uploadTour">Upload Tour</NavLink>
                    </Button>
                  )}
                  <h5 className="mb-0">{user.username}</h5>
                  <Button className="btn btn-dark" onClick={handleLogout}>
                    Logout
                  </Button>
                  <div className="notification-container">
                    <FaBell className="notification-icon" onClick={toggleNotifications} />
                    <NotificationPanel show={showNotifications} setShow={setShowNotifications} />
                  </div>
                </>
              ) : (
                <div className="nav__btn">
                  <Button className="btn secondary__btn">
                    <NavLink to="/login">Login</NavLink>
                  </Button>
                  <Button className="btn primary__btn">
                    <NavLink to="/register">Register</NavLink>
                  </Button>
                </div>
              )}

              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
