import multer, { MulterError } from 'multer';
import { Request } from 'express';
import { FileType, FileTypeError } from '../constants/enums';
import EnvConstants from '../constants/envConstants';
import { getMessage, getRootPath } from './appUtil';

const storage = multer.diskStorage({
	destination(_req, _file, cb) {
		const destinationPath = getRootPath('public', 'resources'); // Ensure
		// 'uploads'
		// folder in the
		// same directory as the script
		cb(null, destinationPath);
	},
	filename(_req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage,
	limits: {
		fileSize: EnvConstants.FILE_UPLOAD_SIZE_LIMIT_IN_BYTES, // 1MB (Max file size in bytes)
		files: EnvConstants.MAX_FILES_TO_UPLOAD, // Max number of files in a single request
	},
	fileFilter(
		req: Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	): void {
		if (
			![FileType.PNG.toString(), FileType.JPEG.toString()].includes(
				file?.mimetype
			)
		) {
			cb(
				getMulterError(
					FileTypeError.LIMIT_UNEXPECTED_FILE,
					getMessage('error.wrongFileType'),
					file.originalname
				)
			);
		}
		if (file?.size > EnvConstants.FILE_UPLOAD_SIZE_LIMIT_IN_BYTES) {
			return cb(
				getMulterError(
					FileTypeError.LIMIT_FILE_SIZE,
					getMessage('error.fileSizeExceeded'),
					file.filename
				)
			);
		}
		cb(null, true);
	},
});

const getMulterError = (
	status: FileTypeError,
	message: string,
	fileName?: string
): MulterError => {
	const error = new MulterError(status, fileName);
	error.message = message;
	return error;
};

export default upload;
