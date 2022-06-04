import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateVacationForm() {
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit: SubmitHandler<VacationModel> = async (vacation) => {
    vacation.id = +params.id;
    await vacationService.updateVacation(vacation);
    navigate('/vacations');
  };

  useEffect(() => {
    const id: number = +params.id;
    vacationService.getOneVacation(id).then((vacToUpdate) => {
      setValue('description', vacToUpdate.description);
      setValue('destination', vacToUpdate.destination);
      setValue('startingDate', vacToUpdate.startingDate);
      setValue('endingDate', vacToUpdate.endingDate);
      setValue('imageName', vacToUpdate.imageName);
      setValue('price', vacToUpdate.price);
    });
  });

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
