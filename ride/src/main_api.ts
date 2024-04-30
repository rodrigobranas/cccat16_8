// main

import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import { Signup } from "./application/usecase/Signup";
import { GetAccount } from "./application/usecase/GetAccount";
import { MailerGatewayMemory } from "./infra/gateway/MailerGateway";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/http/AccountController";

const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection);
const mailerGateway = new MailerGatewayMemory();
const signup = new Signup(accountRepository, mailerGateway);
const getAccount = new GetAccount(accountRepository);
new AccountController(httpServer, signup, getAccount);
httpServer.listen(3000);