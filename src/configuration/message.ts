import fs from 'fs';
import path from 'path';
import logger from '../util/logger';

const JSON_FILE_PATH = path.join(__dirname, '..', 'constants', 'strings.json');

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
	return 'Something went wrong';
}
