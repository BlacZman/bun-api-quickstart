import type { Config } from "drizzle-kit";

export default {
	schema: "./src/common/database/schema",
	out: "./drizzle",
	driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		host: process.env.DB_HOST ?? "",
		user: process.env.DB_USERNAME ?? "",
		password: process.env.DB_PASSWORD ?? "",
		database: process.env.DB_NAME ?? "",
        port: parseInt(process.env.DB_PORT ?? "NaN"),
	},
} satisfies Config;
