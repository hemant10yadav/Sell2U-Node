import jwt from 'jsonwebtoken';
import EnvConstants from '../constants/envConstants';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import { NextFunction, Response, Request } from 'express';
import { getMessage } from '../config/appUtil';

export default function isCurrentUserValid(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.get('Authorization')?.split(' ')[1];
		let decodedToken: any;
		if (token) {
			decodedToken = jwt.verify(token, EnvConstants.LOGIN_ENCRYPTION_KEY);
		}
		if (!decodedToken) {
			handleException(StatusCode.BAD_REQUEST, getMessage('error.forbidden'));
		}
		req.username = decodedToken?.username;
		req.userId = decodedToken?.userId;
		next();
	} catch (e: unknown) {
		next(e);
	}
}
