import { OrderStatus } from './enums';

export interface IRestOrder {
	orderedProducts: { productIdOrId: string; quantity: number }[];
	status: OrderStatus;
}
