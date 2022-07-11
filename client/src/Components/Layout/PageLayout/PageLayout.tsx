import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelogAction } from '../../../Redux/AuthState';
import store from '../../../Redux/Store';
import Login from '../Login/Login';
import Routing from '../Routing/Routing';
import './PageLayout.css';

export default function PageLayout() {
  const navigate = useNavigate();
  //useEffect in top level component, checking for token and relogging (so redux stays updated on refresh)
  useEffect(() => {
    let token = window.sessionStorage.getItem('token');
    if (token) {
      const { user, exp } = jwtDecode(token) as any;
      if (Date.now() <= exp * 1000) {
        store.dispatch(RelogAction(user, token));
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="PageLayout">
      <header>
        <Login />
      </header>
      <main>
        <Routing />
      </main>
    </div>
  );
}
