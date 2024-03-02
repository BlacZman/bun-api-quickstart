import express from "express";
import {
	useExpressServer,
	type RoutingControllersOptions,
} from "routing-controllers";
import { delay, inject, injectable } from "tsyringe";

import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { ExampleController } from "./api/example/Example.controller";
import { HTTPErrorHandler } from "./middleware/ErrorHandler";
import { RequestIdInjector } from "./middleware/RequestIdInjector";
import { CRUDExampleController } from "./api/crudexample/CRUDExample.controller";

@injectable()
export class Server {
	private logger;

	private readonly name = "Server";

	constructor(
		@inject(delay(() => AppConfig)) private config: AppConfig,
		@inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.createFactory(this.name);
	}

	initializeAndStart() {
		// Create Express Server
		const server = express();

		// Disable unnecessary header
		server.disable("x-powered-by");

		const routingControllersOptions: RoutingControllersOptions = {
			defaultErrorHandler: false,
			controllers: [ExampleController, CRUDExampleController],
			middlewares: [RequestIdInjector, HTTPErrorHandler],
			interceptors: [],
		};

		// create and run server
		useExpressServer(server, routingControllersOptions).listen(
			this.config.port,
			() => {
				this.logger.info(`Server is running on port ${this.config.port}`);
			}
		);
	}
}

export default Server;
