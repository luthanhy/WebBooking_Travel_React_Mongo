import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/pageerror.css';
const PageError = () => {
  return (
    <div className="page-error">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div> 
 )
}

export default PageError