import amqp from "amqplib";

export default interface Queue {
	connect (): Promise<void>;
	publish (exchangeName: string, data: any): Promise<void>;
	consume(queueName: string, callback: Function): Promise<void>;
}

export class RabbitMQAdapter implements Queue {
	connection: any;


	async connect(): Promise<void> {
		this.connection = await amqp.connect("amqp://localhost");
	}

	async publish(exchangeName: string, data: any): Promise<void> {
		const channel = await this.connection.createChannel();
		await channel.publish(exchangeName, "", Buffer.from(JSON.stringify(data)));
	}

	async consume(queueName: string, callback: Function): Promise<void> {
		const channel = await this.connection.createChannel();
		channel.consume(queueName, async (msg: any) => {
			const input = JSON.parse(msg.content.toString());
			await callback(input);
			await channel.ack(msg);
		});
	}

}
