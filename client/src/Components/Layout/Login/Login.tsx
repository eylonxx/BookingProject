import React, { useEffect, useState } from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import UserModel from '../../../Models/userModel';

export default function Login() {
  const [user, setUser] = useState<UserModel>(null);

  const renderHeader = () => {
    return <span>login</span>;
  };

  return <div>{renderHeader()}</div>;
}
