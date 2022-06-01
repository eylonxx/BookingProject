import express, { NextFunction, Request, Response } from 'express';
import {
  getAllVacations,
  getOneVacation,
  createVacation,
  updateVacation,
  deleteVacation,
} from '../5-logic/vacations-logic';
const router = express.Router();

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacations = await getAllVacations();
    res.json(vacations);
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

router.post('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    //vacation info from form
    const vacation = {
      description: 'lo1l',
      destination: 'lol',
      startingDate: '0000-00-00',
      endingDate: '0000-00-00',
      price: 13,
    };
    const addedVacation = await createVacation(vacation);
  } catch (error) {
    next(error);
  }
});

router.put('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const vacation = {
      id: id,
      description: 'lo133l',
      destination: 'lol',
      startingDate: '0000-00-00',
      endingDate: '0000-00-00',
      price: 13,
    };
    const addedVacation = await updateVacation(vacation);
  } catch (error) {
    next(error);
  }
});

router.delete('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    await deleteVacation(id);
  } catch (error) {
    next(error);
  }
});

export default router;
