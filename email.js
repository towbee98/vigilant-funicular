const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("./config/env");
const pug = require("pug");
const { convert } = require("html-to-text");

const OAuth2 = google.auth.OAuth2;

class Email {
	constructor(from, to, data) {
		this.to = to;
		this.data = data;
		this.from = from;
	}
	newTransport() {
		// if (config.NODE_ENV === 'production') {

		// Gmail
		const oauth2Client = new OAuth2(
			config.CLIENT_ID,
			config.CLIENT_SECRET,
			config.REDIRECT_URI
		);

		oauth2Client.setCredentials({
			// eslint-disable-next-line camelcase
			refresh_token: config.REFRESH_TOKEN,
		});

		const accessToken = oauth2Client.getAccessToken((err, token) => {
			return err ? err : token;
		});

		return nodemailer.createTransport({
			service: config.MAIL_SERVICE,
			auth: {
				type: config.MAIL_AUTH_TYPE,
				user: config.EMAIL,
				clientId: config.CLIENT_ID,
				clientSecret: config.CLIENT_SECRET,
				refreshToken: config.REFRESH_TOKEN,
				accessToken,
			},
		});
		// }else{
		//   return nodemailer.createTransport({
		//     host:config.
		//   })
		// }
	}

	async send(template, subject) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const html = pug.renderFile(`view/${template}.pug`, {
			data: this.data,
			subject,
			childName: this.data.childName,
			childAge: this.data.childAge,
			message: this.data.message,
			parentName: this.data.parentName,
			parentEmail: this.data.parentEmail,
			parentPhone: this.data.parentPhone,
		});

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: convert(html, { wordwrap: 130 }),
		};

		await this.newTransport().sendMail(mailOptions);
	}
}

class RegisterStudent extends Email {
	constructor(from, to, data) {
		super(from, to, data);
	}
	async sendRegistrationDetails() {
		await this.send("Registration", "Student Enrollment");
	}
}

module.exports = { RegisterStudent };
