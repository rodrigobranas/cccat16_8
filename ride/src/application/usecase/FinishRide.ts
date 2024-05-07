import RideRepository from "../../infra/repository/RideRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import Position from "../../domain/entity/Position";
import PaymentGateway from "../gateway/PaymentGateway";
import Registry, { inject } from "../../infra/di/Registry";
import ProcessPayment from "./ProcessPayment";
import Mediator from "../../infra/mediator/Mediator";
import DomainEvent from "../../domain/event/DomainEvent";
import Queue from "../../infra/queue/Queue";

export default class FinishRide {
	@inject("rideRepository")
	readonly rideRepository!: RideRepository;
	@inject("paymentGateway")
	readonly paymentGateway!: PaymentGateway;
	@inject("mediator")
	readonly mediator!: Mediator;
	@inject("queue")
	readonly queue!: Queue;

	constructor () {
	}
	
	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.register("rideCompleted", async (domainEvent: DomainEvent) => {
			// await this.mediator.publish(domainEvent.eventName, domainEvent.data);
			await this.queue.publish(domainEvent.eventName, domainEvent.data);
		});
		ride.finish();
		await this.rideRepository.updateRide(ride);
		// await this.paymentGateway.processPayment({ rideId: ride.rideId, amount: ride.fare });
	}
}

type Input = {
	rideId: string
}
