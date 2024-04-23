import { AccountRepository } from "../../infra/repository/AccountRepository"
import crypto from "crypto";
import RideRepository from "../../infra/repository/RideRepository";

export default class GetRide {

	constructor (readonly accountRepository: AccountRepository, readonly rideRepository: RideRepository) {
	}
	
	async execute (input: Input): Promise<Output> {
		// Query Model (Consulta)

		// select r.*, p.name as passenger_name, p.email as passenger_email, d.name as driver_name, d.email as driver_email from cccat16.ride r join cccat16.account pon (r.passenger_id = p.account_id) left join cccat16.account d on (r.driver_id = d.account_id) where ride_id = $1

		// Command Model
		const ride = await this.rideRepository.getRideById(input.rideId);
		const passenger = await this.accountRepository.getAccountById(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountRepository.getAccountById(ride.driverId);
		}
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
			driverEmail: driver?.getEmail()
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
	driverEmail?: string
}
