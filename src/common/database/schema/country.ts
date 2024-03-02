import {
	uuid,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { bunSchema } from "./schema";

export const countries = bunSchema.table(
	"countries",
	{
		id: uuid('id').defaultRandom().primaryKey(),
		name: varchar("name", { length: 256 }).notNull(),
	},
	(countries) => {
		return {
			nameIndex: uniqueIndex("countries_name_idx").on(countries.name),
		};
	}
);

export type Country = typeof countries.$inferSelect; // return type when queried
export type NewCountry = typeof countries.$inferInsert; // insert type