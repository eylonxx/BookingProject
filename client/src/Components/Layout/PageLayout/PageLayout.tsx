import React from 'react';
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
