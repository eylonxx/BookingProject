import express, { NextFunction, Request, Response } from 'express';
import CredentialsModel from '../4-models/credentials-model';
import UserModel from '../4-models/user-model';
import authLogic from '../5-logic/auth-logic';
import roleModel from '../4-models/role-model';
const router = express.Router();

// POST http://localhost:3001/auth/register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create user object:
    const user = new UserModel(req.body);

    // Register:
    const token = await authLogic.register(user);
    console.log(token);

    // Return token:
    res.status(201).json(token);
  } catch (err: any) {
    next(err);
  }
});

// POST http://localhost:3001/auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create credentials object
    const credentials = new CredentialsModel(req.body);

    // Login:
    const token = await authLogic.login(credentials);

    // Return token:
    res.json(token);
  } catch (err: any) {
    next(err);
  }
});

export default router; // Export all routes from this controller.
