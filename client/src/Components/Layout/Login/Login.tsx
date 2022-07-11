import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../../Redux/Store';
import authService from '../../../Services/AuthService';
import notyfConfig from '../../../Utils/notyf';
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
    notyfConfig.error('Logged out!');
    //go to /login after logging out
    navigate('/login');
  };

  const renderHeader = () => {
    //conditional rendering hello \ guest
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
