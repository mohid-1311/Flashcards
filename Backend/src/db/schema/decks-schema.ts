import { mysqlTable, int, text, AnyMySqlColumn } from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"
import { users } from "./users-schema"
import { cards } from "./cards-schema"
import { z } from "zod"

export const decks = mysqlTable('decks', {
  id: int().primaryKey().autoincrement(),
  name: text().notNull(),
  user_name: text().notNull().references((): AnyMySqlColumn => users.name),
})

export const decksRelations = relations(decks, ({ many }) => ({
  cards: many(cards)
}))

// ZOD
export const deckSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  user_name: z.string(),
})

export type Deck = z.infer<typeof deckSchema>