import React, { useEffect, useState } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import UserModel from '../../../Models/userModel';

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('Guest');

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsLoggedIn(store.getState().authState.isLoggedIn);
      console.log(store.getState().authState.user);

      setName(store.getState().authState.user?.firstName);
    });
    return () => unsubscribe();
  });

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const renderHeader = () => {
    if (isLoggedIn) {
      return (
        <div>
          <span>Hello, {name}! </span>
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
