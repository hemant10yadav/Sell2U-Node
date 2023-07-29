import { Request } from 'express';
import { ProductCategory, ProductSubCategory, Role } from './enums';
import { Schema } from 'mongoose';

export interface IUser {
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
}

export interface IAddress {
	street: string;
	city: string;
	country: string;
}

export interface IAuthRequest extends Request {
	userId: string;
	username: string;
}

export interface IError extends Error {
	statusCode?: number;

	data?: unknown;
}

export interface IProduct {
	name: string;
	description: string;
	price: number;
	discount?: number;
	brand?: string;
	category: ProductCategory;
	subcategory: ProductSubCategory;
	quantity: number;
	images?: string[];
	seller: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
