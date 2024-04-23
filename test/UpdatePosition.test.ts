import GetRide from "../src/application/usecase/GetRide";
import RequestRide from "../src/application/usecase/RequestRide";
import { Signup } from "../src/application/usecase/Signup";
import { AccountRepositoryDatabase } from "../src/infra/repository/AccountRepository";
import { MailerGatewayMemory } from "../src/infra/gateway/MailerGateway";
import { RideRepositoryDatabase } from "../src/infra/repository/RideRepository";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import AcceptRide from "../src/application/usecase/AcceptRide";
import StartRide from "../src/application/usecase/StartRide";
import UpdatePosition from "../src/application/usecase/UpdatePosition";
import { PositionRepositoryDatabase } from "../src/infra/repository/PositionRepository";

test("Deve atualizar a posição da corrida", async function () {
	const connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	const rideRepository = new RideRepositoryDatabase();
	const mailerGateway = new MailerGatewayMemory();
	const signup = new Signup(accountRepository, mailerGateway);
	const inputSignup = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const outputSignup = await signup.execute(inputSignup);
	const inputSignupDriver = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		carPlate: "AAA9999",
		isDriver: true
	};
	const outputSignupDriver = await signup.execute(inputSignupDriver);
	const requestRide = new RequestRide(accountRepository, rideRepository);
	const inputRequestRide = {
		passengerId: outputSignup.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
	}
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	const acceptRide = new AcceptRide(accountRepository, rideRepository);
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId
	};
	await acceptRide.execute(inputAcceptRide);
	const startRide = new StartRide(rideRepository);
	const inputStartRide = {
		rideId: outputRequestRide.rideId,
	};
	await startRide.execute(inputStartRide);
	const positionRepository = new PositionRepositoryDatabase();
	const updatePosition = new UpdatePosition(rideRepository, positionRepository);
	const inputUpdatePosition1 = {
		rideId: outputRequestRide.rideId,
		lat: -27.584905257808835,
		long: -48.545022195325124,
	};
	await updatePosition.execute(inputUpdatePosition1);
	const inputUpdatePosition2 = {
		rideId: outputRequestRide.rideId,
		lat: -27.496887588317275,
		long: -48.522234807851476
	};
	await updatePosition.execute(inputUpdatePosition2);

	const getRide = new GetRide(accountRepository, rideRepository);
	const inputGetRide = {
		rideId: outputRequestRide.rideId
	};
	const outputGetRide = await getRide.execute(inputGetRide);
	expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);
	await connection.close();
});
