import HttpClient from "../http/HttpClient";

export default interface AccountGateway {
	signup (input: any): Promise<any>
}

export class AccountGatewayHttp implements AccountGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async signup (input: any) {
		const output = await this.httpClient.post("http://localhost:3002/signup", input);
		return output;
	}
}
