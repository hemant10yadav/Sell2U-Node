import mongoose, { Schema } from 'mongoose';
import { Role, SchemaName } from '../util/enums';

const User = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Role,
			default: Role.CUSTOMER,
		},
		cart: [{ type: Schema.Types.ObjectId, ref: SchemaName.PRODUCT }],
		orders: [{ type: Schema.Types.ObjectId, ref: SchemaName.ORDER }],
		address: [
			{
				street: { type: String, required: true },
				city: { type: String, required: true },
				country: { type: String, required: true },
			},
		],
		wishlist: [{ type: Schema.Types.ObjectId, ref: SchemaName.PRODUCT }],
	},
	{ timestamps: true }
);

User.set('toJSON', {
	transform(doc, ret) {
		delete ret.password;
		return ret;
	},
});

export default mongoose.model(SchemaName.USER, User);
