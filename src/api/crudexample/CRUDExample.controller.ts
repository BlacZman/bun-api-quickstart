import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { inject, delay, injectable } from "tsyringe";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { nameof } from "@/common/nameof";
import { UserService } from "../../service/User.service";
import type { RequestAddUser } from "./request/AddUser.request";
import { CountryService } from "../../service/Country.service";
import type { RequestAddCountry } from "./request/AddCountry.request";

@JsonController("/crud/example")
@injectable()
export class CRUDExampleController {
    private readonly logger;

    private readonly name = "CRUDExampleController";

    constructor(
        @inject(delay(() => AppConfig)) private config: AppConfig, 
        @inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory,
        @inject(delay(() => UserService)) private readonly userService: UserService,
        @inject(delay(() => CountryService)) private readonly countryService: CountryService,
    ) {
		this.logger = loggerFactory.createFactory(this.name);
	}

    @Get("/user/:id")
    getUser(@Param('id') id: string) {
        this.logger.debug(`${nameof<CRUDExampleController>("getUser")} is called from request`);

        return this.userService.getUser(id);
    }

    @Post("/user")
    addUser(@Body({ validate: true }) newUser: RequestAddUser) {
        this.logger.debug(`${nameof<CRUDExampleController>("addUser")} is called from request`);

        return this.userService.addUser(newUser);
    }

    @Post("/country")
    addCountry(@Body({ validate: true }) newCountry: RequestAddCountry) {
        this.logger.debug(`${nameof<CRUDExampleController>("addCountry")} is called from request`);

        return this.countryService.addCountry(newCountry);
    }

    @Get("/country")
    getAllCountries() {
        this.logger.debug(`${nameof<CRUDExampleController>("getAllCountries")} is called from request`);

        return this.countryService.getAllCountry();
    }
}