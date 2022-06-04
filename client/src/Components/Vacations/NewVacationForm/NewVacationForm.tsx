import React from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import { useNavigate } from 'react-router-dom';

export default function NewVacationForm() {
  const { register, handleSubmit } = useForm<VacationModel>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<VacationModel> = async (vacation) => {
    await vacationService.createVacation(vacation);
    navigate('/vacations');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Description:</label>
      <input {...register('description')} />
      <label>Destination:</label>
      <input {...register('destination')} />
      <label>imageName:</label>
      <input {...register('imageName')} />
      <label>Starting Date:</label>
      <input type="date" {...register('startingDate')} />
      <label>endingDate:</label>
      <input type="date" {...register('endingDate')} />
      <label>Price:</label>
      <input {...register('price')} />
      <button>Submit</button>
    </form>
  );
}
