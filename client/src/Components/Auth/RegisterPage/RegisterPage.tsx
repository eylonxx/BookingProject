import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UserModel from '../../../Models/userModel';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<UserModel>();

  async function sendData(user: UserModel) {
    try {
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
