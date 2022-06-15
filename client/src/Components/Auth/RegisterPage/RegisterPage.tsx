import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';
import { handleErrorText } from '../authUtils';

export default function RegisterPage() {
  const { register, handleSubmit, control } = useForm<UserModel>();
  const navigate = useNavigate();
  async function sendData(user: UserModel) {
    try {
      await authService.register(user);
      alert('You have been succesfully registered.');
      navigate('/vacations');
    } catch (error) {
      console.log(error);
    }
  }
  const validationHandler = {
    username: handleErrorText('Please enter a username', 'Must be between 4-16 characters'),
    password: handleErrorText('Please enter a password', 'Must be between 4-16 characters'),
    firstName: handleErrorText('Please enter a password', 'Must be between 2-16 characters'),
    lastName: handleErrorText('Please enter a password', 'Must be between 2-16 characters'),
  };

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
            maxLength: 16,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...register('firstName')}
              type="text"
              label="First Name"
              error={error !== undefined}
              helperText={error ? validationHandler.firstName(error.type) : ''}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
            maxLength: 16,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...register('lastName')}
              type="text"
              label="Last Name"
              error={error !== undefined}
              helperText={error ? validationHandler.lastName(error.type) : ''}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 4,
            maxLength: 16,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...register('username')}
              type="text"
              label="Username"
              error={error !== undefined}
              helperText={error ? validationHandler.username(error.type) : ''}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 4,
            maxLength: 16,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...register('password')}
              type="text"
              label="Password"
              error={error !== undefined}
              helperText={error ? validationHandler.password(error.type) : ''}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </div>
  );
}
