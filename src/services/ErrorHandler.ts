import { IError } from '../constants/interfaces';

export function handleException(
	statusCode: number,
	message: string,
	errors?: unknown
): Error {
	const error: IError = new Error(message);
	error.statusCode = statusCode;
	error.data = errors;
	throw error;
}
