import mongoose, { Schema } from 'mongoose';
import {
	ProductSubCategory,
	ProductCategory,
	SchemaName,
} from '../constants/enums';
import { RESOURCE_BASE_URL } from '../middleware/configMiddleware';

const Product = new Schema(
	{
		productId: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		discount: { type: Number, required: false },
		brand: { type: String },
		category: {
			type: String,
			enum: ProductCategory,
			required: true,
		},
		subcategory: {
			type: String,
			enum: ProductSubCategory,
			required: true,
		},
		quantity: { type: Number, required: true },
		images: [{ type: String }],
		user: {
			type: Schema.Types.ObjectId,
			ref: SchemaName.USER,
			required: true,
		},
	},
	{ timestamps: true }
);

Product.set('toJSON', {
	transform(doc, ret) {
		const baseUrl = RESOURCE_BASE_URL;
		if (baseUrl && ret.images) {
			ret.images = ret.images.map((imageFileName: any) => {
				return `${baseUrl}/${imageFileName}`;
			});
		}
		return ret;
	},
});
export default mongoose.model(SchemaName.PRODUCT, Product);
