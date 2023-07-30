export default class EnvConstants {
	public static readonly DB_PASSWORD = 'hemant10';
	public static readonly DB_URI = `mongodb+srv://hemant10yadav:${this.DB_PASSWORD}@practice.woftxya.mongodb.net/?retryWrites=true&w=majority`;
	//public static DB_URI =
	// `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1`;
	public static readonly PASSWORD_ENCRYPTION_KEY = 'ThisIsMyFirstNodeJsProject';
	public static readonly TOKEN_EXPIRATION_TIME = '48h';

	// FILE_UPLOAD_SIZE_LIMIT_IN_BYTES = 1 MB.
	public static readonly FILE_UPLOAD_SIZE_LIMIT_IN_BYTES = 1048576;
	public static readonly MAX_FILES_TO_UPLOAD = 5;
}
