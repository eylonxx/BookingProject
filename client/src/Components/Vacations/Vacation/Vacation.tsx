import React from 'react';
import VacationModel from '../../../Models/vacationModel';
interface VacationProps {
  vacation: VacationModel;
}
export default function Vacation(props: VacationProps) {
  const { description, destination, startingDate, endingDate, price, followers } = props.vacation;
  return <div></div>;
}
