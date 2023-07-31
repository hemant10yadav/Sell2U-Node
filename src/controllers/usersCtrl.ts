import { NextFunction, Response } from 'express';
import User from '../models/User';
import { handleException } from '../services/ErrorHandler';
import { StatusCode } from '../constants/enums';
import logger, { getMessage } from '../config/appUtil';
import Product from '../models/Product';
import { IProduct } from '../constants/interfaces';

export async function getCurrentUser(
	req: any,
	res: Response,
	next: NextFunction
) {
	try {
		if (req.userId) {
			const user = await User.findById(req.userId);
			logger.info(`Fetched the current user with Id ${req.userId}.`);
			return res.status(StatusCode.OK).json(user);
		}
		handleException(StatusCode.FORBIDDEN, getMessage('error.forbidden'));
	} catch (e) {
		next(e);
	}
}

export function updateWishlist(add: boolean) {
	return async (req: any, res: Response, next: NextFunction) => {
		try {
			if (req.userId) {
				const productIdOrId: string = req.params.productIdOrId;
				logger.info(productIdOrId);
				const product: IProduct | null = await Product.findOne({
					$or: [{ _id: productIdOrId }, { productId: productIdOrId }],
				});

				if (product) {
					let updateData = null;
					if (add) {
						const wishlist = await User.findOne({
							_id: req.userId,
							wishlist: product._id,
						}).select('wishlist');
						if (wishlist) {
							handleException(
								StatusCode.BAD_REQUEST,
								getMessage('error.wishlistProductPresent')
							);
							return;
						}
						updateData = { $push: { wishlist: product._id } };
					} else {
						updateData = { $pull: { wishlist: product._id } };
					}
					// Updating the wishlist array in db.
					const products = await User.findOneAndUpdate(
						{ _id: req.userId },
						updateData,
						{ new: true }
					)
						.select('wishlist')
						.populate('wishlist');
					logger.info(`Updated the wishlist of the user with ${req.userId}.`);
					return res.json(products);
				} else {
					handleException(
						StatusCode.BAD_REQUEST,
						getMessage('error.badRequest')
					);
					return;
				}
			}
			handleException(StatusCode.FORBIDDEN, getMessage('error.forbidden'));
			return;
		} catch (e) {
			next(e);
		}
	};
}
