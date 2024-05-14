import ProcessPayment from "../src/application/usecase/ProcessPayment";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import crypto from "crypto";
import TransactionRepositoryDatabase from "../src/infra/repository/TransactionRepositoryDatabase";
import GetTransaction from "../src/application/usecase/GetTransaction";
import TransactionRepositoryORM from "../src/infra/repository/TransactionRepositoryORM";
import ORM from "../src/infra/orm/ORM";
import PJBankGateway from "../src/infra/gateway/PJBankGateway";
import CieloGateway from "../src/infra/gateway/CieloGateway";

test("Deve criar uma transação", async function () {
	const connection = new PgPromiseAdapter();
	// const transactionRepository = new TransactionRepositoryDatabase(connection);
	const orm = new ORM(connection);
	const transactionRepository = new TransactionRepositoryORM(orm);
	const processPayment = new ProcessPayment(transactionRepository, new PJBankGateway());
	const inputProcessPayment = {
		rideId: crypto.randomUUID(),
		amount: 100
	};
	const outputProcessPayment = await processPayment.execute(inputProcessPayment);
	const getTransaction = new GetTransaction(transactionRepository);
	const outputGetTransaction = await getTransaction.execute(outputProcessPayment.transactionId);
	expect(outputGetTransaction.amount).toBe(100);
	expect(outputGetTransaction.status).toBe("approved");
	await connection.close();
});