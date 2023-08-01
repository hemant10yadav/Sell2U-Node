import mongoose, { Schema } from 'mongoose';
import { OrderStatus, SchemaName } from '../constants/enums';
import Product from './Product';

const Order = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: SchemaName.USER, required: true },
		products: [
			{
				product: {
					type: Product,
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		status: {
			type: String,
			enum: OrderStatus,
			default: OrderStatus.ACCEPTED,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Order', Order);
