import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import Position from "../../domain/entity/Position";
import PaymentGateway from "../gateway/PaymentGateway";
import Registry, { inject } from "../../infra/di/Registry";

export default class FinishRide {
	@inject("rideRepository")
	readonly rideRepository!: RideRepository;
	@inject("paymentGateway")
	readonly paymentGateway!: PaymentGateway;

	constructor () {
	}
	
	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.finish();
		await this.rideRepository.updateRide(ride);
		await this.paymentGateway.processPayment({ rideId: ride.rideId, amount: ride.fare });
	}
}

type Input = {
	rideId: string
}
