import Observable from "../infra/observer/Observable";

export default class SignupWizard extends Observable {
	step = 1;
	isPassenger = false;
	name = "";
	email = "";
	cpf = "";
	password = "";
	confirmPassword = "";
	messageSuccess = "";
	messageError = "";
	accountId = "";

	constructor () {
		super();
	}

	back () {
		this.step--;
	}
	
	next () {
		if (this.validate()) {
			this.step++;
		}
	}

	calculateProgress () {
		let progress = 0;
		if (this.isPassenger) {
			progress += 30;
		}
		if (this.name) {
			progress += 15;
		}
		if (this.email) {
			progress += 15;
		}
		if (this.cpf) {
			progress += 15;
		}
		if (this.password && this.confirmPassword) {
			progress += 25;
		}
		return progress;
	}

	validate () {
		this.messageError = "";
		if (this.step === 1 && !this.isPassenger) {
			this.messageError = "Selecione o tipo de conta";
			return false;
		}
		if (this.step === 2 && !this.name) {
			this.messageError = "Digite o nome";
			return false;
		}
		if (this.step === 2 && !this.email) {
			this.messageError = "Digite o email";
			return false;
		}
		if (this.step === 2 && !this.cpf) {
			this.messageError = "Digite o cpf";
			return false;
		}
		if (this.step === 3 && !this.password) {
			this.messageError = "Digite a senha";
			return false;
		}
		if (this.step === 3 && !this.confirmPassword) {
			this.messageError = "Digite a confirmação da senha";
			return false;
		}
		if (this.step === 3 && (this.password !== this.confirmPassword)) {
			this.messageError = "A senha e a confirmação da senha devem ser iguais";
			return false;
		}
		return true;
	}

	confirm () {
		if (!this.validate()) return;
		const data = {
			isPassenger: this.isPassenger,
			name: this.name,
			email: this.email,
			cpf: this.cpf,
			password: this.password,
			confirmPassword: this.confirmPassword
		};
		this.notify("signupConfirmed", data);
	}

	setData () {
		this.isPassenger = true;
		this.name = "John Doe";
		this.email = `john.doe${Math.random()}@gmail.com`;
		this.cpf = "97456321558";
		this.password = "123456";
		this.confirmPassword = "123456";
	}

	isNextVisible () {
		return this.step !== 3;
	}

	isBackVisible () {
		return this.step !== 1;
	}
}
