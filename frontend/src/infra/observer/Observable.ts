export default class Observable {
	observers: { eventName: string, callback: Function }[];

	constructor () {
		this.observers = [];
	}

	register (eventName: string, callback: Function) {
		this.observers.push({ eventName, callback });
	}

	async notify (event: string, data: any) {
		for (const observer of this.observers) {
			if (observer.eventName === event) {
				await observer.callback(data);
			}
		}
	}
}
