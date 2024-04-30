// Aggregate, Aggregate Root <AR>, Entity

import crypto from "crypto";
import Coord from "../vo/Coord";
import Segment from "../vo/Segment";
import RideStatus, { RideStatusFactory } from "../vo/RideStatus";
import Position from "./Position";
import Account from "./Account";
import { FareCalculatorFactory } from "../service/FareCalculator";

export default class Ride {
	status: RideStatus;

	private constructor (readonly rideId: string, readonly passengerId: string, public driverId: string, private segment: Segment, status: string, readonly date: Date, public lastPosition: Coord, public distance: number, public fare: number) {
		this.status = RideStatusFactory.create(this, status);
	}

	static create (passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
		const rideId = crypto.randomUUID();
		const status = "requested";
		const date = new Date();
		const lastPosition = new Coord(fromLat, fromLong);
		const distance = 0;
		const fare = 0;
		return new Ride(rideId, passengerId, "", new Segment(new Coord(fromLat, fromLong), new Coord(toLat, toLong)), status, date, lastPosition, distance, fare);
	}

	static restore (rideId: string, passengerId: string, driverId: string, fromLat: number, fromLong: number, toLat: number, toLong: number, status: string, date: Date, lastLat: number, lastLong: number, distance: number, fare: number) {
		return new Ride(rideId, passengerId, driverId, new Segment(new Coord(fromLat, fromLong), new Coord(toLat, toLong)), status, date, new Coord(lastLat, lastLong), distance, fare);
	}

	accept (driverId: string) {
		this.status.accept();
		this.driverId = driverId;
	}

	start () {
		this.status.start();
	}

	finish () {
		this.status.finish();
	}

	updatePosition (lat: number, long: number, date: Date) {
		const newPosition = new Coord(lat, long);
		const distance = new Segment(this.lastPosition, newPosition).getDistance();
		this.distance += distance;
		this.fare += FareCalculatorFactory.create(date).calculate(distance);
		this.lastPosition = newPosition;
	}

	getFromLat () {
		return this.segment.from.getLat();
	}

	getFromLong () {
		return this.segment.from.getLong();
	}

	getToLat () {
		return this.segment.to.getLat();
	}

	getToLong () {
		return this.segment.to.getLong();
	}

	// getDistance () {
	// 	return this.segment.getDistance();
	// }

	getStatus () {
		return this.status.value;
	}
	
}
