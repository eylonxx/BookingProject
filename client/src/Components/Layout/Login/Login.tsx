import React, { useEffect, useState } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import UserModel from '../../../Models/userModel';

export default function Login() {
  const navigate = useNavigate();
  let firstName: string = window.sessionStorage.getItem('name');
  // useEffect(() => {
  //   firstName = window.sessionStorage.getItem('name');
  // }, []);
  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const renderHeader = () => {
    if (firstName) {
      return (
        <div>
          <span>Hello, {firstName}! </span>
          <span
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>Hello guest!</span>
        </div>
      );
    }
  };

  return renderHeader();
}
