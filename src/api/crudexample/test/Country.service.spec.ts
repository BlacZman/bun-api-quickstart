import { expect, test, describe } from "bun:test";
import { container } from "tsyringe";
import { CountryService } from "../../../service/Country.service";

describe("CountryService", () => {
    const countryService = container.resolve(CountryService);

	test("getCountry", async () => {
        const countryName = "thailand";

        const result = await countryService.getCountry(countryName);
        expect(result.data.name).toEqual(countryName);
	});

    test("getAllCountry", async () => {
        const result = await countryService.getAllCountry();
        expect(result.data).toBeArray();
	});
});
