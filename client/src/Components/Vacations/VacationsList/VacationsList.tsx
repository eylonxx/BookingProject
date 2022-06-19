import { useEffect, useState } from 'react';
import UserModel from '../../../Models/userModel';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import followersService from '../../../Services/FollowersService';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(null);

  useEffect(
    //save to local state or redux
    () => {
      vacationService.getAllVacations();

      const unsubscribe = store.subscribe(() => {
        setVacations(store.getState().vacationState.vacations);
        setUserId(store.getState().authState.user.id);
        console.log(store.getState().vacationState.vacations);
        const loggedIn = store.getState().authState.isLoggedIn;
        if (loggedIn) setIsAdmin(store.getState().authState.user.role === 'Admin');
      });

      return () => unsubscribe();
    },
    []
  );
  useEffect(() => {
    if (userId !== null) followersService.getAllFollowedVacationsByUserId(userId);
  }, [userId]);

  return (
    <div className="VacationsList">
      {vacations.map((vacation) => (
        <Vacation followed={vacation.isFollowed} canEdit={isAdmin} key={vacation.id} vacation={vacation} />
      ))}
    </div>
  );
}
