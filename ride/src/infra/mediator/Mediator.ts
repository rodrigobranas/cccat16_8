export default class Mediator {
	handlers: { eventName: string, callback: Function }[];

	constructor () {
		this.handlers = [];
	}

	register (eventName: string, callback: Function) {
		this.handlers.push({ eventName, callback });
	}

	async publish (eventName: string, data: any) {
		for (const handler of this.handlers) {
			if (handler.eventName === eventName) {
				await handler.callback(data);
			}
		}
	}
}
