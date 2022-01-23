import 'dotenv/config';
import express from 'express';
import { config } from "./config";
import { databaseConnect } from "./database";
import { setupRoutes } from './routes';

const main = async () => {
  // wait for the database to connect
  await databaseConnect(config.mongoUri, config.mongoDatabase);

  const app = express();

  /**
   * Middleware
   */
  app.use(express.json());

  /**
   * Routes
   */
  setupRoutes(app);

  /**
   * Error and 404 Handlers
   */

  // TODO

  /**
   * Listen
   */
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });

};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
