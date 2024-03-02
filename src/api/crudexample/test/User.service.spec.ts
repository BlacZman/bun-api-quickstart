import { expect, test, describe } from "bun:test";
import { container } from "tsyringe";
import { UserService } from "../../../service/User.service";

describe("UserService", () => {
    const userService = container.resolve(UserService);

	test("getUser", async () => {
        const uuid = "bf574975-3384-495f-a620-613d7771c8fd";

        const result = await userService.getUser(uuid);
		expect(result.data).toContainKeys(["id", "name", "countryId", "country"]);
	});
});
