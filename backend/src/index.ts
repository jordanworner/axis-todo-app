import 'dotenv/config';
import { config } from "./config";
import { databaseConnect } from "./database";

const main = async () => {
  await databaseConnect(config.mongoUri, config.mongoDatabase);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
