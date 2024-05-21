import { mount } from "@vue/test-utils";
import App from "../src/App.vue";
import AccountGateway, { AccountGatewayHttp } from "../src/infra/gateway/AccountGateway";
import { AxiosAdapter } from "../src/infra/http/HttpClient";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(function () {
			resolve(true);
		}, time);
	});
}

let wrapper: any;

beforeEach(() => {
	const httpClient = new AxiosAdapter();
	const accountGateway = new AccountGatewayHttp(httpClient);
	// const accountGateway: AccountGateway = {
	// 	async signup (input: any): Promise<any> {
	// 		return {
	// 			accountId: "123456"
	// 		}
	// 	}
	// };
	wrapper = mount(App, {
		global: {
			provide: {
				accountGateway
			}
		}
	});
});

test("Deve criar uma conta de passageiro por meio do wizard", async function () {
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	expect(wrapper.get(".progress").text()).toBe("0%");
	await wrapper.get(".input-is-passenger").setValue(true);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirm-password").exists()).toBe(false);
	expect(wrapper.find(".button-confirm").exists()).toBe(false);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	expect(wrapper.get(".progress").text()).toBe("30%");
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-password").exists()).toBe(false);
	expect(wrapper.find(".input-confirm-password").exists()).toBe(false);
	expect(wrapper.find(".button-confirm").exists()).toBe(false);
	await wrapper.get(".input-name").setValue("John Doe");
	expect(wrapper.get(".progress").text()).toBe("45%");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	expect(wrapper.get(".progress").text()).toBe("60%");
	await wrapper.get(".input-cpf").setValue("97456321558");
	expect(wrapper.get(".progress").text()).toBe("75%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	expect(wrapper.find(".input-is-passenger").exists()).toBe(false);
	expect(wrapper.find(".input-name").exists()).toBe(false);
	expect(wrapper.find(".input-email").exists()).toBe(false);
	expect(wrapper.find(".input-cpf").exists()).toBe(false);
	expect(wrapper.find(".button-next").exists()).toBe(false);
	await wrapper.get(".input-password").setValue("123456");
	await wrapper.get(".input-confirm-password").setValue("123456");
	expect(wrapper.get(".progress").text()).toBe("100%");
	await wrapper.get(".button-confirm").trigger("click");
	await sleep(200);
	expect(wrapper.get(".message-success").text()).toBe("Conta criada com sucesso!");
});

test("Deve poder voltar aos passos anteriores", async function () {
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	await wrapper.get(".input-is-passenger").setValue(true);
	expect(wrapper.find(".button-back").exists()).toBe(false);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".button-back").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	await wrapper.get(".input-cpf").setValue("97456321558");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	await wrapper.get(".button-back").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	expect(wrapper.find(".button-next").exists()).toBe(false);
});

test("Não deve seguir para o passo 2 caso o tipo de conta não tenha sido selecionado", async function () {
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	expect(wrapper.get(".progress").text()).toBe("0%");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".message-error").text()).toBe("Selecione o tipo de conta");
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	expect(wrapper.get(".message-error").text()).toBe("");
});

test("Não deve seguir para o passo 3 se o nome, email e cpf não forem digitados", async function () {
	expect(wrapper.get(".step").text()).toBe("Passo 1");
	expect(wrapper.get(".progress").text()).toBe("0%");
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".message-error").text()).toBe("Digite o nome");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	expect(wrapper.get(".message-error").text()).toBe("Digite o email");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 2");
	expect(wrapper.get(".message-error").text()).toBe("Digite o cpf");
	await wrapper.get(".input-cpf").setValue("97456321558");
	await wrapper.get(".button-next").trigger("click");
	expect(wrapper.get(".step").text()).toBe("Passo 3");
	expect(wrapper.get(".message-error").text()).toBe("");
});

test("Não deve confirmar se a senha e a confirmação de senha não forem feitas e não forem iguais", async function () {
	await wrapper.get(".input-is-passenger").setValue(true);
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".input-name").setValue("John Doe");
	await wrapper.get(".input-email").setValue(`john.doe${Math.random()}@gmail.com`);
	await wrapper.get(".input-cpf").setValue("97456321558");
	await wrapper.get(".button-next").trigger("click");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".message-error").text()).toBe("Digite a senha");
	await wrapper.get(".input-password").setValue("123456");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".message-error").text()).toBe("Digite a confirmação da senha");
	await wrapper.get(".input-confirm-password").setValue("123");
	await wrapper.get(".button-confirm").trigger("click");
	expect(wrapper.get(".message-error").text()).toBe("A senha e a confirmação da senha devem ser iguais");
});
