import Transaction from "../../domain/Transaction";
import { Model, column, model } from "./ORM";

@model("cccat16", "transaction")
export default class TransactionModel extends Model {
	@column("transaction_id", "uuid", true)
	transactionId: string;
	@column("ride_id")
	rideId: string;
	@column("amount", "number")
	amount: number;
	@column("status")
	status: string;
	@column("date")
	date: Date;

	constructor (transctionId: string, rideId: string, amount: number, status: string, date: Date) {
		super();
		this.transactionId = transctionId;
		this.rideId = rideId;
		this.amount = amount;
		this.status = status;
		this.date = date;
	}

	getAggregate () {
		return new Transaction(this.transactionId, this.rideId, this.amount, this.status, this.date);
	}

	static getModelFromAggregate (transaction: Transaction) {
		return new TransactionModel(transaction.transactionId, transaction.rideId, transaction.amount, transaction.status, transaction.date);
	}
}
