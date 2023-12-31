import mongoose, { Schema } from 'mongoose';
import { Role, SchemaName } from '../constants/enums';

const User = new Schema(
	{
		userId: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		emailVerificationToken: { type: String },
		role: {
			type: String,
			enum: Role,
			default: Role.CUSTOMER,
		},
		cart: [{ type: Schema.Types.ObjectId, ref: SchemaName.PRODUCT }],
		orders: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: SchemaName.ORDER,
				},
			],
			sparse: true,
		},
		wishlist: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: SchemaName.PRODUCT,
				},
			],
			sparse: true,
		},
		address: [
			{
				street: { type: String },
				city: { type: String },
				country: { type: String },
			},
		],
		products: [{ type: Schema.Types.ObjectId, ref: SchemaName.PRODUCT }],
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
