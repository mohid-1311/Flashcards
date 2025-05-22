import { mysqlTable, AnyMySqlColumn, int, text } from "drizzle-orm/mysql-core"
import { decks } from "../schema/decks"

export const karteikarten = mysqlTable('karteikarten', {
  id: int().primaryKey(),
  ausdruck: text(),
  definition: text(),
  deck_id: int().references((): AnyMySqlColumn => decks.id)
});