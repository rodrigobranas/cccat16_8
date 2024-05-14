import PaymentGateway from "../../application/gateway/PaymentGateway";
import axios from "axios";

export default class CieloGateway implements PaymentGateway {

	async createTransaction(input: { creditCardNumber: string; cardHolder: string; expDate: string; cvv: string; amount: number; }): Promise<{ tid: string; authorizationCode: string; status: string; }> {
		// ACL - Anti Corruption Layer
		let transaction = {
			"MerchantOrderId":"2014111701",
			"Customer":{
			   "Name":"Cliente Exemplo",
			   "Identity":"11225468954",
			   "IdentityType":"CPF",
			   "Email":"compradorteste@teste.com"
			},
			"Payment":{
			  "ServiceTaxAmount":0,
			  "Installments":1,
			  "Interest":"ByMerchant",
			  "Capture":true,
			  "SoftDescriptor":"123456789ABCD",
			  "CreditCard":{
				  "CardNumber": input.creditCardNumber,
				  "Holder": input.cardHolder,
				  "ExpirationDate": input.expDate,
				  "SecurityCode": input.cvv,
				  "SaveCard":"false",
				  "Brand":"Visa"
			  },     
			  "Type":"CreditCard",
			  "Amount":15700,
			}
		 }
		
		const request = {
			url: `https://apisandbox.cieloecommerce.cielo.com.br/1/sales/`,
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				MerchantId: "589147af-c933-4da7-8c8b-cc1446c16edf",
				MerchantKey: "DRSNJDGKQOMGQVJRWGEFGIPTGDHQYQOZHEDXFDAI",
				RequestId: "589147af-c933-4da7-8c8b-cc1446c16edf"
			},
			data: transaction
		}
		
		const output = (await axios(request)).data;
		// ACL - Anti Corruption Layer
		let status = "rejected";
		if (output.status === 2) {
			status = "approved";
		}
		return {
			tid: output.Tid,
			authorizationCode: output.AuthorizationCode,
			status 
		}
	}

}
