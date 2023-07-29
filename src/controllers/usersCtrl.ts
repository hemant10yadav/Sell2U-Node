import { NextFunction, Response } from 'express';
import User from '../models/User';
import logger from '../util/logger';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../util/enums';

export async function getCurrentUser(
	req: any,
	res: Response,
	next: NextFunction
) {
	try {
		console.log(req.userId, req.username);
		if (req.userId) {
			const user = await User.findById(req.userId);
			logger.error('user', user);
			logger.info(`Fetched the current user with Id ${req.userId}.`);
			return res.status(StatusCode.OK).json(user);
		}
		handleException(StatusCode.FORBIDDEN, 'No session found.');
	} catch (e) {
		next(e);
	}
}
