import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VacationsList from '../../Vacations/VacationsList/VacationsList';

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>trrrrrrrrrrrrrrrrrrest</h1>} />
        <Route path="/vacations" element={<VacationsList />} />
      </Routes>
    </div>
  );
}
