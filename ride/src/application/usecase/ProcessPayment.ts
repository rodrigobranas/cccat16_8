export default class ProcessPayment {

	constructor () {
	}
	
	async execute (input: Input): Promise<void> {
		console.log("paymentApproved", input.rideId, input.amount);
	}
}

type Input = {
	rideId: string,
	amount: number
}