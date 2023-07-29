import { Router } from 'express';
import { login, signup, resetPassword } from '../controllers/authCtrl';
import { body } from 'express-validator';
import User from '../models/User';
import Paths from '../util/paths';
const router: Router = Router();

router.post(
	Paths.SIGNUP,
	[
		body('email')
			.isEmail()
			.withMessage('Enter a valid email address.')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((user) => {
					if (user) {
						return Promise.reject('E-mail address already exist.');
					}
				});
			}),
		body('username').custom((value, { req }) => {
			return User.findOne({ username: value }).then((user) => {
				if (user) {
					return Promise.reject('username already exist.');
				}
			});
		}),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Enter a valid password.'),
		body('firstName')
			.trim()
			.not()
			.isEmpty()
			.withMessage('First name is required'),
		body('lastName')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Last name is required'),
	],
	signup
);

router.post(Paths.LOGIN, login);

router.post(Paths.RESET_PASSWORD, resetPassword);

export default router;
