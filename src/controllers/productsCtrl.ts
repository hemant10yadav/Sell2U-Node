import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import { IProduct } from '../constants/interfaces';
import Product from '../models/Product';
import { Schema } from 'mongoose';
import Counter from '../models/Counter';
import logger, { getMessage } from '../config/appUtil';
import User from '../models/User';

export async function getAllProducts(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const products = await Product.find();
		res.status(StatusCode.OK).json({
			products,
		});
	} catch (e) {
		next(e);
	}
}

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
		productData.user = req.userId as Schema.Types.ObjectId;
		const product = new Product(productData);

		let counter = await Counter.findOne();
		if (counter) {
			product.productId = String(Number(counter.lastProductId) + 1);
			counter.lastProductId = product.productId;
		} else {
			product.productId = '1';
			counter = new Counter();
			counter.lastProductId = product.productId;
			counter.lastUserId = '0';
		}
		await product.validate();
		await product.save();
		await counter.save();

		// Update the products in user account
		await User.findOneAndUpdate(
			{ _id: req.userId },
			{ $push: { products: product._id } },
			{ new: true }
		);
		logger.info(`New product added having id ${product.id}`);
		res.status(StatusCode.OK).json({
			product,
		});
	} catch (e) {
		next(e);
	}
}
