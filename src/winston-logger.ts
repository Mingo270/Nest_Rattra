import { createLogger, transports, format } from 'winston';
import * as path from 'path';

const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
);

export const CustomLogger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
            )
        }),
        new transports.File({
            filename: path.join(__dirname, '/logs/combined.log'),
            level: 'info',
        }),
        new transports.File({
            filename: path.join(__dirname, '/logs/error.log'),
            level: 'error',
        }),
    ],
});


process.on('uncaughtException', (error) => {
    CustomLogger.error(`Uncaught Exception: ${error.message}`);
});


process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    CustomLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});
