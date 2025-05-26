import { mysqlTable, AnyMySqlColumn, int, text } from "drizzle-orm/mysql-core"
import { decks } from "../schema/decks"

export const karteikarten = mysqlTable('karteikarten', {
  id: int().primaryKey().autoincrement(),
  ausdruck: text(),
  definition: text(),
  weight: int(),
  deck_id: int().references((): AnyMySqlColumn => decks.id)
});