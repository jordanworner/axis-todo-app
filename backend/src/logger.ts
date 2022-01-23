import pino from 'pino-http';
import { config } from './config';

export const httpLogger = pino({
  level: config.logLevel
});
export const log = httpLogger.logger;
