import ProcessPayment from "./application/usecase/ProcessPayment";
import { ExpressAdapter } from "./infra/http/HttpServer";
import PaymentController from "./infra/http/PaymentController";
import { RabbitMQAdapter } from "./infra/queue/Queue";
import QueueController from "./infra/queue/QueueController";

async function main () {
	const httpServer = new ExpressAdapter();
	const processPayment = new ProcessPayment();
	new PaymentController(httpServer, processPayment);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, processPayment);
	httpServer.listen(3001);
}
main();
