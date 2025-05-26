import { mysqlTable, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { benutzer } from "../schema/benutzer"

export const decks = mysqlTable('decks', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 32 }),
  benutzer_name: varchar({ length: 16 }).references((): AnyMySqlColumn => benutzer.name),
});