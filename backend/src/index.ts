import 'dotenv/config';
import express from 'express';
import { setupCollections } from './collection';
import { config } from "./config";
import { databaseConnect } from "./database";
import { log } from './logger';
import { setupServer } from './server';

const main = async () => {
  // wait for the database to connect
  await databaseConnect(config.mongoUri, config.mongoDatabase);
  await setupCollections();

  const app = express();

  setupServer(app);
  
  // Start server
  app.listen(config.port, () => {
    log.info(`Listening on port ${config.port}`);
  });

};

main().catch(err => {
  log.error(err);
  process.exit(1);
});
