import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VacationsList from '../../Vacations/VacationsList/VacationsList';
import LoginPage from '../../Auth/LoginPage/LoginPage';
import RegisterPage from '../../Auth/RegisterPage/RegisterPage';
import Vacation from '../../Vacations/Vacation/Vacation';
import NewVacationForm from '../../Vacations/NewVacationForm/NewVacationForm';
import UpdateVacationForm from '../../Vacations/UpdateVacationForm/UpdateVacationForm';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Navigate } from 'react-router-dom';
export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/vacations" element={<VacationsList />} />
        <Route path="/vacations/new" element={<NewVacationForm />} />
        <Route path="/vacations/edit/:id" element={<UpdateVacationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
