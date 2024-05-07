import ProcessPayment from "../../application/usecase/ProcessPayment";
import Queue from "./Queue";

export default class QueueController {

	constructor (queue: Queue, processPayment: ProcessPayment) {
		queue.consume("rideCompleted.processPayment", async (input: any) => {
			await processPayment.execute(input);
		});
	}
}
