import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import EnvConstants from '../constants/envConstants';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import logger from '../config/appUtil';

export default function isCurrentUserValid(
	req: any,
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