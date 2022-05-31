import express, { Request, Response, NextFunction } from "express";
import authController from "./6-controllers/auth-controller";
import gamesController from "./6-controllers/games-controller";
import logRequest from "./3-middleware/log-request";
import preventGarbage from "./3-middleware/prevent-garbage";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFound } from "./4-models/errors-model";

// Create server: 
const server = express();

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Middleware to run before controllers:
server.use(logRequest);
server.use(preventGarbage);

// Transfer requests to the controller: 
server.use("/api", authController);
server.use("/api", gamesController);

// If route not found: 
server.use("*", (request: Request, response: Response, next: NextFunction) => {
    const err = new RouteNotFound(request.method, request.originalUrl);
    next(err);
});

// Middleware to run after controllers (if controller continues request to next middleware)
server.use(catchAll);


// Listen on port 3001:
server.listen(3001, () => console.log("Listening..."));
