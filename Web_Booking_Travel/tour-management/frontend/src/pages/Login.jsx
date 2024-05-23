import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import { isAdmin } from '../utils/auth';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials : 'include',
        body: JSON.stringify(credentials),
      });
      
      const result = await res.json();
      console.log(result.data);
      if (!res.ok) {
        setError(result.message);
      } else {
        if(result.data === undefined){
        setError(result.message);
        }else{
          dispatch({ type: 'LOGIN_SUCCESS', payload: result.data,isAdmin : false});
          console.log(result.data);
          navigate('/'); // Redirect to homepage or dashboard
        }
        }
    } catch (err) {
      setError('Login failed. Please try again.');
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                  <button className="btn secondary_btn auth_btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
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
  );
};

export default Login;
