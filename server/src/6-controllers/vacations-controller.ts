import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import verifyAdmin from '../3-middleware/verify-admin';
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import { RouteNotFound } from '../4-models/errors-model';
import VacationModel from '../4-models/vacation-model';
import vacationsLogic from '../5-logic/vacations-logic';

const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get('/vacations', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vacations = await vacationsLogic.getAllVacations();
    res.json(vacations);
  } catch (error) {
    next(error);
  }
});

// GET http://localhost:3001/api/vacations/:id
router.get('/vacations/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const vacation = await vacationsLogic.getOneVacation(id);
    res.json(vacation);
  } catch (error) {
    next(error);
  }
});

// POST http://localhost:3001/api/vacations
router.post('/vacations', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    //vacation info from form
    //check for image
    req.body.image = req.files?.image;

    const vacation = new VacationModel(req.body);
    const addedVacation = await vacationsLogic.createVacation(vacation);
    res.json(addedVacation);
  } catch (error) {
    next(error);
  }
});

// PUT http://localhost:3001/api/vacations/:id
router.put('/vacations/:id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.id = +req.body.id;
    req.body.image = req.files?.image;
    const vacation = new VacationModel(req.body);
    const updatedVacation = await vacationsLogic.updateVacation(vacation);
    res.json(updatedVacation);
  } catch (error) {
    next(error);
  }
});

// DELETE http://localhost:3001/api/vacations/:id
router.delete('/vacations/:id', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const deletedVac = await vacationsLogic.deleteVacation(id);

    res.json(deletedVac).status(204);
  } catch (error) {
    next(error);
  }
});

export default router;
