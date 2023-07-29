import mongoose, { Schema } from 'mongoose';
import { OrderStatus } from '../util/enums';

const Order = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		totalAmount: { type: Number, required: true },
		status: {
			type: String,
			enum: OrderStatus,
			default: OrderStatus.PENDING,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Order', Order);
