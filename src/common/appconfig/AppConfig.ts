import { injectable } from "tsyringe";
import type { LogLevel } from "@/common/logger/LogLevel";
import type { NodeEnv } from "@/common/appconfig/NodeEnvType";
import type { PostgresDatabaseConnectionOptions } from "@/common/database/PostgresDatabaseConnectionOptions";

@injectable()
export class AppConfig {
    /**
     * port
     * @returns { number }
     * The port that the server will listen to.
     * @default NaN
     */
    public get port() : number {
        return parseInt(process.env.PORT ?? "NaN", 10)
    }
    
    
    public get log_level() : LogLevel {
        return (process.env.LOG_LEVEL ?? "info") as LogLevel 
    }

    public get node_env() : NodeEnv {
        return (process.env.NODE_ENV ?? "development") as NodeEnv 
    }

    
    public get db() : PostgresDatabaseConnectionOptions {
        return {
            databaseName: process.env.DB_NAME ?? "",
            host: process.env.DB_HOST ?? "",
            username: process.env.DB_USERNAME ?? "",
            password: process.env.DB_PASSWORD ?? "",
            port: parseInt(process.env.DB_PORT ?? "NaN", 10),
        };
    }
}