import { delay, inject, injectable } from "tsyringe";
import winston from "winston";
import { AppConfig } from "@/common/appconfig/AppConfig";

@injectable()
export class LoggerFactory {
	constructor(@inject(delay(() => AppConfig)) private readonly config: AppConfig) {}

	createFactory(
		serviceName: string
	) {
        const loggerOptions = {
			level: this.config.log_level,
			format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
			defaultMeta: { service: serviceName },
			transports: [
				//
				// - Write all logs with importance level of `error` or less to `error.log`
				// - Write all logs with importance level of `info` or less to `combined.log`
				//
				new winston.transports.File({ filename: "error.log", level: "error" }),
				new winston.transports.File({ filename: "combined.log" }),
			],
		}

        const logger = winston.createLogger(loggerOptions);

		if (this.config.node_env !== "production") {
			logger.add(
				new winston.transports.Console({
					format: winston.format.simple(),
				})
			);
		}

        return logger;
	}
}
