import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../Auth/LoginPage/LoginPage';
import RegisterPage from '../../Auth/RegisterPage/RegisterPage';
import NewVacationForm from '../../Vacations/NewVacationForm/NewVacationForm';
import UpdateVacationForm from '../../Vacations/UpdateVacationForm/UpdateVacationForm';
import VacationsList from '../../Vacations/VacationsList/VacationsList';

export default function Routing() {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     setIsLoggedIn(store.getState().authState.isLoggedIn);
  //   });
  //   return () => unsubscribe();
  // });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/vacations" element={<VacationsList />} />
        <Route path="/vacations/new" element={<NewVacationForm />} />
        <Route path="/vacations/edit/:id" element={<UpdateVacationForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
