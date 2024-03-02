import { inject, delay, singleton } from "tsyringe";
import postgres from 'postgres';
import { drizzle } from "drizzle-orm/postgres-js";
import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import * as user from "@/common/database/schema/user";
import * as country from "@/common/database/schema/country";

@singleton()
export class Datasource {
    private logger;

	private readonly name = "Datasource";

    private readonly connection;

	constructor(
		@inject(delay(() => AppConfig)) private config: AppConfig,
		@inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.createFactory(this.name);

        this.connection = postgres({
            database: this.config.db.databaseName,
            host: this.config.db.host,
            username: this.config.db.username,
            password: this.config.db.password,
            port: this.config.db.port,
        })
	}

    public getDb() {
        return drizzle(this.connection, { schema: {
            ...user,
            ...country,
        } });
    }

    async end() {
        await this.connection.end();
    }
}