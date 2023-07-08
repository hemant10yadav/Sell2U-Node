import Jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import EnvConstants from '../util/envConstants';
import logger from '../util/logger';

export async function signup(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const err: any = new Error('Validation error');
			err.statusCode = 400;
			err.data = errors.array();
			throw err;
		}
		const newUserData = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: await bcryptjs.hash(req.body.password, 12),
		});
		logger.info(`Creating account for user with username ${req.body.username}`);
		const user = await newUserData.save();
		return res.status(200).json(user);
	} catch (err: any) {
		logger.error(`Error while creating account for user ${err.message}`);
		// Pass the error if exist to the next middleware
		next(err);
	}
}

export async function login(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const emailOrUsername = req.body.emailOrUsername;
		const password = req.body.password;
		const loadUser = await User.findOne({
			$or: [{ email: emailOrUsername }, { username: emailOrUsername }],
		});
		if (!loadUser || !(await bcryptjs.compare(password, loadUser.password))) {
			const error: any = new Error('Wrong credentials');
			error.statusCode = 401;
			throw error;
		}
		const token: string = Jwt.sign(
			{
				username: loadUser?.username,
				userId: loadUser?._id.toString(),
			},
			EnvConstants.PASSWORD_ENCRYPTION_KEY,
			{ expiresIn: '48h' }
		);
		const restUser = JSON.parse(JSON.stringify(loadUser));
		delete restUser.password;
		logger.info(`Login successfully done for ${req.body.emailOrUsername}`);
		res.status(200).json({
			token,
			user: restUser,
		});
	} catch (err: any) {
		logger.warn(`Error while login user ===> ${err.message}`);
		next(err);
	}
}

export async function resetPassword(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	try {
		const emailOrUsername = req.body.emailOrUsername;
		const loadUser = await User.findOne({
			$or: [{ email: emailOrUsername }, { username: emailOrUsername }],
		});
		if (loadUser instanceof User) {
		}
	} catch (err) {}
}
