import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

/**
 * Provide Mongo URI and wait for connection. 
 */
export const databaseConnect = async (uri: string, database: string): Promise<void> => {
  // check for exisiting client
  if (client) {
    throw new Error('MongoClient already created');
  }

  if (!uri) {
    throw new Error('A Valid Mongo URI is required');
  }

  if (!database) {
    throw new Error('A Mongo database name is required');
  }

  // create client and database
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(database);

  return;
};

/**
 * Returns a Mongo Db object, or throws an error if it hasn't been created
 */
export const getDb = (): Db => {
  if (!db) {
    throw new Error('Database has not been created, please run databaseConnect');
  }

  return db;
};

/**
 * Returns the MongoClient object, or throws an error if it hasn't been created
 */
export const getClient = (): MongoClient => {
  if (!client) {
    throw new Error('Client has not been created, please run databaseConnect');
  }

  return client;
};
