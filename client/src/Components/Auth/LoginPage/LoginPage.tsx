import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/credentialsModel';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';

export default function LoginPage() {
  const { register, handleSubmit, reset, control } = useForm<UserModel>();
  const navigate = useNavigate();

  async function sendData(user: CredentialsModel) {
    try {
      await authService.login(user);
      reset();
      alert('You have been succesfully logged in.');
      navigate('/vacations');
    } catch (e: any) {
      reset();
      alert(e);
    }
  }
  const myHelper = {
    username: {
      required: 'Please enter a username',
    },
    password: {
      required: 'Please enter a password',
    },
  };

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{
            required: true,
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
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...register('password')}
              type="text"
              label="Password"
              error={error !== undefined}
              helperText={error ? myHelper.password.required : ''}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>{' '}
      </form>
    </div>
  );
}
