import winston from 'winston';

// Define levels (standard npm levels)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Choose color for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  // Show logs in the console
  new winston.transports.Console(),
  // Save only errors to a dedicated file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Save everything to a combined file
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
  level: 'debug', // Log everything from debug level up
  levels,
  format,
  transports,
});

export default logger;