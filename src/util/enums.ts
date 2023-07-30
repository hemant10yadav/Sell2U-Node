import { ErrorCode } from 'multer';

export enum ProductCategory {
	ELECTRONICS = 'Electronics',
	FASHION_AND_APPAREL = 'Fashion and Apparel',
	HOME_AND_LIVING = 'Home and Living',
	BEAUTY_AND_PERSONAL_CARE = 'Beauty and Personal Care',
	SPORTS_AND_OUTDOORS = 'Sports and Outdoors',
	BOOKS_AND_MEDIA = 'Books and Media',
	TOYS_AND_GAMES = 'Toys and Games',
	HEALTH_AND_WELLNESS = 'Health and Wellness',
}

export enum ProductSubCategory {
	SMARTPHONE = 'Smartphone',
	LAPTOP = 'Laptop',
	TABLET = 'Tablet',
	CAMERA = 'Camera',
	AUDIO = 'Audio',
	MEN = "Men's",
	WOMEN = "Women's",
	KID = "Kid's",
	SHOE = 'Shoe',
	ACCESSORY = 'Accessory',
	DECOR = 'Decor',
	FURNITURE = 'Furniture',
	KITCHENWARE = 'Kitchenware',
	BEDDING = 'Bedding',
	APPLIANCE = 'Appliance',
	COSMETIC = 'Cosmetic',
	SKINCARE = 'Skincare',
	HAIRCARE = 'Haircare',
	GROOMING = 'Grooming',
	FRAGRANCE = 'Fragrance',
	EQUIPMENT = 'Equipment',
	FITNESS = 'Fitness',
	OUTDOOR = 'Outdoor',
	CAMPING = 'Camping',
	APPAREL = 'Apparel',
	BOOK = 'Book',
	EBOOK = 'E-book',
	MAGAZINE = 'Magazine',
	MUSIC = 'Music',
	MOVIE = 'Movie',
	TOY = 'Toy',
	BOARD_GAME = 'Board Game',
	PUZZLE = 'Puzzle',
	EDUCATIONAL = 'Educational',
	VIDEO_GAME = 'Video Game',
	VITAMIN = 'Vitamin',
	MONITOR = 'Monitor',
	NUTRITION = 'Nutrition',
	REMEDY = 'Remedy',
	CARE = 'Care',
}

export enum Role {
	ADMINISTRATOR = 'Administrator',
	CUSTOMER = 'Customer',
	SELLER = 'Seller',
}

export enum OrderStatus {
	PENDING = 'Pending',
	DELIVERED = 'Delivered',
	SHIPPED = 'Shipped',
}

export enum SchemaName {
	PRODUCT = 'Product',
	USER = 'User',
	SELLER = 'Seller',
	ORDER = 'Order',
}

export enum StatusCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
	SERVICE_UNAVAILABLE = 503,
}

export enum FileTypeError {
	LIMIT_PART_COUNT = 'LIMIT_PART_COUNT',
	LIMIT_FILE_SIZE = 'LIMIT_FILE_SIZE',
	LIMIT_FILE_COUNT = 'LIMIT_FILE_COUNT',
	LIMIT_FIELD_KEY = 'LIMIT_FIELD_KEY',
	LIMIT_FIELD_VALUE = 'LIMIT_FIELD_VALUE',
	LIMIT_FIELD_COUNT = 'LIMIT_FIELD_COUNT',
	LIMIT_UNEXPECTED_FILE = 'LIMIT_UNEXPECTED_FILE',
}

export enum FileType {
	JPEG = 'image/jpeg',
	PNG = 'image/png',
}
