import React, { useState ,useContext} from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import CommonSection from '../shared/CommonSection';
import '../styles/login.css'; // Ensure you have corresponding styles
import registerImg from '../assets/images/register.png'; // Placeholder for register image
import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [error] = useState('');
  const [userData, setUserData] = useState({
    username: undefined, 
    email: undefined,
    password: undefined,
    accountType: undefined, // Default account type
  });
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setUserData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async e => {
    console.log("tdeptrai");
    e.preventDefault();
    try {
      console.log(userData);
      console.log("tdeptrai");
      
      const res = await fetch(`${BASE_URL}/auth/register`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      // const res = await axios.post(`${BASE_URL}/auth/register/`, {
      // method:'post',
      // headers:{
      //   'content-type': 'application/json'
      // }
      // });
      
      console.log("tdeptrai");
      const result  = await res.json();

      console.log("tdeptrai");
      if(!res.ok) alert(result.message)
      
      dispatch({type:'REGISTER_SUCCESS'})
      navigate('/login')
    } catch (err) {
      console.log(err.message)
      alert(err.message)
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
                  <img src={registerImg} alt="Register" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={userIcon} alt="User" />
                  </div>
                  <h2>Register</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
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
                      <select id="accountType" value={userData.accountType} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </FormGroup>
                    <button className="btn secondary_btn auth_btn" type="submit">
                      Register
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
    </>
  );
};

export default Register;
