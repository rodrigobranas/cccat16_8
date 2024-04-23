// use case

import { AccountRepository } from "../../infra/repository/AccountRepository"
import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";
import PositionRepository from "../../infra/repository/PositionRepository";
import Position from "../../domain/entity/Position";
import DistanceCalculator from "../../domain/service/DistanceCalculator";

export default class UpdatePosition {

	constructor (readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository) {
	}
	
	async execute (input: Input): Promise<void> {
		const position = Position.create(input.rideId, input.lat, input.long);
		await this.positionRepository.savePosition(position);
	}
}

type Input = {
	rideId: string,
	lat: number,
	long: number
}
