import DomainEvent from "../../domain/event/DomainEvent";

export default class Observable {
	observers: { eventName: string, callback: Function }[];

	constructor () {
		this.observers = [];
	}

	register (eventName: string, callback: Function) {
		this.observers.push({ eventName, callback });
	}

	async notify (event: DomainEvent) {
		for (const observer of this.observers) {
			if (observer.eventName === event.eventName) {
				await observer.callback(event);
			}
		}
	}
}
