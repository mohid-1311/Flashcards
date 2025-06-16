import { mysqlTable, AnyMySqlColumn, int, text } from "drizzle-orm/mysql-core"
import { decks } from "./decks"

export const cards = mysqlTable('cards', {
  id: int().primaryKey().autoincrement(),
  term: text(),
  definition: text(),
  weight: int(),
  deck_id: int().references((): AnyMySqlColumn => decks.id)
});