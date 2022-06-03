import React, { useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacationModel';
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
  // const vacationsSeeds = [
  //   {
  //     id: 1,
  //     description: 'a place',
  //     destination: 'israel',
  //     imageName: '',
  //     startingDate: '0000-00-00',
  //     endingDate: '0000-00-00',
  //     price: 14,
  //     followers: 0,
  //   },
  //   {
  //     id: 2,
  //     description: 'a point',
  //     destination: 'japan',
  //     imageName: 'x',
  //     startingDate: '0000-00-00',
  //     endingDate: '0000-00-00',
  //     price: 53,
  //     followers: 0,
  //   },
  // ];

  return (
    <div className="VacationsList">
      {vacations.map((vacation) => (
        <Vacation vacation={vacation} />
      ))}
    </div>
  );
}
