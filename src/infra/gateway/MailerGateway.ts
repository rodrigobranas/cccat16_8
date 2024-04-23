export interface MailerGateway {
	send (recipient: string, subject: string, content: string): Promise<void>;
}

export class MailerGatewayMemory implements MailerGateway {

	async send(recipient: string, subject: string, content: string): Promise<void> {
		console.log(recipient, subject, content);
	}

}
