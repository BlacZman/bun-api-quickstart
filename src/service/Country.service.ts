import { delay, inject, injectable } from "tsyringe";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { nameof } from "@/common/nameof";
import { Datasource } from "@/common/database/Datasource";
import type { RequestAddCountry } from "../api/crudexample/request/AddCountry.request";
import { countries } from "@/common/database/schema/country";
import { NotFoundError } from "routing-controllers";

@injectable()
export class CountryService {
	private readonly logger;

	private readonly name = "CountryService";

	private readonly db;

	constructor(
		@inject(delay(() => AppConfig)) private config: AppConfig,
		@inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory,
		@inject(delay(() => Datasource)) datasource: Datasource
	) {
		this.logger = loggerFactory.createFactory(this.name);
		this.db = datasource.getDb();
	}

	async getCountry(name: string) {
		this.logger.debug(`${nameof<CountryService>("getCountry")} is called`);

		const country = await this.db.query.countries.findFirst({
			where: (countries, { eq }) => eq(countries.name, name),
		});

        if (!country) {
            throw new NotFoundError("Country name not found!");
        }

		return {
			data: country,
		};
	}

	async getAllCountry() {
		this.logger.debug(`${nameof<CountryService>("getAllCountry")} is called`);

		const countries = await this.db.query.countries.findMany();
		return {
			data: countries,
		};
	}

	async addCountry(newCountry: RequestAddCountry) {
		this.logger.debug(`${nameof<CountryService>("addCountry")} is called`);

		await this.db.insert(countries).values(newCountry);

		return {
			data: "success",
		};
	}
}
