import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Ensure you have corresponding styles
import registerImg from '../assets/images/register.png'; // Placeholder for register image
import userIcon from '../assets/images/user.png';
import { BASE_URL, URL_DOMAIN } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    accountType: 'user', // Default account type
    otp: '',
  });

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [notification, setNotification] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!userData.username || !userData.email || !userData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check OTP
    if (userData.accountType === 'sale' && otp !== userData.otp) {
      setError('Invalid OTP');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.message);
      } else {
        dispatch({ type: 'REGISTER_SUCCESS' });
        navigate('/login');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setNotification('');

    try {
      const res = await fetch(`${URL_DOMAIN}/sendOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email }),
      });
      const result = await res.json();
      if (res.ok && result.otp) {
        setOtp(result.otp);
        setNotification('OTP sent successfully!');
        setCooldown(30); // Start 30s cooldown
      } else {
        setError('Failed to send OTP email');
      }
    } catch (err) {
      setError('Failed to send OTP email');
      console.error(err.message);
    }
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (notification) {
      const notificationTimer = setTimeout(() => setNotification(''), 2000);
      return () => clearTimeout(notificationTimer);
    }
  }, [notification]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="Register" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="User" />
                </div>
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {notification && <div className="alert alert-success">{notification}</div>}
                <Form onSubmit={handleRegister}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      value={userData.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={userData.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <select
                      id="accountType"
                      value={userData.accountType}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="sale">Sales</option>
                    </select>
                  </FormGroup>
                  {userData.accountType === 'sale' && (
                    <>
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="CCCD"
                          required
                          id="cccd"
                          value={userData.cccd}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          required
                          id="phoneNumber"
                          value={userData.phoneNumber}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="OTP"
                          required
                          id="otp"
                          value={userData.otp}
                          onChange={(e) => setUserData({ ...userData, otp: e.target.value })}
                        />
                      </FormGroup>
                      <button
                        className="btn secondary_btn auth_btn"
                        onClick={handleSendOTP}
                        disabled={cooldown > 0}
                      >
                        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Send OTP'}
                      </button>
                    </>
                  )}
                  <button className="btn secondary_btn auth_btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                  </button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
