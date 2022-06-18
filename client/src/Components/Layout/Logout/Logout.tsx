import React, { useEffect, useState } from 'react';
import './Logout.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import UserModel from '../../../Models/userModel';

export default function Logout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>(null);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const renderHeader = () => {
    return (
      <span
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </span>
    );
  };

  return <div>{renderHeader()}</div>;
}
