import { IProduct } from '../util/interfaces';
import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';

export async function addProduct(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const product: IProduct = req.body;
		const newProduct = new Product({ ...product });
		await newProduct.save();
	} catch (e) {
		next(e);
	}
}
