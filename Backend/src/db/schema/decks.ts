import { mysqlTable, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { users } from "./users"

export const decks = mysqlTable('decks', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 32 }).notNull(),
  user_name: varchar('user_name', { length: 16 }).notNull().references((): AnyMySqlColumn => users.name),
});