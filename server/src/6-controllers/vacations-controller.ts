import express, { NextFunction, Request, Response } from 'express';
import verifyAdmin from '../3-middleware/verify-admin';
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import VacationModel from '../4-models/vacation-model';
import vacationsLogic from '../5-logic/vacations-logic';
import path from 'path';
import fs from 'fs';
import { RouteNotFound } from '../4-models/errors-model';

const router = express.Router();

router.get('/vacations', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
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

router.post('/vacations', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    //vacation info from form
    req.body.image = req.files?.image;

    const vacation = new VacationModel(req.body);
    const addedVacation = await vacationsLogic.createVacation(vacation);
    res.json(addedVacation);
  } catch (error) {
    next(error);
  }
});

router.put('/vacations/:id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.id = +req.body.id;
    const vacation = new VacationModel(req.body);
    console.log(vacation);
    const updatedVacation = await vacationsLogic.updateVacation(vacation);
    console.log(updatedVacation);
    res.json(updatedVacation);
  } catch (error) {
    next(error);
  }
});

router.delete('/vacations/:id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    await vacationsLogic.deleteVacation(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get('/vacations/images/:imageName', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageName = req.params.imageName;
    const absolutePath = path.join(__dirname, '..', '1-assets', 'images', imageName);

    if (!fs.existsSync(absolutePath)) {
      throw new RouteNotFound(req.method, req.originalUrl);
    }
    res.sendFile(absolutePath);
  } catch (error) {
    next(error);
  }
});

export default router;
