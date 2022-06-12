import express, { NextFunction, Request, Response } from 'express';
import followLogic from '../5-logic/follow-logic';
const router = express.Router();

// POST http://localhost:3001/auth/register
router.post('/follow', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    await followLogic.follow(req.body);
  } catch (err: any) {
    next(err);
  }
});

// POST http://localhost:3001/auth/login
router.post('/unfollow', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await followLogic.unfollow(req.body);
  } catch (err: any) {
    next(err);
  }
});

export default router; // Export all routes from this controller.
