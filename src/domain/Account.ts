// entity

import { validate } from "./validateCpf";
import crypto from "crypto";

export default class Account {

	private constructor (readonly accountId: string, readonly name: string, readonly email: string, readonly cpf: string, readonly carPlate: string, readonly isPassenger: boolean, readonly isDriver: boolean) {
		if (!this.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
		if (!this.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
		if (!validate(this.cpf)) throw new Error("Invalid cpf");
		if (this.isDriver && this.carPlate && !this.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate");
	}

	static create (name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
		const accountId = crypto.randomUUID();
		return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver);
	}

	static restore (accountId: string, name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean, isDriver: boolean) {
		return new Account(accountId, name, email, cpf, carPlate, isPassenger, isDriver);
	}
}