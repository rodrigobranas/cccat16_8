import { AccountRepository } from "../../infra/repository/AccountRepository"
import crypto from "crypto";
import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import DistanceCalculator from "../../domain/service/DistanceCalculator";

export default class GetRide {

	constructor (readonly accountRepository: AccountRepository, readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository) {
	}
	
	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		const passenger = await this.accountRepository.getAccountById(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountRepository.getAccountById(ride.driverId);
		}
		const positions = await this.positionRepository.listPositionByRideId(input.rideId);
		// const distance = DistanceCalculator.calculate(positions);
		return {
			rideId: ride.rideId,
			passengerId: ride.passengerId,
			fromLat: ride.getFromLat(),
			fromLong: ride.getFromLong(),
			toLat: ride.getToLat(),
			toLong: ride.getToLong(),
			status: ride.getStatus(),
			passengerName: passenger.getName(),
			passengerEmail: passenger.getEmail(),
			driverName: driver?.getName(),
			driverEmail: driver?.getEmail(),
			distance: ride.distance,
			fare: ride.fare
		}
	}
}

// DTO
type Input = {
	rideId: string
}

// DTO
type Output = {
	rideId: string,
	passengerId: string,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number,
	status: string,
	passengerName: string,
	passengerEmail: string,
	driverName?: string,
	driverEmail?: string,
	distance: number,
	fare: number
}
