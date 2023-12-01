import Jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import EnvConstants from '../constants/envConstants';
import { validate, handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import { IUser } from '../constants/interfaces';
import Counter from '../models/Counter';
import logger, { getMessage } from '../config/appUtil';
import sendMail from '../services/email-service';
import Paths from '../constants/paths';

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		validate(req);
		req.body.password = await bcryptjs.hash(req.body.password, 12);
		await updateCounter(req.body);
		logger.info(`Creating account for user with username ${req.body.username}`);
		const user = await User.create(req.body);
		sendMail(
			user.email,
			'Welcome to Sell2U. Please verify your account.',
			getMessage('email.signup').replace(
				'{{verificationLink}}',
				`${req.headers.referer}${Paths.USERS.replace('/', '')}${Paths.EMAIL}${
					Paths.VERIFY
				}?token=${generateToken(user, 'email')}`
			)
		);
		return res.status(StatusCode.CREATED).json(user);
	} catch (err: unknown) {
		next(err);
	}
};

const updateCounter = async (newUserData: any) => {
	let counter = await Counter.findOne();
	if (counter) {
		newUserData.userId = String(Number(counter.lastUserId) + 1);
		counter.lastUserId = newUserData.userId;
	} else {
		newUserData.userId = '1';
		counter = new Counter();
		counter.lastUserId = newUserData.userId;
		counter.lastProductId = '0';
	}
	logger.info(`Updating counter to: ${counter.lastUserId}`);
	await counter.save();
};

const generateToken = (user: any, tokenFor: 'email' | 'password') => {
	let key: string;
	let time: string;
	switch (tokenFor) {
		case 'email':
			key = EnvConstants.EMAIL_ENCRYPTION_KEY;
			time = EnvConstants.TOKEN_EXPIRATION_TIME;
			break;
		case 'password':
			key = EnvConstants.RESET_PASSWORD_ENCRYPTION_KEY;
			time = EnvConstants.RESET_TOKEN_EXPIRATION_TIME;
			break;
	}
	return Jwt.sign(
		{
			username: user?.username,
		},
		key,
		{ expiresIn: time }
	);
};

const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { emailOrUsername, password } = req.body;
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
	} catch (err: unknown) {
		next(err);
	}
};

const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	validate(req);
	const { email, token, newPassword } = req.body;
	try {
		const decodedToken: any = Jwt.verify(
			token,
			EnvConstants.RESET_PASSWORD_ENCRYPTION_KEY
		);
		if (decodedToken) {
			const hashPassword = await bcryptjs.hash(req.body.password, 12);
			await User.findOneAndUpdate(
				{
					email,
				},
				{ password: hashPassword }
			);
			logger.info(`password change successfully for ${email}`);
			res.status(StatusCode.OK);
		}
		handleException(StatusCode.BAD_REQUEST, 'error.invalidToken');
	} catch (err) {
		next(err);
	}
};

const sendResetPasswordLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	validate(req);
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		sendMail(
			user.email,
			'Welcome to Sell2U. Reset your password using this link.',
			getMessage('email.forgotPassword').replace(
				'{{verificationLink}}',
				`${req.headers.referer}${Paths.USERS.replace('/', '')}${Paths.EMAIL}${
					Paths.VERIFY
				}?token=${generateToken(user, 'password')}`
			)
		);
	}
};

export { signup, login, resetPassword };
