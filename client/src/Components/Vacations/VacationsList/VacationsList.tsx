import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
import store from '../../../Redux/Store';
import vacationService from '../../../Services/VacationService';
import Vacation from '../Vacation/Vacation';
import './VacationsList.css';

export default function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  //get vacations from vacationservice that uses axios to fetch from the server

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
