import amqp from "amqplib";
import pgp from "pg-promise";

async function main () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	channel.consume("rideRequested.buildGetRideProjection", async function (msg: any) {
		const input = JSON.parse(msg.content.toString());
		console.log("creating projection", input);
		const database = pgp()("postgres://postgres:123456@localhost:5432/app");
		await database.query("insert into cccat16.ride_projection (ride_id, passenger_id, status, passenger_name, passenger_email, driver_name, driver_email) values ($1, $2, $3, $4, $5, $6, $7)", [input.rideId, input.passengerId, input.status, input.passengerName, input.passengerEmail, "", ""]);
		channel.ack(msg);
	})
}
main();