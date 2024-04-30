// interface adapter

import { GetAccount } from "../../application/usecase/GetAccount";
import { Signup } from "../../application/usecase/Signup";
import HttpServer from "./HttpServer";

export default class AccountController {

	constructor (readonly httpServer: HttpServer, readonly signup: Signup, readonly getAccount: GetAccount) {
		httpServer.register("post", "/signup", async function (params: any, body: any) {
			const output = await signup.execute(body);
			return output;
		});

		httpServer.register("get", "/accounts/:{accountId}", async function (params: any, body: any) {
			const input = {
				accountId: params.accountId
			};
			const account = await getAccount.execute(input);
			return account;
		});
	}
}
