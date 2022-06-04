import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VacationsList from '../../Vacations/VacationsList/VacationsList';
import LoginPage from '../../Auth/LoginPage/LoginPage';
import RegisterPage from '../../Auth/RegisterPage/RegisterPage';

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>trrrrrrrrrrrrrrrrrrest</h1>} />
        <Route path="/vacations" element={<VacationsList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
