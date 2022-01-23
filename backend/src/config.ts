export const config = {
  port: process.env.PORT || '8080',
  logLevel: process.env.LOG_LEVEL || 'info',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/',
  mongoDatabase: process.env.MONGO_DATABASE || 'axis-todo-app'
};
