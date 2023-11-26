import { Request, Response, NextFunction } from 'express';
import Paths from '../constants/paths';

export let BASE_URL: string;
export function setBaseUrlMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(req.headers.referer);
	BASE_URL = `${req.protocol}:/${req.get('host')}`;
	console.log(BASE_URL);
	req.baseUrl = BASE_URL;
	next();
}
