import { IEmailAgent, IMessage } from "./IEmailAgent";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export class EmailAgent implements IEmailAgent {
	private transporter: Mail;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS
			}
		});
	}
	
	async sendMail(message: IMessage): Promise<void> {
		await this.transporter.sendMail({
			to: {
				name: message.to.name,
				address: message.to.email
			},
			from: {
				name: message.from.name,
				address: message.from.email
			},
			subject: message.subject,
			html: message.body
		});
	}
}