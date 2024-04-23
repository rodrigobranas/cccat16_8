// interface adapter

import pgp from "pg-promise";
import Ride from "../../domain/entity/Ride";
import Position from "../../domain/entity/Position";

export default interface PositionRepository {
	savePosition (position: Position): Promise<void>;
}

export class PositionRepositoryDatabase implements PositionRepository {

	async savePosition(position: Position): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into cccat16.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5)", [position.positionId, position.rideId, position.coord.getLat(), position.coord.getLong(), position.date]);
		await connection.$pool.end();
	}

}
