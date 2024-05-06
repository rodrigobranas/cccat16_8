import crypto from "crypto";
import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import DistanceCalculator from "../../domain/service/DistanceCalculator";
import AccountGateway from "../gateway/AccountGateway";

export default class GetRide {

	constructor (readonly rideRepository: RideRepository, readonly positionRepository: PositionRepository, readonly accountGateway: AccountGateway) {
	}
	
	async execute (input: Input): Promise<Output> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		const passenger = await this.accountGateway.getAccountById(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountGateway.getAccountById(ride.driverId);
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
			passengerName: passenger.name,
			passengerEmail: passenger.email,
			driverName: driver?.name,
			driverEmail: driver?.email,
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
