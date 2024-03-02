import { delay, inject, injectable } from "tsyringe";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { nameof } from "@/common/nameof";
import { Datasource } from "@/common/database/Datasource";
import { users, type NewUser } from "../common/database/schema/user";
import type { RequestAddUser } from "../api/crudexample/request/AddUser.request";
import { CountryService } from "./Country.service";
import { NotFoundError } from "routing-controllers";

@injectable()
export class UserService {
    private readonly logger;

    private readonly name = "UserService";

    private readonly db;

    constructor(
        @inject(delay(() => AppConfig)) private config: AppConfig, 
        @inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory,
        @inject(delay(() => Datasource)) datasource: Datasource,
        @inject(delay(() => CountryService)) private readonly countryService: CountryService,
    ) {
		this.logger = loggerFactory.createFactory(this.name);
        this.db = datasource.getDb();
	}

    async getUser(id: string) {
        this.logger.debug(`${nameof<UserService>("getUser")} is called`);
        const user = await this.db.query.users
            .findFirst({
                where: (users, { eq }) => eq(users.id, id),
                with: {
                    country: true
                }
            });

        if (!user) {
            throw new NotFoundError("User not found!");
        }

        return {
            data: user,
        };
    }

    async addUser(newUser: RequestAddUser) {
        this.logger.debug(`${nameof<UserService>("addUser")} is called`);

        const country = await this.countryService.getCountry(newUser.countryName);

        const user: NewUser = {
            name: newUser.name,
            countryId: country.data.id
        }

        await this.db
            .insert(users)
            .values(user);

        return {
            data: "success",
        };
    }
}