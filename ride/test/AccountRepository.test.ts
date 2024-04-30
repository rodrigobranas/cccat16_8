import crypto from "crypto";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepository";
import Account from "../src/domain/entity/Account";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";

// Integration Test

test("Deve salvar um registro na tabela account e consultar por id", async function () {
	const account = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "87748248800", "", true, false);
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	await accountRepository.saveAccount(account);
	const accountById = await accountRepository.getAccountById(account.accountId);
	expect(accountById.accountId).toBe(account.accountId);
	expect(accountById.getName()).toBe(account.getName());
	expect(accountById.getEmail()).toBe(account.getEmail());
	expect(accountById.getCpf()).toBe(account.getCpf());
	await connection.close();
});

test("Deve salvar um registro na tabela account e consultar por email", async function () {
	const account = Account.create("John Doe", `john.doe${Math.random()}@gmail.com`, "87748248800", "", true, false);
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	await accountRepository.saveAccount(account);
	const accountByEmail = await accountRepository.getAccountByEmail(account.getEmail());
	expect(accountByEmail?.accountId).toBe(account.accountId);
	expect(accountByEmail?.getName()).toBe(account.getName());
	expect(accountByEmail?.getEmail()).toBe(account.getEmail());
	expect(accountByEmail?.getCpf()).toBe(account.getCpf());
	await connection.close();
});
