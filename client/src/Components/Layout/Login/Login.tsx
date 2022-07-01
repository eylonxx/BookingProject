import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>('Guest');

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setIsLoggedIn(store.getState().authState.isLoggedIn);

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
        <div className="Login">
          <span className="Login-hello">Hello, {name}!</span>
          <span
            className="Login-logout-button"
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
        <div className="Login">
          <span>Hello guest!</span>
        </div>
      );
    }
  };

  return renderHeader();
}
