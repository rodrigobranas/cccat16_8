import DatabaseConnection from "../../infra/database/DatabaseConnection";

// Vou direto no banco, Query Model
export default class GetRideQuery {

	constructor (readonly connection: DatabaseConnection) {
	}

	async execute (rideId: string) {
		const [ride] = await this.connection.query("select r.*, p.name as passenger_name, p.email as passenger_email, d.name as driver_name, d.email as driver_email from cccat16.ride r join cccat16.account p on (r.passenger_id = p.account_id) left join cccat16.account d on (r.driver_id = d.account_id) where ride_id = $1", [rideId]);
		console.log(ride);
		return {
			rideId: ride.ride_id,
			passengerName: ride.passenger_name,
			passengerEmail: ride.passenger_email,
			driverName: ride.driver_name,
			driverEmail: ride.driver_email,
			status: ride.status
		};
	}
}
