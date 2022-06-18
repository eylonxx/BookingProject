import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import vacationService from '../../../Services/VacationService';

import Vacation from '../Vacation/Vacation';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(
    //save to local state or redux
    () => {
      vacationService
        .getAllVacations()
        .then((allVacations) => {
          setVacations(allVacations); //redux
        })
        .catch((e) => {
          console.log(e);
        });

      const unsubscribe = store.subscribe(() => {
        setVacations(store.getState().vacationState.vacations);
        const loggedIn = store.getState().authState.isLoggedIn;
        if (loggedIn) setIsAdmin(store.getState().authState.user.role === 'Admin');
      });
      return () => unsubscribe();
    },
    []
  );

  return (
    <div className="VacationsList">
      {vacations.map((vacation) => (
        <Vacation canEdit={isAdmin} key={vacation.id} vacation={vacation} />
      ))}
    </div>
  );
}
