export default interface PaymentGateway {
	createTransaction(input: Input): Promise<Output>;
}

type Input = {
	creditCardNumber: string,
	cardHolder: string,
	expDate: string,
	cvv: string,
	amount: number
}

type Output = {
	tid: string,
	authorizationCode: string,
	status: string
}
