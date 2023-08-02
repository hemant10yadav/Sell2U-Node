import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import logger, { getMessage } from '../config/appUtil';
import EnvConstants from '../constants/envConstants';

const transporter = nodemailer.createTransport({
	service: EnvConstants.SMTP_SERVER,
	auth: {
		user: EnvConstants.SMTP_USER,
		pass: EnvConstants.SMTP_PASS,
	},
});

export default function sendMail(to: string, subject: string, body: string) {
	const mailOptions: Mail.Options = {
		to,
		subject,
		from: getMessage('email.from'),
		html: generateEmailTemplate(body),
	};
	transporter.sendMail(mailOptions).then(
		(info) => {
			logger.info(`Email was sent to email id: ${mailOptions.to}`);
		},
		(error) => {
			logger.warn(
				`Error while sending email to ${mailOptions.to} cause:=>  ${error.message} `
			);
		}
	);
}

function generateEmailTemplate(message: string) {
	const emailTemp = getMessage('email.body');
	return emailTemp.replace('{bodyInfo}', message);
}