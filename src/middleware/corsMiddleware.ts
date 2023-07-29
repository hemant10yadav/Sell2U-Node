import { Request, NextFunction, Response } from 'express';

export default function corsMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Authorization');
	res.end();
	next();
}
