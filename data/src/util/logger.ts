import * as winston from 'winston';
import moment from 'moment';
import { Config } from '../config/config';
import { provideSingleton } from './provideSingleton';
import { TypeLoggerLevels } from './logger-levels';

@provideSingleton(Logger)
export class Logger {
  private logger: any = null;

  public constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      // Optional - Add a json object with timestamp property in addition to log message
      /* format: winston.format.combine(
        winston.format.colorize(),
        // winston.format.label({ label: 'right now!' }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
      ), */
      defaultMeta: { service: 'default' },
      transports: [
        // To write always to console, enable the following line and unmark next block, which writes to console
        // new (winston.transports.Console)(),
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `debug` and below to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
      ],
    });

    //
    // Please mark following block, in a case you've um-marked line with "new (winston.transports.Console)()"
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

  public log(level: TypeLoggerLevels, message: Object | string): void {
    switch (typeof (message)) {
      case 'object':
        const newMessageObj: Object = { datetime: moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'), ...message };
        this.logger.log(level, newMessageObj);
        break;
      case 'string':
        const newMessageString: string = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ')}, ${message}`;
        this.logger.log(level, newMessageString);
        break;
      default:
        this.logger.log(level, message);
        break;
    }
  }
}
