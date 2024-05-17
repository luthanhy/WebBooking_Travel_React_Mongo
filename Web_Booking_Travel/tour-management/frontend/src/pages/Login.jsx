import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: 'example@example.com',
    password: 'password123', 
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = e => {
    e.preventDefault();
    console.log('Đã đăng nhập với:', credentials);
  };

  return (
    <Container>
      <Row>
        <Col lg='8' className="m-auto" >
          <div className='login_container d-flex justify-content-between'>
            <div className="login_img">
              <img src={loginImg} alt="Login" />
            </div>
            <div className="login_form">
              <div className="user">
                <img src={userIcon} alt="User" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <input type="email" placeholder="Email" required id="email" value={credentials.email} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Password" required id="password" value={credentials.password} onChange={handleChange} />
                </FormGroup>
                <button className="btn secondary_btn auth_btn" type="submit">Login</button>
              </Form>
              <p>Don't have an account?<Link to='/register'>Create</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
