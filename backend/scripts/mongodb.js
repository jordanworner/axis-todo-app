const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const port = Number(process.env.MONGODB_PORT || '27017');

  const mongod = await MongoMemoryServer.create({
    instance: {
      port
    }
  });
  console.log(mongod.getUri())
})();
