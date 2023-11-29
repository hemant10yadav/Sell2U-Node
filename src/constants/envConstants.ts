export default class EnvConstants {
	public static readonly DB_PASSWORD = 'hemant10';
	public static readonly DB_URI = `mongodb+srv://hemant10yadav:${this.DB_PASSWORD}@practice.woftxya.mongodb.net/test`;
	//public static DB_URI =
	// `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1`;
	public static readonly PASSWORD_ENCRYPTION_KEY = 'ThisIsMyFirstNodeJsProject';
	public static readonly EMAIL_ENCRYPTION_KEY = '_Are_Y_o_u.KiDing_';
	public static readonly RESET_PASSWORD_ENCRYPTION_KEY =
		'Guy_who_called_himself_a_software_developer';
	public static readonly RESET_TOKEN_EXPIRATION_TIME = '1h';
	public static readonly TOKEN_EXPIRATION_TIME = '48h';

	// FILE_UPLOAD_SIZE_LIMIT_IN_BYTES = 1 MB.
	public static readonly FILE_UPLOAD_SIZE_LIMIT_IN_BYTES = 1048576;
	public static readonly MAX_FILES_TO_UPLOAD = 5;

	public static readonly SMTP_PASS = 'zdxhhrbzqdrqxjpl';
	public static readonly SMTP_USER = 'hy723207@gmail.com';
	public static readonly SMTP_SERVER = 'gmail';
}
