import Position from "../src/domain/entity/Position";
import Ride from "../src/domain/entity/Ride";
import DistanceCalculator from "../src/domain/service/DistanceCalculator";

test("Deve atualizar a posição da corrida", function () {
	const positions = [
		Position.create("", -27.584905257808835, -48.545022195325124),
		Position.create("", -27.496887588317275, -48.522234807851476)
	]
	expect(DistanceCalculator.calculate(positions)).toBe(10);
});
