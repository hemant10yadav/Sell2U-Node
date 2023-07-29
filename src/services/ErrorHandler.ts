import { IError } from '../util/interfaces';

export function handleException(
	statusCode: number,
	message: string,
	errors?: unknown
) {
	const error: IError = new Error(message);
	error.statusCode = statusCode;
	error.data = errors;
	throw error;
}
