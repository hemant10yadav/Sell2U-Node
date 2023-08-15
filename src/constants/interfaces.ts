import { ProductCategory, ProductSubCategory, Role } from './enums';
import { Schema } from 'mongoose';

export interface IUser {
	userId: number;
	firstName: string;
	_id: Schema.Types.ObjectId;
	lastName: string;
	username: string;
	email: string;
	password: string;
	role: Role;
	cart: Schema.Types.ObjectId[];
	orders: Schema.Types.ObjectId[];
	address: IAddress[];
	wishlist: Schema.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
	verified: boolean;
	emailVerificationToken: string;
}

export interface IAddress {
	street: string;
	city: string;
	country: string;
}

export interface IError extends Error {
	statusCode?: number;

	data?: unknown;
}

export interface IProduct {
	_id: Schema.Types.ObjectId;
	productId: number;
	name: string;
	description: string;
	price: number;
	discount?: number;
	brand?: string;
	category: ProductCategory;
	subcategory: ProductSubCategory;
	quantity: number;
	images?: string[];
	user: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export interface IToJsonOptions {
	resourceBaseUrl?: string;
}