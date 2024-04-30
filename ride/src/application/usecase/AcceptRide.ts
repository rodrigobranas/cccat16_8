// use case

import { AccountRepository } from "../../infra/repository/AccountRepository"
import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";

export default class AcceptRide {

	constructor (readonly accountRepository: AccountRepository, readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input): Promise<void> {
		const account = await this.accountRepository.getAccountById(input.driverId); // Leitura
		if (!account.isDriver) throw new Error("Account is not from a driver");
		const ride = await this.rideRepository.getRideById(input.rideId); // Leitura
		ride.accept(input.driverId); // Mutação
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string,
	driverId: string
}
