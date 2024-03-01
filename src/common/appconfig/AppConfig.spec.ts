import { expect, test, describe } from "bun:test";
import { container } from "tsyringe";
import { AppConfig } from "./AppConfig";

describe("ExampleService", () => {
    const config = container.resolve(AppConfig);

	test("log_level is in LogLevel type", () => {
		expect(config.log_level).toBeOneOf(["debug", "info", "warn", "error"]);
	});

    test("port is not NaN", () => {
		expect(config.port).not.toBeNaN();
	});
});
