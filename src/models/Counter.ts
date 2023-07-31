import mongoose, { Schema } from 'mongoose';
import { SchemaName } from '../constants/enums';

const Counter = new Schema(
	{
		lastUserId: { type: String, required: true, default: 0 },
		lastProductId: { type: String, required: true, default: 0 },
	},
	{ timestamps: true }
);

export default mongoose.model(SchemaName.COUNTER, Counter);
