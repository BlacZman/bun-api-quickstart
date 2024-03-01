import { delay, inject, injectable } from "tsyringe";
import { LoggerFactory } from "../../common/logger/LoggerFactory";
import winston from "winston";
import { AppConfig } from "../../common/appconfig/AppConfig";

@injectable()
export class ExampleService {
    private readonly logger;

    private readonly name = "ExampleService";

    constructor(
        @inject(delay(() => AppConfig)) private config: AppConfig, 
        @inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory,
    ) {
		this.logger = loggerFactory.createFactory(this.name);
	}

    hello() {
        return {
            data: "Hello World!",
        };
    }
}