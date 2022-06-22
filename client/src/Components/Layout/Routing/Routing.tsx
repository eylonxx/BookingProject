import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../Auth/LoginPage/LoginPage';
import RegisterPage from '../../Auth/RegisterPage/RegisterPage';
import NewVacationForm from '../../Vacations/NewVacationForm/NewVacationForm';
import UpdateVacationForm from '../../Vacations/UpdateVacationForm/UpdateVacationForm';
import VacationsChart from '../../Vacations/VacationsChart/VacationsChart';
import VacationsList from '../../Vacations/VacationsList/VacationsList';

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
        <Route path="/charts" element={<VacationsChart />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
