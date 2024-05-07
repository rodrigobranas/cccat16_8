import DomainEvent from "./DomainEvent";

export default class RideCompleted implements DomainEvent {
	eventName = "rideCompleted";
	
	constructor (readonly data: { rideId: string, amount: number }) {
	}
}
