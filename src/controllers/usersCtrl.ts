import { NextFunction, Response } from 'express';
import User from '../models/User';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import logger from '../config/appUtil';

export async function getCurrentUser(
	req: any,
	res: Response,
	next: NextFunction
) {
	try {
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
