import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/userModel';
import authService from '../../../Services/AuthService';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();
  async function sendData(user: UserModel) {
    try {
      await authService.register(user);
      alert('You have been succesfully registered.');
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        <label>First name:</label>
        <input type="text" {...register('firstName')} />
        <label>Last name:</label>
        <input type="text" {...register('lastName')} />
        <label>Username:</label>
        <input type="text" {...register('username')} />
        <label>Password:</label>
        <input type="password" {...register('password')} />
        <button>Register</button>
      </form>
    </div>
  );
}
