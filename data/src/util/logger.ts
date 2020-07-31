import winston from 'winston';
import { Config } from '../config/config';
import { provideSingleton } from './provideSingleton';

@provideSingleton(Logger)
export class Logger {
  private logger: any = null;

  public constructor() {
    this.initialize();
  }

  private initialize() {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: { service: 'default' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `debug` and below to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (Config.environment !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }));
    }
  }

  public log(level: string, message: any): void {
    /* this.logger.log({
      level: level,
      message: message,
    }); */
    this.logger(level, message);
  }
}
