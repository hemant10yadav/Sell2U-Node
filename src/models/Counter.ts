import mongoose, { Schema } from 'mongoose';
import { SchemaName } from '../constants/enums';

const Counter = new Schema(
	{
		lastUserId: { type: Number, required: true, default: 0 },
		lastProductId: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true }
);

export default mongoose.model(SchemaName.COUNTER, Counter);
