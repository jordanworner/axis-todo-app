import express from 'express';
import cors from 'cors';
import { httpLogger } from './logger';
import { setupRoutes } from './routes';

export const setupServer = (app: express.Express): void => {
  // Middleware
 app.use(httpLogger);
 app.use(express.json());
 app.use(cors({origin: '*'}));

 // Routes
 setupRoutes(app);
};
