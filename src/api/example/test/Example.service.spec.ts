import { expect, test, describe } from "bun:test";
import { container } from "tsyringe";
import { ExampleService } from "../Example.service";

describe("ExampleService", () => {
    const exampleService = container.resolve(ExampleService);

	test("hello", () => {
		expect(exampleService.hello()).toEqual({
            data: "Hello World!",
        });
	});
});
