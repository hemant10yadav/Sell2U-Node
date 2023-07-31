import jwt from 'jsonwebtoken';
import EnvConstants from '../constants/envConstants';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import logger from '../config/appUtil';
import { NextFunction, Response, Request } from 'express';
import { loggers } from 'winston';

export default function isCurrentUserValid(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.get('Authorization')?.split(' ')[1];
	let decodedToken: any;
	try {
		if (token) {
			decodedToken = jwt.verify(token, EnvConstants.PASSWORD_ENCRYPTION_KEY);
		}
		if (!decodedToken) {
			handleException(StatusCode.BAD_REQUEST, 'Authentication failed');
		}
		req.username = decodedToken?.username;
		req.userId = decodedToken?.userId;
		logger.info('uservalisd');
		next();
	} catch (e: any) {
		next(e);
	}
}
