import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/Transaction";
import DatabaseConnection from "../database/DatabaseConnection";

export default class TransactionRepositoryDatabase implements TransactionRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async save(transaction: Transaction): Promise<void> {
		await this.connection.query("insert into cccat16.transaction (transaction_id, ride_id, amount, status, date) values ($1, $2, $3, $4, $5)", [transaction.transactionId, transaction.rideId, transaction.amount, transaction.status, transaction.date]);
	}
	
	async get(transactionId: string): Promise<Transaction> {
		const [transactionData] = await this.connection.query("select * from cccat16.transaction where transaction_id = $1", [transactionId]);
		return new Transaction(transactionData.transaction_id, transactionData.ride_id, parseFloat(transactionData.amount), transactionData.status, transactionData.date);
	}

}
