import express, { NextFunction, Request, Response } from 'express';
import CredentialsModel from '../4-models/credentials-model';
import UserModel from '../4-models/user-model';
import authLogic from '../5-logic/auth-logic';

const router = express.Router();

// POST http://localhost:3001/register
router.post('/register', async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Create user object:
    const user = new UserModel(request.body);

    // Register:
    const token = await authLogic.register(user);

    // Return token:
    response.status(201).json(token);
  } catch (err: any) {
    next(err);
  }
});

// POST http://localhost:3001/login
router.post('/login', async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Create credentials object
    const credentials = new CredentialsModel(request.body);

    // Login:
    // const token = await authLogic.login(credentials);

    // Return token:
    // response.json(token);
  } catch (err: any) {
    next(err);
  }
});

export default router; // Export all routes from this controller.
