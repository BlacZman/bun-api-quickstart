import { uniqueIndex, varchar, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { countries } from "./country";
import { bunSchema } from "./schema";

export const users = bunSchema.table(
	"users",
	{
		id: uuid('id').defaultRandom().primaryKey(),
		name: varchar("name", { length: 256 }).notNull(),
		countryId: uuid("country_id").references(() => countries.id).notNull(),
	},
	(users) => {
		return {
			nameIndex: uniqueIndex("users_name_idx").on(users.name),
		};
	}
);

export const usersRelations = relations(users, ({ one }) => ({
	country: one(countries, {
		fields: [users.countryId],
		references: [countries.id],
	}),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
