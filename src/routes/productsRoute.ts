import { Router } from 'express';
import Paths from '../constants/paths';
import { addProduct, getAllProducts } from '../controllers/productsCtrl';
import upload from '../config/multer';
import { body } from 'express-validator';
import { ProductCategory, ProductSubCategory } from '../constants/enums';
import isAuthenticatedReq from '../middleware/isAuthenticatedReq';
import isSeller from '../middleware/isSeller';
import { getMessage } from '../config/appUtil';

const router: Router = Router();

router.get('', getAllProducts);

router.post(
	Paths.ADD,
	isAuthenticatedReq,
	isSeller,
	upload.array('images'),
	[
		body('name')
			.trim()
			.isLength({ min: 5, max: 50 })
			.withMessage(getMessage('productFieldError.name')),
		body('description')
			.trim()
			.isLength({ min: 10, max: 200 })
			.withMessage(getMessage('productFieldError.description')),
		body('price')
			.trim()
			.isFloat({ gt: 0 })
			.withMessage(getMessage('productFieldError.price')),
		body('category')
			.isIn(Object.values(ProductCategory))
			.withMessage(getMessage('productFieldError.category')),
		body('subcategory')
			.trim()
			.isIn(Object.values(ProductSubCategory))
			.withMessage(getMessage('productFieldError.category')),
		body('quantity')
			.isInt({ gt: 0 })
			.withMessage(getMessage('productFieldError.quantity')),
	],
	addProduct
);

export default router;