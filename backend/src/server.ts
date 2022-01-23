import express from 'express';
import { httpLogger } from './logger';
import { setupRoutes } from './routes';

export const setupServer = (app: express.Express): void => {
  // Middleware
 app.use(httpLogger);
 app.use(express.json());

 // Routes
 setupRoutes(app);
};
