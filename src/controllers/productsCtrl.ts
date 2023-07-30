import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import { IProduct } from '../constants/interfaces';
import Product from '../models/product';
import { Schema } from 'mongoose';
import Counter from '../models/Counter';
import logger, { getMessage } from '../config/appUtil';
import Paths from '../constants/paths';

export async function getAllProducts(
	req: any,
	res: Response,
	next: NextFunction
) {
	try {
		const imageBaseUrl = `${req.protocol}://${req.get('host')}/${
			Paths.RESOURCES
		}`;
		const products = await Product.find();

		const productsWithUrls = products.map((product: any) => {
			// Map each image name to its corresponding image URL
			const imageUrls = product.images.map(
				(imageName: string) => `${imageBaseUrl}/${imageName}`
			);

			// Create a new product object with the image URLs included
			return { ...product._doc, imageUrls };
		});

		res.status(StatusCode.OK).json({
			productsWithUrls,
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
		productData.seller = req.userId as Schema.Types.ObjectId;
		const product = new Product(productData);

		let counter = await Counter.findOne();
		if (counter) {
			product.productId = counter.lastProductId + 1;
			counter.lastProductId = product.productId;
		} else {
			product.productId = 1;
			counter = new Counter();
			counter.lastProductId = product.productId;
			counter.lastUserId = 0;
		}
		await product.validate();
		await product.save();
		await counter.save();
		logger.info(`New product added having id ${product.id}`);
		await product.populate('seller');
		res.status(StatusCode.OK).json({
			product,
		});
	} catch (e) {
		next(e);
	}
}
