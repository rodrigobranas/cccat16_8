import crypto from "crypto";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepository";
import Account from "../src/domain/Account";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";

// Integration Test

test("Deve salvar um registro na tabela account e consultar por id", async function () {
	const account = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "87748248800", "", true, false);
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	await accountRepository.saveAccount(account);
	const accountById = await accountRepository.getAccountById(account.accountId);
	expect(accountById.accountId).toBe(account.accountId);
	expect(accountById.name).toBe(account.name);
	expect(accountById.email).toBe(account.email);
	expect(accountById.cpf).toBe(account.cpf);
	await connection.close();
});

test("Deve salvar um registro na tabela account e consultar por email", async function () {
	const account = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "87748248800", "", true, false);
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	await accountRepository.saveAccount(account);
	const accountByEmail = await accountRepository.getAccountByEmail(account.email);
	expect(accountByEmail?.accountId).toBe(account.accountId);
	expect(accountByEmail?.name).toBe(account.name);
	expect(accountByEmail?.email).toBe(account.email);
	expect(accountByEmail?.cpf).toBe(account.cpf);
	await connection.close();
});
