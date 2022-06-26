import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';
import socketService from '../../../Services/SocketService';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(null);

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
        <Link to="/charts">Reports</Link>
        <Link to="/vacations/new">Add a vacation</Link>
      </div>

      <div className="VacationsList-vacations">
        {vacations.map((vacation) => (
          <Vacation followed={vacation.isFollowed} canEdit={isAdmin} key={vacation.id} vacation={vacation} />
        ))}
      </div>
    </div>
  );
}
