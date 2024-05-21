import SignupWizard from "../src/domain/SignupWizard";

test("Deve criar uma conta de passageiro por meio do wizard", async function () {
	const signupWizard = new SignupWizard();
	signupWizard.register("signupConfirmed", function (data: any) {
		expect(data.name).toBe("John Doe");
	});
	expect(signupWizard.step).toBe(1);
	expect(signupWizard.calculateProgress()).toBe(0);
	signupWizard.isPassenger = true;
	signupWizard.next();
	expect(signupWizard.step).toBe(2);
	expect(signupWizard.calculateProgress()).toBe(30);
	signupWizard.name = "John Doe";
	expect(signupWizard.calculateProgress()).toBe(45);
	signupWizard.email = `john.doe${Math.random()}@gmail.com`;
	expect(signupWizard.calculateProgress()).toBe(60);
	signupWizard.cpf = "97456321558";
	expect(signupWizard.calculateProgress()).toBe(75);
	signupWizard.next();
	expect(signupWizard.step).toBe(3);
	signupWizard.password = "123456";
	signupWizard.confirmPassword = "123456";
	expect(signupWizard.calculateProgress()).toBe(100);
	signupWizard.confirm();
});
