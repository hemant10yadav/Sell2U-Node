import express, { Request, Response, NextFunction, Errback } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import EnvConstants from './util/envConstants';
import authRoute from './routes/authRoute';
import Paths from './util/paths';
import logger from './util/logger';
import isAuthenticatedReq from './middleware/isAuthenticatedReq';
import cors from 'cors';

const app = express();

// Allow Cross platform request
app.use(cors());

app.use(bodyParser.json());

app.use(Paths.AUTH, authRoute);
app.use(
	'/user',
	isAuthenticatedReq,
	(req: express.Request, res: Response, next: NextFunction) => {
		return res.status(200).json({ auth: true });
	}
);

app.use((err: any, req: express.Request, res: Response, next: NextFunction) => {
	const error = {
		status: err?.statusCode | 500,
		error: err?.data,
		message: err?.message,
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
		logger.error(`Error while connecting DB: ===> ${err.message}`);
	});
