import fs from 'fs';
import path from 'path';
import winston, { format } from 'winston';

const JSON_FILE_PATH = getRootPath('src', 'constants', 'strings.json');
let jsonData: { [key: string]: string } | null = null;

function getMessageSource() {
	if (!jsonData) {
		try {
			const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
			jsonData = JSON.parse(data);
		} catch (err) {
			logger.error('Error while getting error messages:', err);
			// Exit the application or handle the error accordingly
			process.exit(1);
		}
	}
	return jsonData;
}

const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
		winston.format.errors({ stack: true }),
		winston.format.printf(({ level, message, timestamp }) => {
			const colorizedLevel = format
				.colorize()
				.colorize(level, level.toUpperCase());
			const colorizedMessage = format.colorize().colorize(level, message);
			return `${timestamp} [${colorizedLevel}] ${colorizedMessage}`;
		})
	),
});

export default logger;

export function getMessage(key: string): string {
	const messages = getMessageSource();
	const nestedKeys = key.split('.');
	let nestedMessage: any = messages;
	for (const nestedKey of nestedKeys) {
		nestedMessage = nestedMessage[nestedKey];
	}
	if (nestedMessage) {
		return nestedMessage;
	}
	return key;
}

export function getRootPath(...segments: string[]): string {
	return path.join(__dirname, '..', '..', ...segments);
}
