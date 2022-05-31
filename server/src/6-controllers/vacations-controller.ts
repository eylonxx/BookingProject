import express, { NextFunction, Request, Response } from 'express';
import { getAllVacations, getOneVacation } from '../5-logic/vacations-logic';
const router = express.Router();

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacations = await getAllVacations();
  } catch (error) {
    next(error);
  }
});

router.get('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const vacation = await getOneVacation(id);
  } catch (error) {
    next(error);
  }
});

export default router;
