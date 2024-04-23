// use case

import { AccountRepository } from "../../infra/repository/AccountRepository"
import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";

export default class StartRide {

	constructor (readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.start();
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string
}
