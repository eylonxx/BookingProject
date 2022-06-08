import express, { NextFunction, Request, Response } from 'express';
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import VacationModel from '../4-models/vacation-model';
import vacationsLogic from '../5-logic/vacations-logic';
const router = express.Router();

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacations = await vacationsLogic.getAllVacations();
    res.json(vacations);
  } catch (error) {
    next(error);
  }
});

router.get('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const vacation = await vacationsLogic.getOneVacation(id);
    res.json(vacation);
  } catch (error) {
    next(error);
  }
});

router.post('/vacations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    //vacation info from form
    const vacation = new VacationModel(req.body);
    const addedVacation = await vacationsLogic.createVacation(vacation);
    res.json(addedVacation);
  } catch (error) {
    next(error);
  }
});

router.put('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacation = new VacationModel(req.body);
    const addedVacation = await vacationsLogic.updateVacation(vacation);
    console.log(addedVacation);
    res.json(addedVacation);
  } catch (error) {
    next(error);
  }
});

router.delete('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    await vacationsLogic.deleteVacation(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
