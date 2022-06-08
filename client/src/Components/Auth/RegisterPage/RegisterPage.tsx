import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';

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
  const myHelper = {
    firstName: {
      required: 'first name is required',
      minLength: 'name must be between 2-16 characters',
      maxLength: 'name must be between 2-16 characters',
    },
    lastName: {
      required: 'last name is required',
    },
    username: {
      required: 'username is required',
    },
    password: {
      required: 'password is required',
    },
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
              helperText={error ? myHelper.firstName.required : ''}
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
              helperText={error ? myHelper.lastName.required : ''}
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
              helperText={error ? myHelper.username.required : ''}
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
              type="password"
              label="Password"
              error={error !== undefined}
              helperText={error ? myHelper.password.required : ''}
            />
          )}
        />

        <Button variant="contained" disableElevation>
          Register
        </Button>
      </form>
    </div>
  );
}
