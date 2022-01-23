import type express from 'express';

// Simple health check handler to test server
export const healthCheck: express.RequestHandler = (req, res) => {
  res.sendStatus(200);
}

export const setupRoutes = (app: express.Express): void => {
  app.get('/', healthCheck);
};
