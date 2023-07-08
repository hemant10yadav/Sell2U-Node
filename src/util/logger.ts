import winston, { format } from 'winston';

const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
		winston.format.errors({ stack: true }),
		winston.format.printf(({ level, message, timestamp }) => {
			const colorizedLevel = format.colorize().colorize(level, level.toUpperCase());
			const colorizedMessage = format.colorize().colorize(level, message);
			return `${timestamp} [${colorizedLevel}] ${colorizedMessage}`;
		})
	),
});
export default logger;
