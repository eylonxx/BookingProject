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
      navigate('/vacations');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(sendData)}>
        <label>First name:</label>
        <input
          type="text"
          {...register('firstName', {
            required: { value: true, message: 'Missing first name' },
          })}
        />
        <label>Last name:</label>
        <input
          type="text"
          {...register('lastName', {
            required: { value: true, message: 'Missing last name' },
          })}
        />
        <label>Username:</label>
        <input
          type="text"
          {...register('username', {
            required: { value: true, message: 'Missing username' },
            minLength: { value: 4, message: 'Username must be between 4-16 characters' },
            maxLength: { value: 16, message: 'Username must be between 4-16 characters' },
          })}
        />
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: { value: true, message: 'Missing password' },
            minLength: { value: 4, message: 'Password must be between 4-16 characters' },
            maxLength: { value: 16, message: 'Password must be between 4-16 characters' },
          })}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
