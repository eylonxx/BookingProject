import React, { useEffect } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';

export default function Login() {
  const handleLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    // console.log(store.getState().authState.user[0].firstName);
  }, []);

  const renderHeader = () => {
    if (store.getState().authState.user) {
      return (
        <div>
          <span>Hi, {store.getState().authState.user.firstName} |</span>
          <a>
            <Button onClick={handleLogout} variant="text">
              Logout
            </Button>
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <span>Hi, guest |</span>
          <Link to="/login">
            <Button variant="text">Login</Button>
          </Link>
        </div>
      );
    }
  };
  return <div>{renderHeader()}</div>;
}
