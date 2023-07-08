export default class EnvConstants {
	public static DB_PASSWORD = 'hemant10';
	public static DB_URI = `mongodb+srv://hemant10yadav:${this.DB_PASSWORD}@practice.woftxya.mongodb.net/?retryWrites=true&w=majority`;
	//public static DB_URI =
	// `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1`;
	public static PASSWORD_ENCRYPTION_KEY =
		'ThisIsMyFirstNodeJsProject';
}
