import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../constants/interfaces';
import { Role, StatusCode } from '../constants/enums';
import { handleException } from '../services/ErrorHandler';
import { getMessage } from '../config/appUtil';

export default async function isAdminMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	if (req.userId) {
		const user: IUser | null = await User.findById(req.userId);
		if (user) {
			if (user.role === Role.ADMINISTRATOR) {
				next();
			}
		}
		handleException(StatusCode.UNAUTHORIZED, getMessage('error.unauthorized'));
	}
}
