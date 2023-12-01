import { StatusCode } from '../constants/enums';
import { IError } from '../constants/interfaces';
import { validationResult } from 'express-validator/src/validation-result';
import { Request } from 'express';

const handleException = (
	statusCode: number,
	message: string,
	errors?: unknown
): Error => {
	const error: IError = new Error(message);
	error.statusCode = statusCode;
	error.data = errors;
	throw error;
};

const validate = (req: Request): void => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		handleException(StatusCode.BAD_REQUEST, 'Validation error', errors.array());
	}
};

export { handleException, validate };
