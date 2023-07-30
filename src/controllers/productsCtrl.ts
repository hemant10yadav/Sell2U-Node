import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';
import logger from '../util/logger';
import { validationResult } from 'express-validator/src/validation-result';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../util/enums';

export async function addProduct(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			handleException(
				StatusCode.BAD_REQUEST,
				'Validation error',
				errors.array()
			);
		}

		logger.error(req.file);
		console.log('inside add product', req.body);
		// const product: IProduct = req.body;
		// const newProduct = new Product({ ...product });
		// await newProduct.save();
	} catch (e) {
		next(e);
	}
}

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/products');
	},
	filename(req, file, cb) {
		const uniqueFileName = Date.now() + path.extname(file.originalname);
		cb(null, uniqueFileName);
	},
});

const upload = multer({ storage: storage }).any();
