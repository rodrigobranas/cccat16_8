// interface adapter

import pgp from "pg-promise";
import Ride from "../../domain/entity/Ride";
import Position from "../../domain/entity/Position";

export default interface RideRepository {
	saveRide (ride: Ride): Promise<void>;
	hasActiveRideByPassengerId (passengerId: string): Promise<boolean>;
	getRideById (rideId: string): Promise<Ride>;
	updateRide (ride: Ride): Promise<void>;
}

export class RideRepositoryDatabase implements RideRepository {

	async saveRide(ride: Ride): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into cccat16.ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, date) values ($1, $2, $3, $4, $5, $6, $7, $8)", [ride.rideId, ride.passengerId, ride.getFromLat(), ride.getFromLong(), ride.getToLat(), ride.getToLong(), ride.getStatus(), ride.date]);
		await connection.$pool.end();
	}

	async getRideById(rideId: any): Promise<Ride> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [rideData] = await connection.query("select * from cccat16.ride where ride_id = $1", [rideId]);
		// const positionsData = await connection.query("select * from cccat16.position where ride_id = $1", [rideId]);
		await connection.$pool.end();
		const ride = Ride.restore(rideData.ride_id, rideData.passenger_id, rideData.driver_id, parseFloat(rideData.from_lat), parseFloat(rideData.from_long), parseFloat(rideData.to_lat), parseFloat(rideData.to_long), rideData.status, rideData.date);
		// const positions = [];
		// for (const positionData of positionsData) {
		// 	positions.push(Position.restore(positionData.position_id, parseFloat(positionData.lat), parseFloat(positionData.long), positionData.date));
		// }
		// ride.positions = positions;
		return ride;
	}

	async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [rideData] = await connection.query("select * from cccat16.ride where passenger_id = $1 and status <> 'completed'", [passengerId]);
		await connection.$pool.end();
		return !!rideData;
	}

	async updateRide(ride: Ride): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("update cccat16.ride set status = $1, driver_id = $2 where ride_id = $3", [ride.getStatus(), ride.driverId, ride.rideId]);
		await connection.$pool.end();
	}

}
