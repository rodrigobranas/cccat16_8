export default interface FareCalculator {
	calculate (distance: number): number;
}

export class NormalFareCalculator implements FareCalculator {
	calculate(distance: number): number {
		return distance * 2.1;
	}
}

export class OvernightFareCalculator implements FareCalculator {
	calculate(distance: number): number {
		return distance * 4.2;
	}
}

export class FareCalculatorFactory {
	static create (date: Date) {
		if (date.getHours() > 22) return new OvernightFareCalculator();
		if (date.getHours() <= 22) return new NormalFareCalculator();
		throw new Error();
	}
}
