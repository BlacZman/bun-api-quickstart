import { migrate } from "drizzle-orm/postgres-js/migrator";
import { container } from 'tsyringe';
import { Datasource } from './src/common/database/Datasource';

const datasource = container.resolve(Datasource);
const db = datasource.getDb();

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle' });
// Don't forget to close the connection, otherwise the script will hang
await datasource.end();