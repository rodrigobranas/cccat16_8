import Transaction from "../../domain/Transaction";
import TransactionRepository from "../repository/TransactionRepository";

export default class GetTransaction {

	constructor (readonly transactionRepository: TransactionRepository) {
	}
	
	async execute (transactionId: string): Promise<Output> {
		const transaction = await this.transactionRepository.get(transactionId);
		return transaction;
	}
}

type Output = {
	transactionId: string,
	rideId: string,
	amount: number,
	status: string,
	date: Date
}
