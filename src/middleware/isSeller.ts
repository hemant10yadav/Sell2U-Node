import { NextFunction, Response } from 'express';
import User from '../models/User';
import { IUser } from '../util/interfaces';
import { Role, StatusCode } from '../util/enums';
import { handleException } from '../services/ErrorHandler';

export default async function isSeller(
	req: any,
	res: Response,
	next: NextFunction
): Promise<any> {
	if (req.userId) {
		const user: IUser | null = await User.findById(req.userId);
		if (user) {
			if ([Role.ADMINISTRATOR, Role.SELLER].includes(user.role)) {
				next();
			}
		}
		handleException(StatusCode.UNAUTHORIZED, 'Access Denied');
	}
}
