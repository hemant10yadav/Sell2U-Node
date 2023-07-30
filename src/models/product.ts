import mongoose, { Schema } from 'mongoose';
import { ProductSubCategory, ProductCategory, SchemaName } from '../util/enums';

const Product = new Schema(
	{
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
		// seller: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: SchemaName.SELLER,
		// 	required: true,
		// },
	},
	{ timestamps: true }
);

export default mongoose.model(SchemaName.PRODUCT, Product);
