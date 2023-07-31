import { NextFunction, Response } from 'express';
import User from '../models/User';
import { IUser } from '../constants/interfaces';
import { Role, StatusCode } from '../constants/enums';
import { handleException } from '../services/ErrorHandler';
import logger from '../config/appUtil';

export default async function isSeller(
	req: any,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		if (req.userId) {
			const user: IUser | null = await User.findById(req.userId);
			if (user) {
				if ([Role.ADMINISTRATOR, Role.SELLER].includes(user.role)) {
					next();
					return;
				}
			}
			handleException(StatusCode.UNAUTHORIZED, 'Access Denied');
		}
	} catch (e) {
		next(e);
	}
}
