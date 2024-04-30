export default interface PaymentGateway {
	processPayment (input: InputProcessPayment): Promise<void>;
}

type InputProcessPayment = {
	rideId: string,
	amount: number
}
