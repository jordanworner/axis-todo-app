import type express from 'express';

// Simple health check handler to test server
export const healthCheck: express.RequestHandler = (req, res) => {
  res.sendStatus(200);
};

export const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  req.log.error(err);
  res.sendStatus(500);
};

export const notFoundHandler: express.RequestHandler = (req, res, next) => {
  res.sendStatus(404);
};

export const setupRoutes = (app: express.Express): void => {
  app.get('/', healthCheck);

  /**
   * Error and 404 Handlers
   */

  app.use(errorHandler);
  app.use(notFoundHandler);
};
