import express, { Request, Response, NextFunction } from 'express';
// import authController from "./6-controllers/auth-controller";
import catchAll from './3-middleware/catch-all';
import vacationsController from './6-controllers/vacations-controller';
import authController from './6-controllers/auth-controller';
import followController from './6-controllers/follow-controller';
import { RouteNotFound } from './4-models/errors-model';
import expressFileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

// Create server:
const server = express();

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());
server.use(cors());

server.use(expressFileUpload());
// Transfer requests to the controller:
server.use('/api/', vacationsController);
server.use('/api/', followController);
server.use('/auth/', authController);
server.use(express.static(path.join(__dirname, '1-assets')));

// If route not found:
server.use('*', (request: Request, response: Response, next: NextFunction) => {
  const err = new RouteNotFound(request.method, request.originalUrl);
  next(err);
});

// Middleware to run after controllers (if controller continues request to next middleware)
server.use(catchAll);

// Listen on port 3001:
server.listen(3001, () => console.log('Listening... on port 3001'));
