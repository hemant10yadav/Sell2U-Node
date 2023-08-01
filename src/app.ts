import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import EnvConstants from './constants/envConstants';
import authRoute from './routes/authRoute';
import Paths from './constants/paths';
import isCurrentUserValid from './middleware/isCurrentUserValid';
import cors from 'cors';
import usersRoute from './routes/usersRoute';
import { StatusCode } from './constants/enums';
import productsRoute from './routes/productsRoute';
import multer from 'multer';
import logger, { getRootPath } from './config/appUtil';
import { setBaseUrlMiddleware } from './middleware/configMiddleware';

const app = express();

// Allow Cross platform request
app.use(cors());

app.use(bodyParser.json());

app.use(setBaseUrlMiddleware);
// Set up middleware to serve static files from the 'public' directory
app.use(Paths.RESOURCES, express.static(getRootPath(Paths.RESOURCE_DIR)));

app.use(Paths.Products, productsRoute);

app.use(Paths.AUTH, authRoute);

app.use(Paths.USERS, isCurrentUserValid, usersRoute);

// Handle all the errors.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof multer.MulterError) {
		logger.error('INSTANCE OF multer.MulterError ');
	}
	logger.error(err);
	const error = {
		status: err?.statusCode | StatusCode.INTERNAL_SERVER_ERROR,
		error: err?.data,
		message: err?.statusCode ? err?.message : 'Something went wrong',
	};
	res.status(error.status).json(error);
});

// Connection to the mongo DB
mongoose
	.connect(EnvConstants.DB_URI)
	.then(() => {
		logger.info(`Db connection is done successfully starting the server.`);
		app.listen(3031);
	})
	.catch((err) => {
		logger.error(`Error while connecting DB: ===> ${err?.message}`);
	});
