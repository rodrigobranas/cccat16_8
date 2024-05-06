export default interface AccountGateway {
	signup (input: any): Promise<OutputSignup>;
	getAccountById (accountId: string): Promise<any>;
}

export type OutputSignup = {
	accountId: string
}