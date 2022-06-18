import React, { useEffect, useState } from 'react';
import UserModel from '../../../Models/userModel';
import store from '../../../Redux/Store';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Routing from '../Routing/Routing';
import './PageLayout.css';

export default function PageLayout() {
  const [user, setUser] = useState<UserModel>(null);
  useEffect(() => {
    setUser(store.getState().authState.user);
  }, []);
  return (
    <div className="PageLayout">
      <header>{user ? <Login /> : <Logout />}</header>
      <main>
        <Routing />
      </main>
    </div>
  );
}
