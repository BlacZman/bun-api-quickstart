import { delay, inject, injectable } from "tsyringe";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { nameof } from "@/common/nameof";

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
        this.logger.debug(`${nameof<ExampleService>("hello")} is called from request`);

        return {
            data: "Hello World!",
        };
    }
}