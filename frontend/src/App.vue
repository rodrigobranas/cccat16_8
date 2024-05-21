<script setup lang="ts">
	import { inject, ref } from 'vue';
	import AccountGateway from "./infra/gateway/AccountGateway";
	import SignupWizard from "./domain/SignupWizard";
	
	const signupWizard = ref(new SignupWizard());
	const accountId = ref("");
	const accountGateway: AccountGateway = inject("accountGateway")!;
	signupWizard.value.register("signupConfirmed", async (data: any) => {
		const output = await accountGateway.signup(data);
		signupWizard.value.messageSuccess = "Conta criada com sucesso!";
		accountId.value = output.accountId;
	});
</script>

<template>
	<span class="step" @click="signupWizard.setData()">Passo {{ signupWizard.step }}</span><br/>
	<span class="progress">{{ signupWizard.calculateProgress() }}%</span>
	<div v-if="signupWizard.step === 1">
		<input class="input-is-passenger" type="checkbox" v-model="signupWizard.isPassenger"/> Passenger
	</div>
	<div v-if="signupWizard.step === 2">
		<input class="input-name" type="text" v-model="signupWizard.name" placeholder="Name"/><br/>
		<input class="input-email" type="text" v-model="signupWizard.email" placeholder="Email"/><br/>
		<input class="input-cpf" type="text" v-model="signupWizard.cpf" placeholder="Cpf"/>
	</div>
	<div v-if="signupWizard.step === 3">
		<input class="input-password" type="password" v-model="signupWizard.password" placeholder="Password"/><br/>
		<input class="input-confirm-password" type="password" v-model="signupWizard.confirmPassword" placeholder="Confirm Password"/>
	</div>
	<button class="button-back" v-if="signupWizard.step !== 1" @click="signupWizard.back()">Anterior</button>
	<button class="button-next" v-if="signupWizard.step !== 3" @click="signupWizard.next()">Próximo</button>
	<button class="button-confirm" v-if="signupWizard.step === 3" @click="signupWizard.confirm()">Confirmar</button>
	<div class="message-success">{{ signupWizard.messageSuccess }}</div>
	<div class="message-error">{{ signupWizard.messageError }}</div>
	<div>{{ accountId }}</div>
</template>

<style>
</style>
