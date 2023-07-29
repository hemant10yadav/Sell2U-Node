import express, { Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import EnvConstants from './util/envConstants';
import authRoute from './routes/authRoute';
import Paths from './util/paths';
import logger from './util/logger';
import isAuthenticatedReq from './middleware/isAuthenticatedReq';
import cors from 'cors';
import usersRoute from './routes/usersRoute';
import { StatusCode } from './util/enums';

const app = express();

// Allow Cross platform request
app.use(cors());

app.use(bodyParser.json());

app.use(Paths.AUTH, authRoute);
app.use(Paths.USERS, isAuthenticatedReq, usersRoute);

// Handle all the errors.
app.use((err: any, req: express.Request, res: Response, next: NextFunction) => {
	logger.error(err?.message);
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
