import pino from 'pino-http';

export const httpLogger = pino();
export const log = httpLogger.logger;
