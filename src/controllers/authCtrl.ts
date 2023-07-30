import Jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import EnvConstants from '../constants/envConstants';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import { IUser } from '../constants/interfaces';
import Counter from '../models/Counter';
import logger from '../config/appUtil';

export async function signup(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			handleException(
				StatusCode.BAD_REQUEST,
				'Validation error',
				errors.array()
			);
		}
		const newUserData = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			role: req.body.role,
			password: await bcryptjs.hash(req.body.password, 12),
		});
		logger.info(`Creating account for user with username ${req.body.username}`);

		let counter = await Counter.findOne();
		if (counter) {
			newUserData.userId = counter.lastUserId + 1;
			counter.lastUserId = newUserData.userId;
		} else {
			newUserData.userId = 1;
			counter = new Counter();
			counter.lastUserId = newUserData.userId;
			counter.lastProductId = 0;
		}
		const user = await newUserData.save();
		await counter.save();
		return res.status(StatusCode.CREATED).json(user);
	} catch (err: any) {
		next(err);
	}
}

export async function login(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const emailOrUsername = req.body.emailOrUsername;
		const password = req.body.password;
		const loadUser: IUser | null = await User.findOne({
			$or: [{ email: emailOrUsername }, { username: emailOrUsername }],
		});
		if (!loadUser || !(await bcryptjs.compare(password, loadUser.password))) {
			handleException(StatusCode.BAD_REQUEST, 'Wrong credentials');
		}
		const token: string = Jwt.sign(
			{
				username: loadUser?.username,
				userId: loadUser?._id.toString(),
			},
			EnvConstants.PASSWORD_ENCRYPTION_KEY,
			{ expiresIn: EnvConstants.TOKEN_EXPIRATION_TIME }
		);
		const restUser = JSON.parse(JSON.stringify(loadUser));
		delete restUser.password;
		logger.info(`Login successfully done for ${req.body.emailOrUsername}`);
		res.status(StatusCode.OK).json({
			token,
			user: restUser,
		});
	} catch (err: any) {
		next(err);
	}
}

export async function resetPassword(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const emailOrUsername = req.body.emailOrUsername;
		const loadUser = await User.findOne({
			$or: [{ email: emailOrUsername }, { username: emailOrUsername }],
		});
		if (loadUser instanceof User) {
		}
	} catch (err) {}
}
