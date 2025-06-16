import { mysqlTable, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { users } from "./users"

export const decks = mysqlTable('decks', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 32 }),
  user_name: varchar({ length: 16 }).references((): AnyMySqlColumn => users.name),
});