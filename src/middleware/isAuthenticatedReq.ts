import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import EnvConstants from '../util/envConstants';
import logger from '../util/logger';

export default function isAuthenticatedReq(
   req: any,
   res: Response,
   next: NextFunction,
) {
   const token = req.get('Authorization')?.split(' ')[1];
   let decodedToken: any;
   try {
      if (token) {
         decodedToken = jwt.verify(token, EnvConstants.PASSWORD_ENCRYPTION_KEY);
      }
      if (!decodedToken) {
         const error: any = new Error('Authentication failed');
         error.statusCode = 401;
         throw error;
      }
      req.username = decodedToken?.username;
      req.userId = decodedToken?._id;
      next();
   } catch (e: any) {
      e.message = 'Authentication failed';
      logger.warn(`Authentication failed`);
      next(e);
   }
}
