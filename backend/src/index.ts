import 'dotenv/config';
import express from 'express';
import { config } from "./config";
import { databaseConnect } from "./database";
import { httpLogger, log } from './logger';
import { setupRoutes } from './routes';

const main = async () => {
  // wait for the database to connect
  await databaseConnect(config.mongoUri, config.mongoDatabase);

  const app = express();

  /**
   * Middleware
   */
  app.use(httpLogger);
  app.use(express.json());

  /**
   * Routes
   */
  setupRoutes(app);

  /**
   * Listen
   */
  app.listen(config.port, () => {
    log.info(`Listening on port ${config.port}`);
  });

};

main().catch(err => {
  log.error(err);
  process.exit(1);
});
