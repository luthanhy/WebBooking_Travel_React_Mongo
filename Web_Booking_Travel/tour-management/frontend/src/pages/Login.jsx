import React, { useState ,useContext} from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'; // Import necessary components
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonSection from '../shared/CommonSection';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [error, setError] = useState('');
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    dispatch({type:'LOGIN_START'})
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })

      const result = res.json()
      if(!res.ok){
        alert(result.message)
      }
      dispatch({type:'LOGIN_SUCCESS',payload:result.data})
      console.log(result)
      navigate('/'); // Redirect to homepage or dashboard
    } catch (err) {
      dispatch({type:'LOGIN_FAILURE',payload:err.message})
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
