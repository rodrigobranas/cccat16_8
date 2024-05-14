import Transaction from "../../domain/Transaction";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class ProcessPayment {

	constructor (readonly transactionRepository: TransactionRepository, readonly paymentGateway: PaymentGateway) {
	}
	
	async execute (input: Input): Promise<Output> {
		console.log("processPayment", input);
		const transaction = Transaction.create(input.rideId, input.amount);
		const inputPaymentGateway = {
			cardHolder: "Cliente Exemplo",
			creditCardNumber: "4012001037141112",
			expDate: "05/2027",
			cvv: "123",
			amount: input.amount
		}
		const outputPaymentGateway = await this.paymentGateway.createTransaction(inputPaymentGateway);
		if (outputPaymentGateway.status === "approved") {
			transaction.approve();
		} else {
			transaction.reject();
		}
		await this.transactionRepository.save(transaction);
		return {
			transactionId: transaction.transactionId
		}
	}
}

type Input = {
	rideId: string,
	amount: number
}

type Output = {
	transactionId: string
}
