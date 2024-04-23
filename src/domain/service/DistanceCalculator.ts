// Domain Service

import Position from "../entity/Position";
import Segment from "../vo/Segment";

export default class DistanceCalculator {
	static calculate (positions: Position[]) {
		let distance = 0;
		for (const [index, position] of positions.entries()) {
			if (index + 1 === positions.length) break;
			const nextPosition = positions[index + 1];
			const segment = new Segment(position.coord, nextPosition.coord);
			distance += segment.getDistance();
		}
		return distance;
	}
}
