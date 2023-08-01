import { Request, Response, NextFunction } from 'express';
import Paths from '../constants/paths';

export let RESOURCE_BASE_URL: string;
export function setBaseUrlMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	RESOURCE_BASE_URL = `${req.protocol}:/${req.get('host')}${Paths.RESOURCES}`;
	req.resourceBaseUrl = RESOURCE_BASE_URL;
	next();
}
