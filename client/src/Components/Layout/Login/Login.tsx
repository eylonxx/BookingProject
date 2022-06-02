import React from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="Login">
      {/* if logged out, show login and register */}
      {/* otherwise, show hi x and logout button */}
      <span>Hi user |</span>
      <Link to="/logout">
        <Button variant="text">Logout</Button>
      </Link>
      {/* 
        <Link to="/login">Login</Login>
        <Link to="/register">Register</Link>
        */}
    </div>
  );
}
