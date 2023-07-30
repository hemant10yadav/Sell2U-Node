import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../util/enums';
import { getMessage } from '../configuration/message';
import { IProduct } from '../util/interfaces';
import Product from '../models/product';
import { Schema } from 'mongoose';
import logger from '../util/logger';

export async function addProduct(req: any, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req.body);
		const files = req.files as Express.Multer.File[];
		if (!errors.isEmpty()) {
			handleException(
				StatusCode.BAD_REQUEST,
				getMessage('error.validationError'),
				errors.array()
			);
		}
		const productData: Partial<IProduct> = req.body;
		if (files.length > 0) {
			productData.images = files.map(
				(file: Express.Multer.File) => file.filename
			);
		}
		productData.seller = req.userId as Schema.Types.ObjectId;
		const product = new Product(productData);
		await product.validate();
		await product.save();
		logger.info(`New product added having id ${product.id}`);
		await product.populate('seller');
		res.status(StatusCode.OK).json({
			product,
		});
	} catch (e) {
		next(e);
	}
}
