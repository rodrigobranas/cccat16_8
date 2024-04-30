import axios from "axios";
import PaymentGateway from "../../application/gateway/PaymentGateway";

export default class PaymentGatewayHttp implements PaymentGateway {

	async processPayment(input: { rideId: string; amount: number; }): Promise<void> {
		await axios.post("http://localhost:3001/process_payment", input);
	}

}
