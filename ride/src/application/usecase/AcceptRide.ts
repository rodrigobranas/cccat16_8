import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";
import AccountGateway from "../gateway/AccountGateway";

export default class AcceptRide {

	constructor (readonly rideRepository: RideRepository, readonly accountGateway: AccountGateway) {
	}
	
	async execute (input: Input): Promise<void> {
		const account = await this.accountGateway.getAccountById(input.driverId); // Leitura
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
