import React, { useEffect, useState } from 'react';
import UserModel from '../../../Models/userModel';
import store from '../../../Redux/Store';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Routing from '../Routing/Routing';
import './PageLayout.css';

export default function PageLayout() {
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
