import { WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';

export const getLoggerConfig = (): WinstonModuleOptions => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('App', { prettyPrint: true }),
      ),
    }),
  ],
});
