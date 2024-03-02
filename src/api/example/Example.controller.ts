import { Get, JsonController } from "routing-controllers";
import { inject, delay, injectable } from "tsyringe";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { nameof } from "@/common/nameof";
import { ExampleService } from "../../service/Example.service";

@JsonController("/example")
@injectable()
export class ExampleController {
    private readonly logger;

    private readonly name = "ExampleController";

    constructor(
        @inject(delay(() => AppConfig)) private config: AppConfig, 
        @inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory,
        @inject(delay(() => ExampleService)) private readonly exampleService: ExampleService,
    ) {
		this.logger = loggerFactory.createFactory(this.name);
	}

    @Get("/hello")
    getHello() {
        this.logger.debug(`${nameof<ExampleController>("getHello")} is called from request`);
        return this.exampleService.hello();
    }
}