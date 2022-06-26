import express, { NextFunction, Request, Response } from 'express';
// import authController from "./6-controllers/auth-controller";
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import path from 'path';
import catchAll from './3-middleware/catch-all';
import { RouteNotFound } from './4-models/errors-model';
import socketioLogic from './5-logic/socketio-logic';
import authController from './6-controllers/auth-controller';
import followController from './6-controllers/follow-controller';
import vacationsController from './6-controllers/vacations-controller';

// Create server:
const expressServer = express();

// Tell express to extract json object from request body into request.body variable:
expressServer.use(express.json());
expressServer.use(cors());

expressServer.use(expressFileUpload());
// Transfer requests to the controller:
expressServer.use('/api/', vacationsController);
expressServer.use('/api/', followController);
expressServer.use('/auth/', authController);
expressServer.use(express.static(path.join(__dirname, '1-assets')));

// If route not found:
expressServer.use('*', (request: Request, response: Response, next: NextFunction) => {
  const err = new RouteNotFound(request.method, request.originalUrl);
  next(err);
});

// Middleware to run after controllers (if controller continues request to next middleware)
expressServer.use(catchAll);

// Listen on port 3001:
const httpServer = expressServer.listen(3001, () => console.log('Listening... on port 3001'));

socketioLogic.listen(httpServer);
