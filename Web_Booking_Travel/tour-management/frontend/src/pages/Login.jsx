import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'; // Import necessary components
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonSection from '../shared/CommonSection';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
      console.log('Login successful:', res.data);
      // Perform actions after successful login, such as storing token in local storage
      navigate('/'); // Redirect to homepage or dashboard
    } catch (err) {
      setError(err.response.data.message);
      console.error('Login failed:', err.response.data.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login_container d-flex justify-content-between">
                <div className="login_img">
                  <img src={loginImg} alt="Login" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={userIcon} alt="User" />
                  </div>
                  <h2>Login</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <Form onSubmit={handleLogin}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <button className="btn secondary_btn auth_btn" type="submit">
                      Login
                    </button>
                  </Form>
                  <p>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        </section>
    </>
  );
};

export default Login;
