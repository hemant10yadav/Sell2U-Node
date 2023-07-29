import mongoose from 'mongoose';
import { SchemaName } from '../util/enums';

const Schema = mongoose.Schema;

const Seller = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
});

export default mongoose.model(SchemaName.SELLER, Seller);
