import { Router } from 'express';
import { login, signup } from '../controllers/authCtrl';
import { body } from 'express-validator';
import User from '../models/user';

const router: Router = Router();

router.post(
   '/signup',
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
   signup,
);

router.post('/login', login);

export default router;
