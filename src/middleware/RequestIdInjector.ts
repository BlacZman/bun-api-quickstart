/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { inject, delay, injectable } from "tsyringe";
import * as express from "express";
import { v4 as uuidv4 } from "uuid";

import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import {
	Middleware,
	type ExpressMiddlewareInterface,
} from "routing-controllers";

@injectable()
@Middleware({
	type: "before",
})
export class RequestIdInjector implements ExpressMiddlewareInterface {
	private logger;

	private readonly name = "RequestIdInjector";

	constructor(
		@inject(delay(() => AppConfig)) private config: AppConfig,
		@inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.createFactory(this.name);
	}
	use(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const uuid = uuidv4();
		response.locals.requestId = uuid;

		this.logger.info(`Incoming request`, {
            requestId: uuid,
            method: request.method,
            url: request.url,
            header: request.headers,
            query: request.query,
        });
        next();
	}
}
