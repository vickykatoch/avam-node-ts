import { createLogger, format, transports } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

const APP_LOG_DIR = join(__dirname, '../logs');

!existsSync(APP_LOG_DIR) && mkdirSync(APP_LOG_DIR);
const logFileName = join(APP_LOG_DIR, 'jls-logs.log');

// const fileRotatetransport = new transports.DailyRotateFile({
//   filename: 'application-%DATE%.log',
//   datePattern: 'YYYY-MM-DD-HH',
//   zippedArchive: true,
//   maxSize: '50m',
//   maxFiles: '14d'
// });
// fileRotatetransport.on('rotate', function(oldFilename: any, newFilename: any) {
//   // do something fun
// });
const options = {
  file: {
    level: 'debug',
    filename: logFileName,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const messageFormatter = (caller: string) =>
  format.combine(
    format.label({
      label: basename(caller)
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    format.printf(info => {
      const message = JSON.stringify(info.message);
      return `${info.timestamp} ${info.level} [${info.label}]: ${message}`;
    })
  );

// instantiate a new Winston Logger with the settings defined above
const logger = (caller: string) =>
  createLogger({
    format: messageFormatter(caller),
    transports: [new transports.Console(options.console), new transports.File(options.file)]
    // new transports.File(options.file), fileRotatetransport]
  });

export default logger;
