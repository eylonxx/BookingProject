import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import vacationService from '../../../Services/VacationService';
import Vacation from '../Vacation/Vacation';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  //how to get followed vacations?
  //setup redux for follows
  //follow and unfollow functions
  //on each vacation component have the follow and unfollow events call redux to change the state and change the heart to active\not active with redux.
  //on redux have it pull all current followed vacations with a special sql query from the followers table
  const userToken = store.getState().authState.token;

  useEffect(
    //save to local state or redux
    () => {
      vacationService
        .getAllVacations()
        .then((allVacations) => {
          setVacations(allVacations);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    []
  );

  return (
    <div className="VacationsList">
      {vacations.map((vacation) => (
        <Vacation vacation={vacation} />
      ))}
    </div>
  );
}
