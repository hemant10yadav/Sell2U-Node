import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transport = nodemailer.createTransport({
	host: 'sandbox.smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '63aafdf1b33d38',
		pass: '70562f74d57967',
	},
});

export default function sendMai(mailBody: Mail.Options) {
	transport.sendMail(mailBody, (err) => {});
}
