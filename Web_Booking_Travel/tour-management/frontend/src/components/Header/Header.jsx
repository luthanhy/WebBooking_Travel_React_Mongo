import React, { useState , useContext ,useRef ,useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

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
  const headerRef = useRef(null)
  const stickyHeaderFunc = () =>{
      window.addEventListener('scroll',()=>{
          if(document.body.scrollTop>80 || document.documentElement.scrollTop >80){
              headerRef.current.classList.add('sticky__header')
          }else{
              headerRef.current.classList.remove('sticky__header')
          }
      })
  }
  useEffect(()=>{
      stickyHeaderFunc()
      return window.removeEventListener('scroll',stickyHeaderFunc)
  })
    const location = useLocation();
    const [username, setUsername] = useState(""); // State to store username
    const navigate = useNavigate();
    const {user,dispatch} = useContext(AuthContext);
    // Function to handle logout
    const handleLogout = () => {
        dispatch({type:'LOGOUT'})
        navigate('/')
    };

    return (
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              <div className="logo">
                <a href="./home">
                  <img src={logo} alt="" />
                </a>
              </div>

              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {nav_link.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={
                          location.pathname === item.path ? "active_link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className=" d-flex align-items-center gap-4">
                
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="nav__btn">
                      <Button className="btn secondary__btn">
                        <NavLink to="/login">Login</NavLink>
                      </Button>
                      <Button className="btn primary__btn">
                        <NavLink to="/register">Register</NavLink>
                      </Button>
                    </div>
                  </>
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
