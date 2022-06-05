import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/credentialsModel';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';

export default function LoginPage() {
  const { register, handleSubmit, reset } = useForm<UserModel>();
  const navigate = useNavigate();

  async function sendData(user: CredentialsModel) {
    try {
      await authService.login(user);
      reset();
      alert('You have been succesfully logged in.');
      navigate('/home');
    } catch (e: any) {
      reset();
      alert(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        <label>Username:</label>
        <input type="text" {...register('username')} />
        <label>Password:</label>
        <input type="password" {...register('password')} />
        <button>Login</button>
      </form>
    </div>
  );
}
