const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	NODE_ENV: process.env.NODE_ENV,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	REDIRECT_URI: process.env.REDIRECT_URI,
	EMAIL: process.env.EMAIL,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN,
	MAIL_SERVICE: process.env.MAIL_SERVICE,
	MAIL_AUTH_TYPE: process.env.MAIL_AUTH_TYPE,
};
