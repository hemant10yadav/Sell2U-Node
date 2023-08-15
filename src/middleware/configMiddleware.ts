import { Request, Response, NextFunction } from 'express';
import Paths from '../constants/paths';

export let BASE_URL: string;
export function setBaseUrlMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	BASE_URL = `${req.protocol}:/${req.get('host')}`;
	req.baseUrl = BASE_URL;
	next();
}
