import React from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import VacationModel from '../../../Models/vacationModel';
import vacationService from '../../../Services/VacationService';
import { useNavigate } from 'react-router-dom';

export default function NewVacationForm() {
  const { register, handleSubmit } = useForm<VacationModel>({ defaultValues: {} });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<VacationModel> = async (vacation) => {
    await vacationService.createVacation(vacation);
    navigate('/vacations');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Description:</label>
      <input
        {...register('description', {
          required: { value: true, message: 'Missing description' },
        })}
      />
      <label>Destination:</label>
      <input
        {...register('destination', {
          required: { value: true, message: 'Missing destination' },
        })}
      />
      <label>imageName:</label>
      <input {...register('imageName')} />
      <label>Starting Date:</label>
      <input
        type="date"
        {...register('startingDate', {
          required: { value: true, message: 'Missing starting date' },
        })}
      />
      <label>endingDate:</label>
      <input
        type="date"
        {...register('endingDate', {
          required: { value: true, message: 'Missing ending date' },
        })}
      />
      <label>Price:</label>
      <input
        {...register('price', {
          required: { value: true, message: 'Missing price' },
          min: { value: 0, message: "Price can't be negative" },
          max: { value: 100000, message: "Price can't exceed 100,000" },
        })}
      />
      <button>Submit</button>
    </form>
  );
}
