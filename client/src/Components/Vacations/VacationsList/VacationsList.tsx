import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';
import socketService from '../../../Services/SocketService';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import VacationsChartModal from '../VacationsChartsModal/VacationsChartModal';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    vacationService.getAllVacations();
    socketService.connect();

    const unsubscribe = store.subscribe(() => {
      setVacations(store.getState().vacationState.vacations);
      setUserId(store.getState().authState.user?.id);
      const loggedIn = store.getState().authState.isLoggedIn;
      const user = store.getState().authState.user;
      if (loggedIn && user) setIsAdmin(user.role === 'Admin');
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (userId) followersService.getAllFollowedVacationsByUserId(userId);
  }, [userId]);

  function connect(): void {
    socketService.connect();
  }

  function send(): void {
    socketService.send();
  }

  return (
    <div className="VacationsList">
      {/* <button onClick={connect}>coonect</button>
      <button onClick={send}>send</button> */}
      <div className="VacationsList-links">
        {isAdmin && (
          <Button color="info" variant="contained" onClick={handleOpen}>
            Reports
          </Button>
        )}
        {isAdmin && (
          <Button component={Link} to="/vacations/new" color="info" variant="contained">
            Add a vacation
          </Button>
        )}
      </div>

      <div className="VacationsList-vacations">
        {vacations.map((vacation) => (
          <Vacation followed={vacation.isFollowed} canEdit={isAdmin} key={vacation.id} vacation={vacation} />
        ))}
      </div>

      <div className="VacationsList-modal">
        <VacationsChartModal open={open} handleOpen={handleOpen} handleClose={handleClose} vacations={vacations} />
      </div>
    </div>
  );
}
