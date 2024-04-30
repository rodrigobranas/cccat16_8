// use case
import { AccountRepository } from "../../infra/repository/AccountRepository";

export class GetAccount {

	constructor (readonly accountRepository: AccountRepository) {
	}

	async execute (input: any): Promise<Output> {
		const account = await this.accountRepository.getAccountById(input.accountId);
		return {
			accountId: account.accountId,
			name: account.getName(),
			email: account.getEmail(),
			cpf: account.getCpf(),
			carPlate: account.getCarPlate(),
			isPassenger: account.isPassenger,
			isDriver: account.isDriver
		};
	}
}

// DTO - Data Transfer Object
type Output = {
	accountId: string;
	name: string;
	email: string;
	cpf: string;
	carPlate: string;
	isPassenger: boolean;
	isDriver: boolean;
}